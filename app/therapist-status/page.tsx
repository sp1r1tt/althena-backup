"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react"
import ProfileHeader from '@/components/ProfileHeader'
import Footer from '@/components/Footer'

interface TherapistProfile {
  id: string
  user_id: string
  bio: string
  experience_years: number
  education: string
  certifications: string[]
  hourly_rate_uah: number
  available_times: any
  is_verified: boolean
  rating: number
  total_sessions: number
  created_at: string
  updated_at: string
}

interface UserProfile {
  id: string
  email: string
  role: string
}

export default function TherapistStatusPage() {
  const [profile, setProfile] = useState<{
    therapist: TherapistProfile | null
    user: UserProfile | null
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/therapists/profile')
      const data = await response.json()

      if (response.ok) {
        setProfile(data)
      } else {
        setMessage(data.error || 'Failed to fetch profile')
      }
    } catch (error) {
      setMessage('Error fetching profile')
    } finally {
      setLoading(false)
    }
  }

  const updateVerification = async () => {
    setUpdating(true)
    setMessage(null)

    try {
      const response = await fetch('/api/therapists/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'verify' }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Статус верификации успешно обновлен!')
        // Refresh profile data
        await fetchProfile()
      } else {
        setMessage(data.error || 'Failed to update verification status')
      }
    } catch (error) {
      setMessage('Error updating verification status')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span>Загрузка профиля...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <ProfileHeader />

      <div className="container mx-auto px-4 py-8 mt-16 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Статус терапевта</h1>
          <p className="text-gray-600">Проверьте статус вашего профиля терапевта</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* User Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Информация о пользователе
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile?.user && (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-900">{profile.user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Роль</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={profile.user.role === 'therapist' ? 'default' : 'secondary'}>
                        {profile.user.role === 'therapist' ? 'Терапевт' : 'Клиент'}
                      </Badge>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Therapist Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {profile?.therapist?.is_verified ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                Профиль терапевта
              </CardTitle>
              <CardDescription>
                Статус вашего профиля терапевта
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile?.therapist ? (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Статус верификации</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={profile.therapist.is_verified ? 'default' : 'destructive'}>
                        {profile.therapist.is_verified ? 'Верифицирован' : 'Не верифицирован'}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Опыт работы</label>
                    <p className="text-gray-900">{profile.therapist.experience_years} лет</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Стоимость</label>
                    <p className="text-gray-900">{profile.therapist.hourly_rate_uah}₴/час</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Рейтинг</label>
                    <p className="text-gray-900">{profile.therapist.rating}/5.0</p>
                  </div>

                  {!profile.therapist.is_verified && (
                    <Button
                      onClick={updateVerification}
                      disabled={updating}
                      className="w-full"
                    >
                      {updating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Обновление...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Стать верифицированным терапевтом
                        </>
                      )}
                    </Button>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Профиль терапевта не найден</p>
                  <p className="text-sm text-gray-500">
                    Зарегистрируйтесь как терапевт, чтобы создать профиль
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Status Messages */}
        {message && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className={`p-4 rounded-lg ${
                message.includes('успешно') || message.includes('successfully')
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`text-sm ${
                  message.includes('успешно') || message.includes('successfully')
                    ? 'text-green-800'
                    : 'text-red-800'
                }`}>
                  {message}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Как стать видимым терапевтом</CardTitle>
            <CardDescription>
              Чтобы отображаться в списке терапевтов и получать клиентов
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>Зарегистрируйтесь как терапевт на платформе</li>
              <li>Ваш профиль должен иметь статус "Верифицирован"</li>
              <li>Заполните информацию о себе (опыт, образование, стоимость)</li>
              <li>После этого вы будете видны клиентам на странице терапевтов</li>
              <li>Клиенты смогут записываться к вам после прохождения тестов</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}