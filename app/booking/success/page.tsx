"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { CheckCircle, Calendar, Clock, User, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"

interface BookingDetails {
  id: string
  session_date: string
  therapist_name: string
  amount: number
  status: string
}

export default function BookingSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const bookingId = searchParams.get('booking_id')

  const [booking, setBooking] = useState<BookingDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId) {
        setError('ID бронирования не найден')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/bookings/${bookingId}`)
        if (response.ok) {
          const data = await response.json()
          setBooking(data.booking)
        } else {
          setError('Не удалось загрузить детали бронирования')
        }
      } catch (err) {
        console.error('Error fetching booking:', err)
        setError('Произошла ошибка при загрузке данных')
      } finally {
        setLoading(false)
      }
    }

    fetchBookingDetails()
  }, [bookingId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span>Загрузка информации о бронировании...</span>
        </div>
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-red-600">Ошибка</CardTitle>
              <CardDescription>
                {error || 'Не удалось загрузить информацию о бронировании'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/therapists">Вернуться к специалистам</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Convert session time to Kyiv timezone
  const sessionDate = new Date(booking.session_date)
  console.log('Success page - Session UTC time:', sessionDate.toISOString())

  // Get current time in Kyiv timezone (this was working correctly last time)
  const now = new Date()
  const currentUtcHours = now.getUTCHours()
  const currentUtcMinutes = now.getUTCMinutes()
  const currentKyivHours = (currentUtcHours + 3) % 24
  const currentKyivTime = `${currentKyivHours.toString().padStart(2, '0')}:${currentUtcMinutes.toString().padStart(2, '0')}`

  const currentKyivDate = now.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Kiev'
  })

  console.log('Success page - Current UTC:', currentUtcHours + ':' + currentUtcMinutes.toString().padStart(2, '0'))
  console.log('Success page - Current Kyiv time:', currentKyivTime)
  console.log('Success page - Current Kyiv date:', currentKyivDate)

  // Also keep session time for reference
  const sessionUtcHours = sessionDate.getUTCHours()
  const sessionUtcMinutes = sessionDate.getUTCMinutes()
  const sessionKyivHours = (sessionUtcHours + 3) % 24
  const sessionKyivTime = `${sessionKyivHours.toString().padStart(2, '0')}:${sessionUtcMinutes.toString().padStart(2, '0')}`

  console.log('Success page - Session UTC:', sessionUtcHours + ':' + sessionUtcMinutes.toString().padStart(2, '0'))
  console.log('Success page - Session Kyiv time:', sessionKyivTime)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Оплата прошла успешно!
          </h1>
          <p className="text-gray-600">
            Ваша сессия с терапевтом успешно забронирована
          </p>
        </div>

        {/* Booking Details */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Детали бронирования
            </CardTitle>
            <CardDescription>
              Информация о вашей предстоящей сессии
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Терапевт</p>
                    <p className="font-medium">{booking.therapist_name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Дата</p>
                    <p className="font-medium">{currentKyivDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Время</p>
                    <p className="font-medium">{currentKyivTime}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Стоимость</p>
                  <p className="text-2xl font-bold text-green-600">{booking.amount} ₴</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Статус</p>
                  <Badge className="bg-green-600 hover:bg-green-700">
                    Подтверждено
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-gray-600">ID бронирования</p>
                  <p className="font-mono text-sm text-gray-800">{booking.id}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Что дальше?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">1</span>
                </div>
                <div>
                  <p className="font-medium">Подготовьтесь к сессии</p>
                  <p className="text-sm text-gray-600">Терапевт свяжется с вами за день до сессии для подтверждения</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">2</span>
                </div>
                <div>
                  <p className="font-medium">Проверьте почту</p>
                  <p className="text-sm text-gray-600">Подтверждение и детали сессии отправлены на вашу почту</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">3</span>
                </div>
                <div>
                  <p className="font-medium">Присоединяйтесь к сессии</p>
                  <p className="text-sm text-gray-600">В назначенное время терапевт предоставит ссылку на сессию</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1 bg-green-600 hover:bg-green-700">
            <Link href="/dashboard">
              Мои бронирования
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" className="flex-1">
            <Link href="/therapists">
              Найти другого специалиста
            </Link>
          </Button>
        </div>

        {/* Support */}
        <div className="text-center mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Возникли вопросы? Свяжитесь с нашей{' '}
            <Link href="/support" className="text-blue-600 hover:underline">
              службой поддержки
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}