"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { CheckCircle, Calendar, Clock, User, CreditCard } from "lucide-react"
import { Button } from "../../../../../components/ui/button"
import { Card, CardContent } from  "../../../../../components/ui/card"
import Link from "next/link"
import { sendBookingConfirmation } from "../../../../../lib/email-service"
import ProfileHeader from '@/components/ProfileHeader'
import Footer from '@/components/Footer'

export default function BookingSuccessPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [emailSent, setEmailSent] = useState(false)

  const bookingData = {
    therapistName: searchParams.get("therapistName") || "Специалист",
    date: searchParams.get("date") || new Date().toLocaleDateString("ru-RU"),
    time: searchParams.get("time") || "10:00",
    sessionType: searchParams.get("sessionType") || "Онлайн консультация",
    price: searchParams.get("price") || "3000",
    userName: searchParams.get("userName") || "Пользователь",
    userEmail: searchParams.get("userEmail") || "user@example.com",
  }

  useEffect(() => {
    const sendConfirmationEmail = async () => {
      try {
        await sendBookingConfirmation(
          bookingData.userEmail,
          bookingData.userName,
          bookingData.therapistName,
          bookingData.date,
          bookingData.time,
          bookingData.sessionType,
          bookingData.price,
        )
        setEmailSent(true)
        console.log("[v0] Booking confirmation email sent successfully")
      } catch (error) {
        console.error("[v0] Failed to send confirmation email:", error)
      }
    }

    sendConfirmationEmail()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ProfileHeader */}
      <ProfileHeader />

      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl border-0">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Запись подтверждена!</h1>
              <p className="text-gray-600">Ваша сессия успешно забронирована</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Детали бронирования:</h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{bookingData.therapistName}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{bookingData.date}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{bookingData.time}</span>
                </div>

                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{bookingData.price} ₴</span>
                </div>
              </div>
            </div>

            {emailSent && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-sm">✓ Подтверждение отправлено на ваш email</p>
              </div>
            )}

            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/dashboard">Перейти в личный кабинет</Link>
              </Button>

              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/therapists">Найти других специалистов</Link>
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-6">Напоминание о сессии будет отправлено за 24 часа до встречи</p>
          </CardContent>
        </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
