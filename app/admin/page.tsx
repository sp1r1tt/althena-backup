"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Users, Calendar, TrendingUp, DollarSign, Brain, Activity, FileText, Star, BarChart3 } from "lucide-react"
import Link from "next/link"
import ProfileHeader from '@/components/ProfileHeader'
import Footer from '@/components/Footer'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock admin data
  const adminData = {
    totalUsers: 1247,
    activeUsers: 892,
    totalSessions: 3456,
    completedTests: 5678,
    revenue: 125000,
    monthlyGrowth: 12.5,
    recentUsers: [
      { name: "Анна Петрова", email: "anna@example.com", joinDate: "2024-12-20", status: "active" },
      { name: "Михаил Козлов", email: "mikhail@example.com", joinDate: "2024-12-19", status: "active" },
      { name: "Елена Смирнова", email: "elena@example.com", joinDate: "2024-12-18", status: "pending" },
    ],
    topTherapists: [
      { name: "Др. Елена Смирнова", sessions: 156, rating: 4.9, revenue: 46800 },
      { name: "Др. Михаил Козлов", sessions: 134, rating: 4.8, revenue: 40200 },
      { name: "Др. Анна Волкова", sessions: 128, rating: 4.9, revenue: 38400 },
    ],
    testStats: [
      { name: "Тест на депрессию и тревожность", completed: 2341, avgScore: 8.2 },
      { name: "Тест на стресс", completed: 1876, avgScore: 12.4 },
      { name: "Оценка самооценки", completed: 1543, avgScore: 15.1 },
    ],
    recentBookings: [
      { user: "Анна П.", therapist: "Др. Смирнова", date: "2024-12-25", time: "14:00", status: "confirmed" },
      { user: "Михаил К.", therapist: "Др. Козлов", date: "2024-12-24", time: "16:30", status: "pending" },
      { user: "Елена С.", therapist: "Др. Волкова", date: "2024-12-23", time: "10:00", status: "confirmed" },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* ProfileHeader */}
      <ProfileHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Панель администратора</h1>
          <p className="text-gray-600">Управление платформой и аналитика</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="users">Пользователи</TabsTrigger>
            <TabsTrigger value="therapists">Терапевты</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="finance">Финансы</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Всего пользователей</p>
                      <p className="text-2xl font-bold text-gray-900">{adminData.totalUsers.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+{adminData.monthlyGrowth}% за месяц</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Активные пользователи</p>
                      <p className="text-2xl font-bold text-gray-900">{adminData.activeUsers.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">
                        {Math.round((adminData.activeUsers / adminData.totalUsers) * 100)}% от общего числа
                      </p>
                    </div>
                    <Activity className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Всего сессий</p>
                      <p className="text-2xl font-bold text-gray-900">{adminData.totalSessions.toLocaleString()}</p>
                      <p className="text-xs text-blue-600">+156 за неделю</p>
                    </div>
                    <Calendar className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Доход</p>
                      <p className="text-2xl font-bold text-gray-900">{adminData.revenue.toLocaleString()} ₴</p>
                      <p className="text-xs text-green-600">+8.2% за месяц</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Новые пользователи
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {adminData.recentUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            user.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {user.status === "active" ? "Активен" : "Ожидает"}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{user.joinDate}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    Последние бронирования
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {adminData.recentBookings.map((booking, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          {booking.user} → {booking.therapist}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.date} в {booking.time}
                        </p>
                      </div>
                      <Badge
                        className={
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {booking.status === "confirmed" ? "Подтверждено" : "Ожидает"}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Управление пользователями</CardTitle>
                <CardDescription>Просмотр и управление всеми пользователями платформы</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminData.recentUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">Регистрация: {user.joinDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          className={
                            user.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {user.status === "active" ? "Активен" : "Ожидает"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Управление
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="therapists" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Топ терапевты</CardTitle>
                <CardDescription>Статистика по самым активным специалистам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminData.topTherapists.map((therapist, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-green-600">#{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{therapist.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{therapist.sessions} сессий</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span>{therapist.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{therapist.revenue.toLocaleString()} ₴</p>
                        <p className="text-sm text-gray-600">Доход</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Статистика тестов
                </CardTitle>
                <CardDescription>Аналитика по психологическим тестам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminData.testStats.map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{test.name}</h3>
                          <p className="text-sm text-gray-600">Пройден {test.completed} раз</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">Средний балл: {test.avgScore}</p>
                        <p className="text-sm text-gray-600">из 20</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finance" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Общий доход</p>
                      <p className="text-2xl font-bold text-gray-900">{adminData.revenue.toLocaleString()} ₴</p>
                      <p className="text-xs text-green-600">+8.2% за месяц</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Средний чек</p>
                      <p className="text-2xl font-bold text-gray-900">3,200 ₴</p>
                      <p className="text-xs text-blue-600">+5.1% за месяц</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Конверсия</p>
                      <p className="text-2xl font-bold text-gray-900">12.4%</p>
                      <p className="text-xs text-green-600">+2.1% за месяц</p>
                    </div>
                    <Activity className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Финансовая сводка</CardTitle>
                <CardDescription>Детальная информация о доходах и расходах</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-gray-900">Доход от сессий</span>
                    <span className="font-bold text-green-600">+98,500 ₴</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-900">Доход от тестов</span>
                    <span className="font-bold text-blue-600">+26,500 ₴</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium text-gray-900">Комиссии платформы</span>
                    <span className="font-bold text-red-600">-12,500 ₴</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg border-t-2">
                    <span className="font-bold text-gray-900">Итого</span>
                    <span className="font-bold text-gray-900">{adminData.revenue.toLocaleString()} ₴</span>
                  </div>
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