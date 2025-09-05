"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Calendar } from "../../../components/ui/calendar"
import Link from "next/link"
import { format, isBefore, startOfDay } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon, Clock, Star, MapPin, Award, Users, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "../../../components/ui/alert"

interface Therapist {
  id: string
  first_name: string
  last_name: string
  bio: string
  specializations: string[]
  experience_years: number
  hourly_rate_uah: number
  location: string
  languages: string[]
  profile_image_url?: string
  availability: { [date: string]: string[] }
}

interface BookingHold {
  bookingId: string
  holdExpiresAt: string
  totalAmount: number
}

interface TherapistPageProps {
  params: {
    therapistId: string
  }
}

export default function TherapistPage({ params }: TherapistPageProps) {
  const [therapist, setTherapist] = useState<Therapist | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingHold, setBookingHold] = useState<BookingHold | null>(null)
  const [holdTimeLeft, setHoldTimeLeft] = useState<number>(0)

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const response = await fetch(`/api/therapists/${params.therapistId}`)
        if (response.ok) {
          const data = await response.json()
          setTherapist(data.therapist)
        }
      } catch (error) {
        console.error('Error fetching therapist:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTherapist()
  }, [params.therapistId])

  // Timer effect for booking hold
  useEffect(() => {
    if (!bookingHold) return

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const holdExpires = new Date(bookingHold.holdExpiresAt).getTime()
      const timeLeft = Math.max(0, holdExpires - now)

      setHoldTimeLeft(timeLeft)

      if (timeLeft === 0) {
        setBookingHold(null)
        alert("Время удержания слота истекло. Пожалуйста, выберите другое время.")
        setSelectedDate(undefined)
        setSelectedTime(null)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [bookingHold])

  const handleBooking = async () => {
    if (!bookingHold) {
      alert('Сначала забронируйте слот')
      return
    }

    setBookingLoading(true)
    try {
      // Create Stripe checkout session with existing booking
      const stripeResponse = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          therapistId: therapist!.id,
          date: format(selectedDate!, 'yyyy-MM-dd'),
          time: selectedTime,
          amount: therapist!.hourly_rate_uah,
          bookingId: bookingHold.bookingId,
        }),
      })

      if (stripeResponse.ok) {
        const { url } = await stripeResponse.json()
        window.location.href = url
      } else {
        const stripeError = await stripeResponse.json()
        console.error('Stripe session creation failed:', stripeError)
        throw new Error('Failed to create payment session')
      }
    } catch (error) {
      console.error('Error creating booking:', error)
      alert(`Ошибка при создании оплаты: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`)
    } finally {
      setBookingLoading(false)
    }
  }

  const getAvailableTimes = (date: Date) => {
    if (!therapist) return []
    const dateKey = format(date, 'yyyy-MM-dd')
    return therapist.availability[dateKey] || []
  }

  const isDateAvailable = (date: Date) => {
    return getAvailableTimes(date).length > 0
  }

  const formatTimeLeft = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleHoldSlot = async () => {
    if (!selectedDate || !selectedTime || !therapist) {
      alert('Не все данные выбраны. Выберите дату и время.')
      return
    }

    setBookingLoading(true)
    try {
      const response = await fetch('/api/bookings/hard-slot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          therapistId: therapist.id,
          sessionDate: format(selectedDate, 'yyyy-MM-dd'),
          sessionTime: selectedTime,
          duration: 50,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Ошибка бронирования слота')
      }

      const holdData = await response.json()
      setBookingHold(holdData)
    } catch (error) {
      console.error('Error creating booking hold:', error)
      alert(`Ошибка при бронировании слота: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`)
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!therapist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Специалист не найден</CardTitle>
            <CardDescription>Запрашиваемый специалист не существует</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/therapists">Вернуться к списку специалистов</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Timer Alert */}
        {bookingHold && holdTimeLeft > 0 && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <Clock className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Слот удерживается для вас еще <strong>{formatTimeLeft(holdTimeLeft)}</strong> Завершите бронирование до
              истечения времени.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-start gap-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={therapist.profile_image_url || "/placeholder.svg"}
                      alt={`${therapist.first_name} ${therapist.last_name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-2">
                      {therapist.first_name} {therapist.last_name}
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600 mb-4">
                      Психолог-консультант
                    </CardDescription>

                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        <span>{therapist.experience_years} лет опыта</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{therapist.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {therapist.specializations.map((spec) => (
                        <Badge key={spec} variant="outline">
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-gray-700 leading-relaxed">{therapist.bio}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* About */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>О специалисте</CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {therapist.bio}
                </div>
              </CardContent>
            </Card>

            {/* Availability Summary */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Доступное время
                </CardTitle>
                <CardDescription>
                  Ближайшие доступные дни и время для записи
                </CardDescription>
              </CardHeader>
              <CardContent>
                {Object.keys(therapist.availability).length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(therapist.availability)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .slice(0, 7) // Show next 7 available days
                      .map(([dateKey, times]) => {
                        if (times.length === 0) return null
                        const date = new Date(dateKey)
                        const today = new Date()
                        const isToday = date.toDateString() === today.toDateString()
                        const isTomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000).toDateString() === date.toDateString()

                        let dateLabel = date ? format(date, 'dd.MM.yyyy', { locale: ru }) : ''
                        if (isToday) dateLabel = 'Сегодня'
                        else if (isTomorrow) dateLabel = 'Завтра'

                        return (
                          <div key={dateKey} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900">
                                {dateLabel} ({format(date, 'EEEE', { locale: ru })})
                              </h4>
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                {times.length} слот{times.length !== 1 ? 'ов' : ''}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {times.slice(0, 6).map((time) => (
                                <Badge key={time} variant="secondary" className="text-sm">
                                  {time}
                                </Badge>
                              ))}
                              {times.length > 6 && (
                                <Badge variant="outline" className="text-sm">
                                  +{times.length - 6} еще
                                </Badge>
                              )}
                            </div>
                          </div>
                        )
                      })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Информация о доступном времени будет добавлена специалистом</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Выберите дату
                </CardTitle>
                <CardDescription>
                  Доступные даты отмечены
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => isBefore(date, startOfDay(new Date())) || !isDateAvailable(date)}
                  locale={ru}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Time Slots */}
            {selectedDate && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Время: {format(selectedDate, 'dd.MM.yyyy', { locale: ru })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {getAvailableTimes(selectedDate).map((time) => (
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
                </CardContent>
              </Card>
            )}

            {/* Booking Summary */}
            {selectedDate && selectedTime && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Подтверждение записи</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Дата:</span>
                      <span>{format(selectedDate, 'dd.MM.yyyy', { locale: ru })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Время:</span>
                      <span>{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Стоимость:</span>
                      <span className="font-semibold">{therapist.hourly_rate_uah} ₴</span>
                    </div>
                  </div>

                  {!bookingHold ? (
                    <Button
                      onClick={handleHoldSlot}
                      disabled={bookingLoading}
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                    >
                      {bookingLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : null}
                      {bookingLoading ? 'Бронирование...' : 'Забронировать'}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleBooking}
                      disabled={bookingLoading}
                      className="w-full h-12 bg-green-600 hover:bg-green-700"
                    >
                      {bookingLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : null}
                      {bookingLoading ? 'Создание оплаты...' : 'Перейти к оплате'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
