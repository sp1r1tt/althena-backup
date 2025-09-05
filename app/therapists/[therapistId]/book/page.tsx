"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Button } from "../../../../components/ui/button"
import { Calendar } from "../../../../components/ui/calendar"
import { Textarea } from "../../../../components/ui/textarea"
import { Label } from "../../../../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group"
import { Brain, ArrowLeft, CheckCircle, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "../../../../components/ui/alert"

interface TherapistData {
  id: string
  full_name: string
  specializations: string[]
  hourly_rate_uah: number
  bio: string
  available_times: any
}

interface BookingHold {
  bookingId: string
  holdExpiresAt: string
  totalAmount: number
}

interface BookingPageProps {
  params: {
    therapistId: string
  }
}

export default function BookingPage({ params }: BookingPageProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedDuration, setSelectedDuration] = useState<number>(60)
  const [notes, setNotes] = useState<string>("")
  const [step, setStep] = useState<number>(1)

  const [therapist, setTherapist] = useState<TherapistData | null>(null)
  const [availableSlots, setAvailableSlots] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [bookingHold, setBookingHold] = useState<BookingHold | null>(null)
  const [holdTimeLeft, setHoldTimeLeft] = useState<number>(0)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const fetchTherapistData = async () => {
      try {
        setLoading(true)
        // Fetch therapist data
        const therapistResponse = await fetch(`/api/therapists/${params.therapistId}`)
        if (!therapistResponse.ok) throw new Error("Терапевт не найден")
        const therapistData = await therapistResponse.json()
        setTherapist(therapistData)

        // Fetch available slots for the next 30 days
        const slotsResponse = await fetch(`/api/therapists/${params.therapistId}/available-slots`)
        if (slotsResponse.ok) {
          const slotsData = await slotsResponse.json()
          setAvailableSlots(slotsData)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки данных")
      } finally {
        setLoading(false)
      }
    }

    fetchTherapistData()
  }, [params.therapistId])

  useEffect(() => {
    if (!bookingHold) return

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const holdExpires = new Date(bookingHold.holdExpiresAt).getTime()
      const timeLeft = Math.max(0, holdExpires - now)

      setHoldTimeLeft(timeLeft)

      if (timeLeft === 0) {
        setBookingHold(null)
        setError("Время удержания слота истекло. Пожалуйста, выберите другое время.")
        setStep(1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [bookingHold])

  const handleHoldSlot = async () => {
    if (!selectedDate || !selectedTime || !therapist) return

    try {
      setIsProcessing(true)
      setError("")

      const response = await fetch("/api/bookings/hard-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          therapistId: params.therapistId,
          sessionDate: selectedDate.toISOString().split("T")[0],
          sessionTime: selectedTime,
          duration: selectedDuration,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Ошибка бронирования слота")
      }

      const holdData = await response.json()
      setBookingHold(holdData)
      setStep(2)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка бронирования")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleConfirmBooking = async () => {
    if (!bookingHold) return

    try {
      setIsProcessing(true)

      // Create payment intent
      const paymentResponse = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: bookingHold.bookingId,
          amount: bookingHold.totalAmount,
        }),
      })

      if (!paymentResponse.ok) {
        throw new Error("Ошибка создания платежа")
      }

      const { clientSecret } = await paymentResponse.json()

      // Redirect to success page (in real app, would integrate Stripe Elements here)
      router.push(`/therapists/${params.therapistId}/book/success?booking_id=${bookingHold.bookingId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка подтверждения бронирования")
    } finally {
      setIsProcessing(false)
    }
  }

  const formatTimeLeft = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка данных...</p>
        </div>
      </div>
    )
  }

  if (error && !therapist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Ошибка</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button asChild>
              <Link href="/therapists">Вернуться к списку</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!therapist) return null

  const dateKey = selectedDate?.toISOString().split("T")[0]
  const availableTimes = dateKey ? availableSlots[dateKey] || [] : []
  const sessionPrice = Math.round((therapist.hourly_rate_uah * selectedDuration) / 60 / 100) // Convert from kopecks to UAH

  const canProceedToStep2 = selectedDate && selectedTime && selectedDuration
  const canProceedToStep3 = canProceedToStep2 && bookingHold

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href={`/therapists/${params.therapistId}`}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Назад к профилю</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">MindCare</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {bookingHold && holdTimeLeft > 0 && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <Clock className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Слот удерживается для вас еще <strong>{formatTimeLeft(holdTimeLeft)}</strong> Завершите бронирование до
              истечения времени.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                1
              </div>
              <span className="hidden sm:inline">Выбор времени</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <span className="hidden sm:inline">Детали</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-200"></div>
            <div className={`flex items-center gap-2 ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                3
              </div>
              <span className="hidden sm:inline">Подтверждение</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Выберите дату и время</CardTitle>
                  <CardDescription>Доступные слоты для записи</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Duration Selection */}
                  <div>
                    <Label className="text-base font-medium mb-4 block">Длительность сессии:</Label>
                    <RadioGroup
                      value={selectedDuration.toString()}
                      onValueChange={(value) => setSelectedDuration(Number.parseInt(value))}
                    >
                      <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="50" id="duration-50" />
                        <Label htmlFor="duration-50" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Стандартная сессия</div>
                              <div className="text-sm text-gray-600">50 минут</div>
                            </div>
                            <div className="text-lg font-semibold text-green-600">
                              {Math.round((therapist.hourly_rate_uah * 50) / 60 / 100)} ₴
                            </div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="60" id="duration-60" />
                        <Label htmlFor="duration-60" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">Расширенная сессия</div>
                              <div className="text-sm text-gray-600">60 минут</div>
                            </div>
                            <div className="text-lg font-semibold text-green-600">
                              {Math.round(therapist.hourly_rate_uah / 100)} ₴
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Calendar */}
                  <div>
                    <Label className="text-base font-medium mb-4 block">Выберите дату:</Label>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => {
                          const dateKey = date.toISOString().split("T")[0]
                          return !availableSlots[dateKey] || date < new Date()
                        }}
                        className="rounded-md border"
                      />
                    </div>
                  </div>

                  {/* Time Slots */}
                  {selectedDate && availableTimes.length > 0 && (
                    <div>
                      <Label className="text-base font-medium mb-4 block">Выберите время:</Label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {availableTimes.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            onClick={() => setSelectedTime(time)}
                            className="h-12"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button
                      onClick={handleHoldSlot}
                      disabled={!canProceedToStep2 || isProcessing}
                      className="min-w-[120px]"
                    >
                      {isProcessing ? "Бронирование..." : "Забронировать"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Дополнительная информация</CardTitle>
                  <CardDescription>Расскажите о причине обращения (необязательно)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="notes" className="text-base font-medium mb-2 block">
                      Что вас беспокоит? Какие вопросы хотели бы обсудить?
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Опишите кратко ситуацию или вопросы, которые хотели бы обсудить с психологом. Эта информация поможет специалисту лучше подготовиться к встрече."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Вся информация строго конфиденциальна и будет доступна только вашему терапевту.
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Назад
                    </Button>
                    <Button onClick={() => setStep(3)} className="min-w-[120px]">
                      Далее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Подтверждение записи</CardTitle>
                  <CardDescription>Проверьте детали вашей записи</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Специалист:</span>
                      <span className="font-medium">{therapist.full_name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Длительность:</span>
                      <span className="font-medium">{selectedDuration} минут</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Дата:</span>
                      <span className="font-medium">{selectedDate?.toLocaleDateString("ru-RU")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Время:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex items-center justify-between border-t pt-3">
                      <span className="text-gray-600">Стоимость:</span>
                      <span className="text-xl font-bold text-green-600">{sessionPrice} ₴</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Важная информация:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Подтверждение записи придет на ваш email</li>
                      <li>• Отмена возможна не позднее чем за 48 часов</li>
                      <li>• При опоздании более чем на 15 минут сессия может быть отменена</li>
                      <li>• Оплата производится сейчас для подтверждения записи</li>
                    </ul>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Назад
                    </Button>
                    <Button
                      onClick={handleConfirmBooking}
                      disabled={!canProceedToStep3 || isProcessing}
                      className="min-w-[140px] bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      {isProcessing ? "Обработка..." : "Оплатить и подтвердить"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Therapist Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ваш специалист</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src="/therapist-portrait.png"
                      alt={therapist.full_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{therapist.full_name}</div>
                    <div className="text-sm text-gray-600">{therapist.specializations?.[0] || "Психолог"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Details */}
            {(selectedDate || selectedTime || selectedDuration) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Детали записи</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedDuration && (
                    <div>
                      <div className="text-sm text-gray-600">Длительность:</div>
                      <div className="font-medium">{selectedDuration} минут</div>
                    </div>
                  )}
                  {selectedDate && (
                    <div>
                      <div className="text-sm text-gray-600">Дата:</div>
                      <div className="font-medium">{selectedDate.toLocaleDateString("ru-RU")}</div>
                    </div>
                  )}
                  {selectedTime && (
                    <div>
                      <div className="text-sm text-gray-600">Время:</div>
                      <div className="font-medium">{selectedTime}</div>
                    </div>
                  )}
                  {selectedDuration && (
                    <div className="border-t pt-3">
                      <div className="text-sm text-gray-600">Стоимость:</div>
                      <div className="text-xl font-bold text-green-600">{sessionPrice} ₴</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Help */}
            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Нужна помощь?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Если у вас есть вопросы о записи или вы хотите изменить время, свяжитесь с нами.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Связаться с поддержкой
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
