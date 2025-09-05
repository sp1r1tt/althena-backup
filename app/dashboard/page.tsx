"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Progress } from "../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Brain, Calendar, TrendingUp, Clock, FileText, Star, Activity, Heart, Target, Trash2 } from "lucide-react"
import Link from "next/link"
import ProfileHeader from '@/components/ProfileHeader'
import Footer from '@/components/Footer'

interface TestResult {
  id: string
  test_id: string
  name: string
  score: string
  level: string
  date: string
  color: string
  result_text?: string
  recommendations?: string
}

interface Booking {
  id: string
  session_date: string
  status: string
  therapists: {
    id: string
    user_id: string
    hourly_rate_uah: number
    users: {
      first_name: string
      last_name: string
    }
  }
}

interface UserProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  role: string
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [userData, setUserData] = useState({
    name: "Пользователь",
    email: "",
    joinDate: "",
    testsCompleted: 0,
    sessionsBooked: 0,
    nextSession: null as any,
    recentTests: [] as TestResult[],
    upcomingSessions: [] as any[],
    goals: [
      { title: "Снижение уровня тревожности", progress: 65, target: "К концу месяца" },
      { title: "Улучшение качества сна", progress: 40, target: "8 часов в сутки" },
      { title: "Регулярная медитация", progress: 80, target: "Ежедневно 15 минут" },
    ],
  })
  const [loading, setLoading] = useState(true)
  const [deletingTest, setDeletingTest] = useState<string | null>(null)
  const [deletingAll, setDeletingAll] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user profile
        const userResponse = await fetch('/api/auth/user')
        if (userResponse.ok) {
          const userProfile = await userResponse.json()
          setUserProfile(userProfile)

          // Check if user is a therapist and redirect them
          if (userProfile.role === 'therapist') {
            alert('Вы терапевт. Перенаправляем в кабинет терапевта.')
            window.location.href = '/therapist-dashboard'
            return
          }

          setUserData(prev => ({
            ...prev,
            name: userProfile.full_name || `${userProfile.first_name} ${userProfile.last_name}` || "Пользователь",
            email: userProfile.email || "",
          }))
        }

        // Fetch bookings
        const bookingsResponse = await fetch('/api/bookings/user')
        if (bookingsResponse.ok) {
          const bookingsData = await bookingsResponse.json()
          setBookings(bookingsData.bookings || [])

          // Update sessions count
          const confirmedBookings = bookingsData.bookings?.filter((b: Booking) => b.status === 'confirmed') || []
          setUserData(prev => ({
            ...prev,
            sessionsBooked: confirmedBookings.length,
          }))

          // Set next upcoming session
          const upcomingBookings = bookingsData.bookings?.filter((b: Booking) =>
            b.status === 'confirmed' && new Date(b.session_date) > new Date()
          ).sort((a: Booking, b: Booking) => new Date(a.session_date).getTime() - new Date(b.session_date).getTime()) || []

          if (upcomingBookings.length > 0) {
            const nextBooking = upcomingBookings[0]
            const sessionDate = new Date(nextBooking.session_date)
            const kyivTime = sessionDate.toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Europe/Kiev'
            })

            setUserData(prev => ({
              ...prev,
              nextSession: {
                therapist: `${nextBooking.therapists.users.first_name} ${nextBooking.therapists.users.last_name}`,
                date: sessionDate.toLocaleDateString('ru-RU', { timeZone: 'Europe/Kiev' }),
                time: kyivTime,
                type: "Онлайн консультация",
              },
            }))
          }

          // Update upcoming sessions list
          const upcomingSessionsList = upcomingBookings.slice(0, 5).map((booking: Booking) => {
            const sessionDate = new Date(booking.session_date)
            const kyivTime = sessionDate.toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Europe/Kiev'
            })

            return {
              therapist: `${booking.therapists.users.first_name} ${booking.therapists.users.last_name}`,
              date: sessionDate.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'short',
                timeZone: 'Europe/Kiev'
              }),
              time: kyivTime,
              type: "Онлайн",
            }
          })

          setUserData(prev => ({
            ...prev,
            upcomingSessions: upcomingSessionsList,
          }))
        }

        // Fetch test results
        const testResultsResponse = await fetch('/api/auth/user/test-results')
        if (testResultsResponse.ok) {
          const testResultsData = await testResultsResponse.json()
          setUserData(prev => ({
            ...prev,
            recentTests: testResultsData.testResults || [],
            testsCompleted: testResultsData.total || 0,
          }))
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleDeleteTest = async (testId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот результат теста?')) {
      return
    }

    setDeletingTest(testId)
    try {
      const response = await fetch(`/api/test-results/${testId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Remove the test from the local state
        setUserData(prev => ({
          ...prev,
          recentTests: prev.recentTests.filter(test => test.id !== testId),
          testsCompleted: prev.testsCompleted - 1
        }))
        alert('Результат теста успешно удален')
      } else {
        const error = await response.json()
        alert(`Ошибка при удалении: ${error.error}`)
      }
    } catch (error) {
      console.error('Error deleting test:', error)
      alert('Произошла ошибка при удалении теста')
    } finally {
      setDeletingTest(null)
    }
  }

  const handleDeleteAllTests = async () => {
    if (userData.recentTests.length === 0) {
      alert('У вас нет сохраненных результатов тестов для удаления')
      return
    }

    const confirmMessage = `Вы уверены, что хотите удалить ВСЕ ${userData.recentTests.length} результатов тестов? Это действие нельзя отменить.`
    if (!confirm(confirmMessage)) {
      return
    }

    setDeletingAll(true)
    try {
      const response = await fetch('/api/auth/user/test-results', {
        method: 'DELETE',
      })

      if (response.ok) {
        // Clear all test results from local state
        setUserData(prev => ({
          ...prev,
          recentTests: [],
          testsCompleted: 0
        }))
        alert('Все результаты тестов успешно удалены')
      } else {
        const error = await response.json()
        alert(`Ошибка при удалении: ${error.error}`)
      }
    } catch (error) {
      console.error('Error deleting all tests:', error)
      alert('Произошла ошибка при удалении тестов')
    } finally {
      setDeletingAll(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* ProfileHeader */}
      <ProfileHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Личный кабинет</h1>
          <p className="text-gray-600">Отслеживайте свой прогресс и управляйте сессиями</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="tests">Тесты</TabsTrigger>
            <TabsTrigger value="sessions">Сессии</TabsTrigger>
            <TabsTrigger value="progress">Прогресс</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Пройдено тестов</p>
                      <p className="text-2xl font-bold text-gray-900">{userData.testsCompleted}</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Сессий забронировано</p>
                      <p className="text-2xl font-bold text-gray-900">{userData.sessionsBooked}</p>
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
                      <p className="text-2xl font-bold text-gray-900">45</p>
                    </div>
                    <Activity className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Общий прогресс</p>
                      <p className="text-2xl font-bold text-gray-900">62%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Next Session */}
            {userData.nextSession ? (
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Следующая сессия</h3>
                      <p className="text-blue-100 mb-1">{userData.nextSession.therapist}</p>
                      <p className="text-blue-100">
                        {userData.nextSession.date} в {userData.nextSession.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="bg-white/20 text-white mb-2">
                        {userData.nextSession.type}
                      </Badge>
                      <div>
                        <Button variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-to-r from-gray-400 to-gray-500 text-white">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Нет предстоящих сессий</h3>
                    <p className="text-gray-200 mb-4">У вас нет запланированных консультаций</p>
                    <Button variant="secondary" size="sm" className="bg-white text-gray-600 hover:bg-gray-50" asChild>
                      <Link href="/therapists">Найти специалиста</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Последние тесты
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userData.recentTests.map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{test.name}</p>
                        <p className="text-sm text-gray-600">{test.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={`${
                            test.color === "green"
                              ? "bg-green-100 text-green-800"
                              : test.color === "yellow"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {test.level}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">{test.score}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/tests">Пройти новый тест</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    Предстоящие сессии
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userData.upcomingSessions.length > 0 ? (
                    <>
                      {userData.upcomingSessions.map((session, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{session.therapist}</p>
                            <p className="text-sm text-gray-600">
                              {session.date} в {session.time}
                            </p>
                          </div>
                          <Badge variant="outline">{session.type}</Badge>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <Link href="/therapists">Найти другого специалиста</Link>
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Нет предстоящих сессий</h3>
                      <p className="text-gray-600 mb-4">У вас нет запланированных консультаций</p>
                      <Button asChild>
                        <Link href="/therapists">Найти специалиста</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>История тестов</CardTitle>
                    <CardDescription>Все пройденные психологические тесты и их результаты</CardDescription>
                  </div>
                  {userData.recentTests.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={handleDeleteAllTests}
                      disabled={deletingAll}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
                    >
                      {deletingAll ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                      ) : (
                        <Trash2 className="mr-2 h-4 w-4" />
                      )}
                      Удалить все ({userData.recentTests.length})
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {userData.recentTests.length === 0 ? (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Нет сохраненных результатов</h3>
                    <p className="text-gray-600 mb-4">Вы еще не проходили психологические тесты</p>
                    <Button asChild>
                      <Link href="/tests">Пройти тест</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userData.recentTests.map((test, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Brain className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{test.name}</h3>
                            <p className="text-sm text-gray-600">Пройден {test.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{test.score}</p>
                            <Badge
                              className={`${
                                test.color === "green"
                                  ? "bg-green-100 text-green-800"
                                  : test.color === "yellow"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-orange-100 text-orange-800"
                              }`}
                            >
                              {test.level}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/tests/${test.test_id}/results?resultId=${test.id}`}>
                                Посмотреть
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteTest(test.id)}
                              disabled={deletingTest === test.id}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              {deletingTest === test.id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Предстоящие сессии</CardTitle>
                  <CardDescription>
                    Ваши запланированные консультации ({userData.upcomingSessions.length})
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userData.upcomingSessions.length > 0 ? (
                    userData.upcomingSessions.map((session, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-gray-900">{session.therapist}</h3>
                          <Badge variant="outline">{session.type}</Badge>
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
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="flex-1">
                            Присоединиться
                          </Button>
                          <Button variant="outline" size="sm">
                            Перенести
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Нет предстоящих сессий</h3>
                      <p className="text-gray-600 mb-4">У вас нет запланированных консультаций</p>
                      <Button asChild>
                        <Link href="/therapists">Найти специалиста</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>История сессий</CardTitle>
                  <CardDescription>
                    Прошедшие консультации ({bookings.filter(b => b.status === 'confirmed' && new Date(b.session_date) < new Date()).length})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.filter(b => b.status === 'confirmed' && new Date(b.session_date) < new Date()).length > 0 ? (
                      bookings
                        .filter(b => b.status === 'confirmed' && new Date(b.session_date) < new Date())
                        .sort((a, b) => new Date(b.session_date).getTime() - new Date(a.session_date).getTime())
                        .slice(0, 5)
                        .map((booking) => {
                          const sessionDate = new Date(booking.session_date)
                          const kyivTime = sessionDate.toLocaleTimeString('ru-RU', {
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZone: 'Europe/Kiev'
                          })

                          return (
                            <div key={booking.id} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="font-medium text-gray-900">
                                  {booking.therapists.users.first_name} {booking.therapists.users.last_name}
                                </h3>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  <span className="text-sm">5.0</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                {sessionDate.toLocaleDateString('ru-RU', { timeZone: 'Europe/Kiev' })} • {kyivTime} • Онлайн консультация
                              </p>
                              <Button variant="outline" size="sm">
                                Оставить отзыв
                              </Button>
                            </div>
                          )
                        })
                    ) : (
                      <div className="text-center py-8">
                        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Нет прошедших сессий</h3>
                        <p className="text-gray-600">У вас еще не было завершенных консультаций</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Личные цели
                </CardTitle>
                <CardDescription>Отслеживайте прогресс в достижении ваших целей</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {userData.goals.map((goal, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{goal.title}</h3>
                      <span className="text-sm text-gray-600">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <p className="text-sm text-gray-600">Цель: {goal.target}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  Добавить новую цель
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Дневник настроения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
                    <div key={day} className="text-center text-sm text-gray-600 p-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 7 }, (_, i) => (
                    <div key={i} className="h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">😊</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Записать настроение сегодня
                </Button>
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
