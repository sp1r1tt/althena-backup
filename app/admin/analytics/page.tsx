"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import ProfileHeader from '@/components/ProfileHeader'
import Footer from '@/components/Footer'

interface AnalyticsEvent {
  id: string
  event_type: string
  event_data: any
  user_id?: string
  session_id: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  referrer?: string
  created_at: string
}

interface ConversionMetrics {
  tests_to_purchase: number
  therapists_to_booking: number
  how_it_works_to_action: number
}

interface TherapistMetrics {
  therapist_id: string
  name: string
  views: number
  bookings: number
  conversion_rate: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function AnalyticsPage() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([])
  const [conversions, setConversions] = useState<ConversionMetrics>({
    tests_to_purchase: 0,
    therapists_to_booking: 0,
    how_it_works_to_action: 0,
  })
  const [therapistMetrics, setTherapistMetrics] = useState<TherapistMetrics[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [checkingAccess, setCheckingAccess] = useState(true)

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const response = await fetch("/api/admin/check-access")
      const data = await response.json()

      if (data.isAdmin) {
        setIsAdmin(true)
        fetchAnalyticsData()
      } else {
        setIsAdmin(false)
      }
    } catch (error) {
      console.error("Failed to check admin access:", error)
      setIsAdmin(false)
    } finally {
      setCheckingAccess(false)
    }
  }

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch("/api/admin/analytics")
      const data = await response.json()

      setEvents(data.events || [])
      setConversions(data.conversions || {})
      setTherapistMetrics(data.therapistMetrics || [])
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const getEventsByType = () => {
    const eventCounts = events.reduce(
      (acc, event) => {
        acc[event.event_type] = (acc[event.event_type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(eventCounts).map(([name, count]) => ({
      name: name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      count,
    }))
  }

  const getTrafficSources = () => {
    const sources = events.reduce(
      (acc, event) => {
        const source = event.utm_source || "Direct"
        acc[source] = (acc[source] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(sources).map(([name, value]) => ({ name, value }))
  }

  const getDailyEvents = () => {
    const dailyData = events.reduce(
      (acc, event) => {
        const date = new Date(event.created_at).toISOString().split("T")[0]
        acc[date] = (acc[date] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(dailyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-7) // Last 7 days
      .map(([date, count]) => ({
        date: new Date(date).toLocaleDateString("ru-RU", { month: "short", day: "numeric" }),
        events: count,
      }))
  }

  if (checkingAccess) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Проверка доступа...</div>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Доступ запрещен</h2>
            <p className="text-gray-600">У вас нет прав для просмотра этой страницы.</p>
            <p className="text-sm text-gray-500 mt-2">Необходимы права администратора.</p>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Загрузка аналитики...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* ProfileHeader */}
      <ProfileHeader />

      <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Аналитика платформы</h1>
        <Button onClick={fetchAnalyticsData} variant="outline">
          Обновить данные
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="conversions">Конверсии</TabsTrigger>
          <TabsTrigger value="therapists">Терапевты</TabsTrigger>
          <TabsTrigger value="traffic">Трафик</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Всего событий</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{events.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Уникальные пользователи</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{new Set(events.map((e) => e.user_id || e.session_id)).size}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Просмотры тестов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{events.filter((e) => e.event_type === "test_view").length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Завершенные покупки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {events.filter((e) => e.event_type === "checkout_completed").length}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>События по дням</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getDailyEvents()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="events" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Типы событий</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getEventsByType()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Тесты → Покупка</CardTitle>
                <CardDescription>Конверсия из просмотра тестов в покупку</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{conversions.tests_to_purchase.toFixed(1)}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Терапевты → Бронирование</CardTitle>
                <CardDescription>Конверсия из просмотра терапевтов в бронирование</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{conversions.therapists_to_booking.toFixed(1)}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>"Как это работает" → Действие</CardTitle>
                <CardDescription>Конверсия со страницы описания в действие</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">
                  {conversions.how_it_works_to_action.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="therapists" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Метрики терапевтов</CardTitle>
              <CardDescription>Просмотры профилей и конверсия в бронирования</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {therapistMetrics.map((therapist) => (
                  <div key={therapist.therapist_id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{therapist.name}</h3>
                      <p className="text-sm text-muted-foreground">ID: {therapist.therapist_id}</p>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{therapist.views}</div>
                        <div className="text-muted-foreground">Просмотры</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{therapist.bookings}</div>
                        <div className="text-muted-foreground">Бронирования</div>
                      </div>
                      <div className="text-center">
                        <Badge variant={therapist.conversion_rate > 10 ? "default" : "secondary"}>
                          {therapist.conversion_rate.toFixed(1)}%
                        </Badge>
                        <div className="text-muted-foreground">Конверсия</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Источники трафика</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={getTrafficSources()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {getTrafficSources().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
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
