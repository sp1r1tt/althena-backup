"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Brain, Search, Star, MapPin, Clock, Users, ArrowRight, Award, Calendar, Loader2 } from "lucide-react"
import Link from "next/link"
import ProfileHeader from '@/components/ProfileHeader'
import Footer from '@/components/Footer'

interface Therapist {
  id: string
  name: string
  title: string
  specializations: string[]
  experience: number
  rating: number
  reviews_count: number
  hourly_rate: number
  location: string
  languages: string[]
  approach: string
  available_today: boolean
  next_available: string
  total_sessions: number
  image: string
  bio: string
  all_available_slots?: Array<{
    date: string
    times: string[]
    fullDate: Date
  }>
}

const specializations = [
  "Все специализации",
  "Когнитивно-поведенческий терапевт (КПТ)",
  "Гештальт-терапевт",
  "Психоаналитик",
  "Экзистенциальный терапевт",
  "Телесно-ориентированный терапевт",
  "Семейный терапевт",
  "Травматерапевт",
  "Арт-терапевт",
  "EMDR-терапевт (работа с травмами и ПТСР)",
  "Терапевт ACT (терапия принятия и ответственности)",
  "Депрессия",
  "Тревожные расстройства",
  "Панические атаки",
  "ПТСР",
  "Зависимости",
  "Детская психология",
  "Подростковая терапия",
  "Личностные расстройства",
]

const locations = ["Все города", "Киев", "Харьков", "Онлайн"]

export default function TherapistsPage() {
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("Все специализации")
  const [selectedLocation, setSelectedLocation] = useState("Все города")
  const [availableToday, setAvailableToday] = useState(false)

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const params = new URLSearchParams()
        if (selectedSpecialization !== "Все специализации") {
          params.append("specialization", selectedSpecialization)
        }
        if (selectedLocation !== "Все города") {
          params.append("location", selectedLocation)
        }
        if (availableToday) {
          params.append("availableToday", "true")
        }
        if (searchQuery) {
          params.append("search", searchQuery)
        }

        console.log('[THERAPISTS PAGE] Fetching therapists with params:', params.toString())
        const response = await fetch(`/api/therapists?${params.toString()}`)
        console.log('[THERAPISTS PAGE] Response status:', response.status)
        const data = await response.json()
        console.log('[THERAPISTS PAGE] Response data:', data)

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch therapists")
        }

        setTherapists(data.therapists)
        console.log('[THERAPISTS PAGE] Set therapists:', data.therapists)
      } catch (err) {
        console.error("Error fetching therapists:", err)
        setError(err instanceof Error ? err.message : "Failed to load therapists")
        // Remove fallback hardcoded data - let it show error instead
        setTherapists([])
      } finally {
        setLoading(false)
      }
    }

    fetchTherapists()
  }, [searchQuery, selectedSpecialization, selectedLocation, availableToday])

  const filteredTherapists = therapists.filter((therapist) => {
    const matchesSearch =
      therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.specializations.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSpecialization =
      selectedSpecialization === "Все специализации" ||
      therapist.specializations.includes(selectedSpecialization) ||
      therapist.title === selectedSpecialization

    const matchesLocation = selectedLocation === "Все города" || therapist.location.includes(selectedLocation)

    const matchesAvailability = !availableToday || therapist.available_today

    return matchesSearch && matchesSpecialization && matchesLocation && matchesAvailability
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span>Загрузка специалистов...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* ProfileHeader */}
      <ProfileHeader />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Сертифицированные специалисты
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">Найдите своего терапевта</h1>
          <p className="text-xl text-gray-600 mb-8 text-pretty max-w-2xl mx-auto">
            Работайте с проверенными психологами и психотерапевтами. Все специалисты имеют соответствующее образование и
            опыт работы
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Поиск по имени или специализации..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
              <SelectTrigger>
                <SelectValue placeholder="Специализация" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Город" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <Button
              variant={availableToday ? "default" : "outline"}
              size="sm"
              onClick={() => setAvailableToday(!availableToday)}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Доступны сегодня
            </Button>
            <span className="text-sm text-gray-600">Найдено: {filteredTherapists.length} специалистов</span>
          </div>
        </div>
      </section>

      {/* Therapists Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <p className="text-yellow-800 text-sm">⚠️ {error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTherapists.map((therapist) => (
              <Card key={therapist.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-4">
                  {/* Avatar and Basic Info */}
                  <div className="text-center mb-3">
                    {therapist.image ? (
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 mx-auto mb-2">
                        <img
                          src={therapist.image}
                          alt={therapist.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Users className="h-10 w-10 text-gray-600" />
                      </div>
                    )}

                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{therapist.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">{therapist.title}</p>

                    {therapist.available_today && (
                      <Badge className="bg-green-600 hover:bg-green-700 text-xs mb-2">Доступен сегодня</Badge>
                    )}
                  </div>

                  {/* Rating and Experience */}
                  <div className="flex justify-center items-center gap-4 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{therapist.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      <span>{therapist.experience} лет</span>
                    </div>
                  </div>

                  {/* Key Info */}
                  <div className="space-y-2 text-xs mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{therapist.location}</span>
                    </div>
                    {/* Availability Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-3 w-3 flex-shrink-0" />
                        <span className="text-xs">Доступные дни:</span>
                      </div>

                      {/* Show all available slots if available */}
                      {therapist.all_available_slots && therapist.all_available_slots.length > 0 ? (
                        <div className="ml-5 space-y-1">
                          {therapist.all_available_slots.slice(0, 3).map((slot, index) => (
                            <div key={index} className="text-gray-600 text-xs">
                              <span className="font-medium">{slot.date}:</span>
                              <span className="ml-1">
                                {slot.times.join(', ')}
                              </span>
                            </div>
                          ))}
                          {therapist.all_available_slots.length > 3 && (
                            <div className="text-gray-400 text-xs">
                              +{therapist.all_available_slots.length - 3} дат
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="ml-5 text-gray-400 text-xs">
                          Не указано
                        </div>
                      )}

                      {therapist.available_today && (
                        <div className="text-xs text-green-600 font-medium ml-5">
                          ✓ Доступен сегодня
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <span className="font-semibold text-gray-900">
                        {therapist.hourly_rate ? `${therapist.hourly_rate} ₴/час` : 'Цена не указана'}
                      </span>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {therapist.specializations.slice(0, 2).map((spec) => (
                        <Badge key={spec} variant="outline" className="text-xs px-2 py-0">
                          {spec}
                        </Badge>
                      ))}
                      {therapist.specializations.length > 2 && (
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          +{therapist.specializations.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="w-full bg-green-600 hover:bg-green-700 text-xs">
                      <Link href={`/therapists/${therapist.id}`}>
                        Посмотреть профиль
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Не нашли подходящего специалиста?</h2>
          <p className="text-gray-600 mb-8">
            Свяжитесь с нами, и мы поможем подобрать терапевта под ваши индивидуальные потребности
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Получить консультацию
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent">
              Связаться с поддержкой
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
