"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Brain, Calendar, TrendingUp, Clock, FileText, Star, Activity, Heart, Target, Loader2, Users, MessageSquare, Settings } from "lucide-react"
import Link from "next/link"
import ProfileHeader from '@/components/ProfileHeader'
import Footer from '@/components/Footer'
import { createClient } from "../../lib/supabase/client"

export default function TherapistDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [therapistData, setTherapistData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Authentication is handled by middleware, no need for client-side checks

  useEffect(() => {
    const fetchTherapistData = async () => {
      try {
        // Get current user
        const userResponse = await fetch('/api/auth/user')
        const userData = await userResponse.json()

        if (!userData.id) {
          throw new Error('User not authenticated')
        }

        // Check if user is NOT a therapist and redirect them
        if (userData.role !== 'therapist') {
          alert('У вас нет доступа к кабинету терапевта. Перенаправляем в личный кабинет клиента.')
          window.location.href = '/dashboard'
          return
        }

        // Get therapist profile - try to find therapist record first

        const supabase = createClient()

        // First, let's check if therapist record exists
        const { data: therapistRecord } = await supabase
          .from('therapists')
          .select('id')
          .eq('user_id', userData.id)
          .maybeSingle()

        const therapistIdForApi = therapistRecord?.id || userData.id

        const therapistResponse = await fetch(`/api/therapists/${therapistIdForApi}`)
        const therapistProfile = await therapistResponse.json()

        // Get therapist record ID from profile
        const therapistRecordId = therapistProfile.therapist?.id

        // Use therapist record ID for bookings, fallback to user ID
        const bookingsTherapistId = therapistRecordId || userData.id

        const bookingsResponse = await fetch(`/api/therapists/${bookingsTherapistId}/bookings`)
        const bookingsData = await bookingsResponse.json()

        // Calculate stats (exclude therapist's own bookings)
        const allBookings = bookingsData.bookings || []
        const externalBookings = allBookings.filter((b: any) => b.client?.id !== userData.id)
        const clientsCount = new Set(externalBookings.map((b: any) => b.client?.id).filter(Boolean)).size
        const sessionsCompleted = externalBookings.filter((b: any) => b.status === 'confirmed').length || 0

        // Get unique clients with their booking history
        const clientMap = new Map()
        allBookings.forEach((booking: any) => {
          const clientId = booking.client?.id
          if (!clientId) {
            return
          }

          // Skip if this is the therapist's own booking (for testing purposes)
          if (clientId === userData.id) {
            return
          }

          if (!clientMap.has(clientId)) {
            clientMap.set(clientId, {
              id: clientId,
              name: booking.client.name,
              email: booking.client.email,
              sessions: 0,
              lastSession: booking.session_date,
              status: booking.status === 'confirmed' ? "Активный" : "Неактивный",
              testResult: booking.test_result
            })
          }
          clientMap.get(clientId).sessions += 1
        })

        const clients = Array.from(clientMap.values()).slice(0, 4)

        // Get upcoming sessions (exclude therapist's own bookings)
        const upcomingBookings = allBookings
          .filter((b: any) => {
            const isUpcoming = new Date(b.session_date) > new Date()
            const isNotOwnBooking = b.client?.id !== userData.id
            return isUpcoming && isNotOwnBooking
          })
          .sort((a: any, b: any) => new Date(a.session_date).getTime() - new Date(b.session_date).getTime())
          .slice(0, 3)

        // Mock schedule data (in real app this would come from therapist profile)
        const schedule = [
          { day: "Понедельник", slots: ["10:00 - 11:00", "12:00 - 13:00", "15:00 - 16:00"] },
          { day: "Вторник", slots: ["11:00 - 12:00", "14:00 - 15:00", "16:00 - 17:00"] },
          { day: "Среда", slots: ["09:00 - 10:00", "13:00 - 14:00", "17:00 - 18:00"] },
          { day: "Четверг", slots: ["10:00 - 11:00", "12:00 - 13:00", "15:00 - 16:00"] },
          { day: "Пятница", slots: ["11:00 - 12:00", "14:00 - 15:00", "16:00 - 17:00"] },
        ]

        const therapistDataResult = {
          name: therapistProfile.therapist?.name || userData.first_name + ' ' + userData.last_name,
          email: userData.email,
          joinDate: new Date(userData.created_at).toLocaleDateString('ru-RU'),
          clientsCount,
          sessionsCompleted,
          nextSessions: upcomingBookings.map((booking: any) => ({
            id: booking.id,
            client: booking.client?.name || 'Неизвестный клиент',
            date: new Date(booking.session_date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' }),
            time: booking.session_time,
            type: "Онлайн",
            status: booking.status,
            clientData: booking.client,
            testResult: booking.test_result
          })),
          clients,
          schedule,
          income: {
            current: "120 000 ₴", // Would be calculated from actual payments
            previous: "105 000 ₴",
            growth: "+14.3%"
          }
        }

        // Therapist dashboard data is ready

        setTherapistData(therapistDataResult)
      } catch (error) {
        console.error('Error fetching therapist data:', error)
        // Fallback to mock data
        setTherapistData({
          name: "Др. Елена Смирнова",
          email: "elena@example.com",
          joinDate: "15 января 2024",
          clientsCount: 12,
          sessionsCompleted: 45,
          nextSessions: [
            { client: "Анна Петрова", date: "25 дек", time: "14:00", type: "Онлайн" },
            { client: "Иван Сидоров", date: "25 дек", time: "16:30", type: "Онлайн" },
            { client: "Мария Иванова", date: "26 дек", time: "10:00", type: "Очно" },
          ],
          clients: [
            { name: "Анна Петрова", sessions: 5, lastSession: "20 дек 2024", status: "Активный" },
            { name: "Иван Сидоров", sessions: 3, lastSession: "18 дек 2024", status: "Активный" },
            { name: "Мария Иванова", sessions: 8, lastSession: "15 дек 2024", status: "Активный" },
            { name: "Алексей Козлов", sessions: 2, lastSession: "10 дек 2024", status: "Неактивный" },
          ],
          schedule: [
            { day: "Понедельник", slots: ["10:00 - 11:00", "12:00 - 13:00", "15:00 - 16:00"] },
            { day: "Вторник", slots: ["11:00 - 12:00", "14:00 - 15:00", "16:00 - 17:00"] },
            { day: "Среда", slots: ["09:00 - 10:00", "13:00 - 14:00", "17:00 - 18:00"] },
            { day: "Четверг", slots: ["10:00 - 11:00", "12:00 - 13:00", "15:00 - 16:00"] },
            { day: "Пятница", slots: ["11:00 - 12:00", "14:00 - 15:00", "16:00 - 17:00"] },
          ],
          income: {
            current: "120 000 ₴",
            previous: "105 000 ₴",
            growth: "+14.3%"
          }
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTherapistData()
  }, [])


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span>Загрузка дашборда...</span>
        </div>
      </div>
    )
  }

  if (!therapistData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Ошибка загрузки данных</h2>
          <p className="text-gray-600">Не удалось загрузить данные терапевта</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* ProfileHeader */}
      <ProfileHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Кабинет терапевта</h1>
          <p className="text-gray-600">Управляйте клиентами, сессиями и расписанием</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="clients">Клиенты</TabsTrigger>
            <TabsTrigger value="sessions">Сессии</TabsTrigger>
            <TabsTrigger value="schedule">Расписание</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Клиентов</p>
                      <p className="text-2xl font-bold text-gray-900">{therapistData.clientsCount}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Проведено сессий</p>
                      <p className="text-2xl font-bold text-gray-900">{therapistData.sessionsCompleted}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Дней на платформе</p>
                      <p className="text-2xl font-bold text-gray-900">120</p>
                    </div>
                    <Activity className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Доход за месяц</p>
                      <p className="text-2xl font-bold text-gray-900">{therapistData.income.current}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <TrendingUp className="h-8 w-8 text-orange-600" />
                      <span className="text-xs text-green-600">{therapistData.income.growth}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Next Sessions */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardHeader>
                <CardTitle>Ближайшие сессии</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {therapistData.nextSessions.slice(0, 2).map((session, index) => (
                  <div key={session.id || index} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-white">{session.client}</p>
                      <p className="text-sm text-blue-100">
                        {session.date} в {session.time}
                      </p>
                      {session.clientData?.email && (
                        <p className="text-xs text-blue-200">
                          Email: {session.clientData.email}
                        </p>
                      )}
                      {session.testResult && (
                        <p className="text-xs text-blue-200 mt-1">
                          Результат теста: {session.testResult.result_text?.substring(0, 40)}...
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        {session.status === 'confirmed' ? 'Подтверждена' : session.status === 'held' ? 'Ожидает оплаты' : 'Ожидает'}
                      </Badge>
                      <Button variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
                        Начать
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="secondary" className="w-full bg-white/20 text-white hover:bg-white/30">
                  Посмотреть все сессии
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Активные клиенты
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {therapistData.clients.slice(0, 3).map((client, index) => (
                    <div key={client.id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{client.name}</p>
                        <p className="text-sm text-gray-600">Сессий: {client.sessions}</p>
                        {client.testResult && (
                          <p className="text-xs text-blue-600 mt-1">
                            Результат теста: {client.testResult.result_text?.substring(0, 50)}...
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge
                          className={`${
                            client.status === "Активный"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {client.status}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">
                          Последняя: {new Date(client.lastSession).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    Все клиенты
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-green-600" />
                    Управление расписанием
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="w-full">
                      Настроить доступность
                    </Button>
                    <Button variant="outline" className="w-full">
                      Заблокировать слоты
                    </Button>
                    <Button variant="outline" className="w-full">
                      Выходные дни
                    </Button>
                    <Button variant="outline" className="w-full">
                      Настройки цен
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Мои клиенты</CardTitle>
                  <CardDescription>Управление клиентами и их прогрессом</CardDescription>
                </div>
                <Button>
                  Добавить клиента
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {therapistData.clients.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Клиентов пока нет</h3>
                      <p className="text-gray-600">У вас еще нет забронированных сессий с клиентами</p>
                    </div>
                  ) : (
                    therapistData.clients.map((client, index) => (
                      <div key={client.id || index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{client.name}</h3>
                            <p className="text-sm text-gray-600">Email: {client.email}</p>
                            <p className="text-sm text-gray-600">Сессий: {client.sessions}</p>
                            {client.testResult && (
                              <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                                <p className="font-medium text-blue-900">Результат теста:</p>
                                <p className="text-blue-800">{client.testResult.result_text}</p>
                                {client.testResult.recommendations && (
                                  <p className="text-blue-700 mt-1">
                                    <strong>Рекомендации:</strong> {client.testResult.recommendations.substring(0, 100)}...
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <Badge
                              className={`${
                                client.status === "Активный"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {client.status}
                            </Badge>
                            <p className="text-sm text-gray-600 mt-1">
                              Последняя: {new Date(client.lastSession).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Профиль
                          </Button>
                          <Button size="sm">
                            Сообщение
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Предстоящие сессии</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {therapistData.nextSessions.map((session, index) => (
                    <div key={session.id || index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{session.client}</h3>
                          <p className="text-sm text-gray-600">{session.clientData?.email}</p>
                          <p className="text-xs text-gray-500">ID клиента: {session.clientData?.id}</p>
                        </div>
                        <Badge variant="outline">
                          {session.status === 'confirmed' ? 'Подтверждена' : session.status === 'held' ? 'Ожидает оплаты' : 'Ожидает'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {session.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {session.time}
                        </div>
                      </div>
                      {session.testResult && (
                        <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
                          <p className="font-medium text-blue-900">Результат теста клиента:</p>
                          <p className="text-blue-800">{session.testResult.result_text}</p>
                          {session.testResult.recommendations && (
                            <p className="text-blue-700 mt-1">
                              <strong>Рекомендации:</strong> {session.testResult.recommendations.substring(0, 100)}...
                            </p>
                          )}
                        </div>
                      )}
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="flex-1">
                          Начать сессию
                        </Button>
                        <Button variant="outline" size="sm">
                          Перенести
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>История сессий</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-gray-900">Анна Петрова</h3>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">60 мин</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">20 декабря 2024 • Онлайн консультация</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Заметки
                        </Button>
                        <Button variant="outline" size="sm">
                          Отчет
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-gray-900">Иван Сидоров</h3>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">45 мин</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">18 декабря 2024 • Онлайн консультация</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Заметки
                        </Button>
                        <Button variant="outline" size="sm">
                          Отчет
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Мое расписание
                </CardTitle>
                <CardDescription>Управляйте своим рабочим расписанием</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {therapistData.schedule.map((day, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{day.day}</h3>
                      <Button variant="outline" size="sm">
                        Изменить
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {day.slots.map((slot, slotIndex) => (
                        <Badge key={slotIndex} variant="outline" className="bg-blue-50">
                          {slot}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Button className="flex-1">
                    Сохранить расписание
                  </Button>
                  <Button variant="outline">
                    Сбросить
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-green-600" />
                  Настройки доступности
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Длительность сессий</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-100 text-blue-800">30 минут</Badge>
                        <Badge className="bg-blue-100 text-blue-800">45 минут</Badge>
                        <Badge className="bg-blue-100 text-blue-800">60 минут</Badge>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Тип сессий</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-green-100 text-green-800">Онлайн</Badge>
                        <Badge className="bg-green-100 text-green-800">Очно</Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Настроить параметры сессий
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}