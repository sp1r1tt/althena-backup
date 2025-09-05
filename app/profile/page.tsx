"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Badge } from "../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Calendar } from "../../components/ui/calendar"
import { Camera, Save, User, Stethoscope, MapPin, Languages, DollarSign, Award, ChevronDown, Calendar as CalendarIcon, Clock, Plus, X } from "lucide-react"
import { format, isBefore, startOfDay } from "date-fns"
import { ru } from "date-fns/locale"
import ProfileHeader from '@/components/ProfileHeader'
import Footer from '@/components/Footer'

interface UserProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  bio?: string
  profile_image_url?: string
  role: 'client' | 'therapist'
  is_verified?: boolean
}

interface TherapistProfile extends UserProfile {
  specializations: string[]
  experience_years: number
  hourly_rate_uah: number
  therapy_approach?: string
  category?: string
  location?: string
  education?: string
  certifications?: string[]
}

const therapyCategories = [
  "Когнитивно-поведенческий терапевт (КПТ)",
  "Гештальт-терапевт",
  "Психоаналитик",
  "Экзистенциальный терапевт",
  "Телесно-ориентированный терапевт",
  "Семейный терапевт",
  "Травматерапевт",
  "Арт-терапевт",
  "EMDR-терапевт (работа с травмами и ПТСР)",
  "Терапевт ACT (терапия принятия и ответственности)"
]


interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  placeholder: string
  options: string[]
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder,
  options
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.custom-select-container')) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative custom-select-container">
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`w-full h-12 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 shadow-sm px-3 text-left flex items-center justify-between ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-150 ${
                  value === option ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | TherapistProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [currentTimeSlot, setCurrentTimeSlot] = useState('')
  const [showTimeSlots, setShowTimeSlots] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    bio: '',
    profile_image_url: '',
    // Therapist specific fields
    specializations: [] as string[],
    experience_years: 0,
    hourly_rate_uah: 0,
    therapy_approach: '',
    category: '',
    location: '',
    education: '',
    certifications: [] as string[],
    available_times: {} as { [date: string]: string[] }
  })

  // Debug: Log form data changes
  useEffect(() => {
    console.log('Form data updated:', formData)
  }, [formData])

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/auth/user/profile')
      if (response.ok) {
        const data = await response.json()
        console.log('Fetched profile data:', data)
        console.log('Available times from API:', data.user.available_times)

        setUser(data.user)
        setFormData({
          first_name: data.user.first_name || '',
          last_name: data.user.last_name || '',
          phone: data.user.phone || '',
          bio: data.user.bio || '',
          profile_image_url: data.user.profile_image_url || '',
          specializations: data.user.specializations || [],
          experience_years: data.user.experience_years || 0,
          hourly_rate_uah: data.user.hourly_rate_uah || 0,
          therapy_approach: data.user.therapy_approach || '',
          category: data.user.category || '',
          location: data.user.location || '',
          education: data.user.education || '',
          certifications: data.user.certifications || [],
          available_times: data.user.available_times || {}
        })

        // Initialize selected dates from available_times
        const availableTimes = data.user.available_times || {}
        console.log('Available times object:', availableTimes)

        const validDates = Object.keys(availableTimes)
          .filter(dateKey => {
            const times = availableTimes[dateKey]
            return Array.isArray(times) && times.length > 0
          })
          .map(dateStr => {
            console.log('Converting date string:', dateStr)
            return new Date(dateStr)
          })
          .filter(date => !isNaN(date.getTime()))

        // Remove any potential duplicates
        const uniqueValidDates = Array.from(new Set(validDates.map(d => d.getTime())))
          .map(time => validDates.find(d => d.getTime() === time)!)
          .filter(Boolean)

        console.log('Valid dates to set:', uniqueValidDates)
        setSelectedDates(uniqueValidDates)

        console.log('Profile loaded successfully')
      } else {
        console.error('Failed to fetch profile:', response.status)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      console.log('Saving profile data:', formData)
      console.log('Available times to save:', formData.available_times)

      const response = await fetch('/api/auth/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Profile save response status:', response.status)
      const responseData = await response.json()
      console.log('Profile save response data:', responseData)

      if (response.ok) {
        setUser(responseData.user)
        setIsEditing(false)
        alert('Профиль успешно обновлен!')
        console.log('Profile saved successfully with available_times:', responseData.user.available_times)
      } else {
        console.error('Profile save failed:', responseData)
        alert(`Ошибка при сохранении профиля: ${responseData.error || 'Неизвестная ошибка'}`)
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Произошла ошибка при сохранении')
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    console.log('Uploading image file:', file.name, 'Size:', file.size)

    // Here you would typically upload to a cloud storage service
    // For now, we'll just set a placeholder
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64Image = e.target?.result as string
      console.log('Image converted to base64, length:', base64Image.length)
      console.log('Base64 preview:', base64Image.substring(0, 100) + '...')

      setFormData(prev => ({
        ...prev,
        profile_image_url: base64Image
      }))

      console.log('Updated formData with image')
    }
    reader.readAsDataURL(file)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Не авторизован</CardTitle>
            <CardDescription>Пожалуйста, войдите в систему</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const isTherapist = user.role === 'therapist'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <ProfileHeader />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-16">Профиль</h1>
          <p className="text-gray-600">
            {isTherapist ? 'Управление профилем терапевта' : 'Управление профилем клиента'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Photo and Basic Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="w-32 h-32 mx-auto mb-4">
                      <AvatarImage src={formData.profile_image_url || user.profile_image_url} />
                      <AvatarFallback className="text-2xl">
                        {isTherapist ? <Stethoscope className="w-8 h-8" /> : <User className="w-8 h-8" />}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                        <Camera className="w-4 h-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Badge variant={isTherapist ? "default" : "secondary"}>
                      {isTherapist ? "Терапевт" : "Клиент"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Личная информация</CardTitle>
                    <CardDescription>
                      {isEditing ? 'Редактирование профиля' : 'Просмотр профиля'}
                    </CardDescription>
                  </div>
                  <Button
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    disabled={saving}
                  >
                    {saving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    {isEditing ? 'Сохранить' : 'Редактировать'}
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name" className="text-sm font-medium text-gray-700 mb-2 block">
                      Имя
                    </Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full h-12 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 shadow-sm"
                      placeholder="Введите ваше имя"
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name" className="text-sm font-medium text-gray-700 mb-2 block">
                      Фамилия
                    </Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full h-12 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 shadow-sm"
                      placeholder="Введите вашу фамилию"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                    Телефон
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full h-12 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 shadow-sm"
                    placeholder="+380 XX XXX XX XX"
                  />
                </div>

                <div>
                  <Label htmlFor="bio" className="text-sm font-medium text-gray-700 mb-2 block">
                    О себе
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 shadow-sm resize-none"
                    placeholder="Расскажите немного о себе, вашем опыте и подходе к работе..."
                  />
                </div>

                {/* Therapist-specific fields */}
                {isTherapist && (
                  <>
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2" />
                        Профессиональная информация
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category" className="text-sm font-medium text-gray-700 mb-2 block">
                            Категория терапии
                          </Label>
                          <CustomSelect
                            value={formData.category}
                            onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                            disabled={!isEditing}
                            placeholder="Выберите категорию терапии"
                            options={therapyCategories}
                          />

                          {formData.category && (
                            <p className="text-xs text-gray-500 mt-1">
                              Выбрана категория: <span className="font-medium text-blue-600">{formData.category}</span>
                            </p>
                          )}
                        </div>


                        <div>
                          <Label htmlFor="experience_years" className="text-sm font-medium text-gray-700 mb-2 block">
                            Опыт работы (лет)
                          </Label>
                          <Input
                            id="experience_years"
                            type="number"
                            value={formData.experience_years}
                            onChange={(e) => setFormData(prev => ({ ...prev, experience_years: Number(e.target.value) }))}
                            disabled={!isEditing}
                            className="w-full h-12 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 shadow-sm"
                            placeholder="Введите количество лет"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label htmlFor="hourly_rate_uah" className="text-sm font-medium text-gray-700 mb-2 block">
                            Стоимость услуг (₴/час)
                          </Label>
                          <Input
                            id="hourly_rate_uah"
                            type="number"
                            value={formData.hourly_rate_uah}
                            onChange={(e) => setFormData(prev => ({ ...prev, hourly_rate_uah: Number(e.target.value) }))}
                            disabled={!isEditing}
                            className="w-full h-12 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 shadow-sm"
                            placeholder="Введите стоимость в гривнах"
                          />
                        </div>

                        <div>
                          <Label htmlFor="location" className="text-sm font-medium text-gray-700 mb-2 block">
                            Город
                          </Label>
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                            disabled={!isEditing}
                            className="w-full h-12 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 shadow-sm"
                            placeholder="Введите город"
                          />
                        </div>
                      </div>

                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <CalendarIcon className="w-5 h-5 mr-2" />
                        Доступное время
                      </h3>

                      <div className="space-y-6">
                        <p className="text-sm text-gray-600">
                          Выберите даты, когда вы будете доступны для консультаций. Для каждой выбранной даты вы сможете установить время приема.
                        </p>

                        {/* Calendar for date selection */}
                        <div className="border rounded-lg p-4 bg-gray-50">
                          <h4 className="font-medium mb-4 text-center">Выберите доступные даты</h4>
                          <div className="flex justify-center">
                            <Calendar
                              mode="multiple"
                              selected={selectedDates}
                              onSelect={(dates) => {
                                if (dates) {
                                  // Remove duplicates by converting to Set and back to array
                                  const uniqueDates = Array.from(new Set(dates.map(d => d.getTime())))
                                    .map(time => dates.find(d => d.getTime() === time)!)
                                    .filter(Boolean)

                                  setSelectedDates(uniqueDates)
                                  // Initialize time slots for new dates
                                  const newAvailableTimes = { ...formData.available_times }
                                  uniqueDates.forEach(date => {
                                    const dateKey = format(date, 'yyyy-MM-dd')
                                    if (!newAvailableTimes[dateKey]) {
                                      newAvailableTimes[dateKey] = []
                                    }
                                  })
                                  setFormData(prev => ({ ...prev, available_times: newAvailableTimes }))
                                }
                              }}
                              disabled={(date) => isBefore(date, startOfDay(new Date()))}
                              locale={ru}
                              className="rounded-md border bg-white"
                            />
                          </div>
                        </div>

                        {/* Time slots management for selected dates */}
                        {selectedDates.length > 0 && (
                          <div className="space-y-4">
                            <h4 className="font-medium">Управление временем для выбранных дат</h4>

                            {Array.from(new Set(selectedDates.map(d => d.getTime())))
                              .map(time => selectedDates.find(d => d.getTime() === time)!)
                              .filter(Boolean)
                              .sort((a, b) => a.getTime() - b.getTime())
                              .map((date) => {
                                const dateKey = format(date, 'yyyy-MM-dd')
                                const times = formData.available_times[dateKey] || []

                                return (
                                  <div key={dateKey} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-3">
                                      <h5 className="font-medium">
                                        {format(date, 'dd.MM.yyyy', { locale: ru })} ({format(date, 'EEEE', { locale: ru })})
                                      </h5>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          setSelectedDates(prev => prev.filter(d => d.getTime() !== date.getTime()))
                                          const newAvailableTimes = { ...formData.available_times }
                                          delete newAvailableTimes[dateKey]
                                          setFormData(prev => ({ ...prev, available_times: newAvailableTimes }))
                                        }}
                                      >
                                        <X className="w-4 h-4 mr-1" />
                                        Удалить дату
                                      </Button>
                                    </div>

                                    {/* Time slots */}
                                    <div className="mb-3">
                                      <div className="flex flex-wrap gap-2 mb-3">
                                        {times.map((time) => (
                                          <Badge key={time} variant="secondary" className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {time}
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const newTimes = times.filter(t => t !== time)
                                                setFormData(prev => ({
                                                  ...prev,
                                                  available_times: {
                                                    ...prev.available_times,
                                                    [dateKey]: newTimes
                                                  }
                                                }))
                                              }}
                                              className="ml-1 hover:text-red-600"
                                            >
                                              <X className="w-3 h-3" />
                                            </button>
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Add time slot */}
                                    <div className="flex gap-2">
                                      <Input
                                        type="time"
                                        value={currentTimeSlot}
                                        onChange={(e) => setCurrentTimeSlot(e.target.value)}
                                        className="w-32"
                                        placeholder="HH:MM"
                                      />
                                      <Button
                                        type="button"
                                        size="sm"
                                        onClick={() => {
                                          if (currentTimeSlot && !times.includes(currentTimeSlot)) {
                                            const newTimes = [...times, currentTimeSlot].sort()
                                            setFormData(prev => ({
                                              ...prev,
                                              available_times: {
                                                ...prev.available_times,
                                                [dateKey]: newTimes
                                              }
                                            }))
                                            setCurrentTimeSlot('')
                                          }
                                        }}
                                        disabled={!currentTimeSlot}
                                      >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Добавить
                                      </Button>
                                    </div>
                                  </div>
                                )
                              })}
                          </div>
                        )}

                        {/* Summary */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Сводка доступности</h4>
                          <div className="text-sm text-blue-700">
                            <p>Выбрано дат: <strong>{selectedDates.length}</strong></p>
                            <p>Всего временных слотов: <strong>{Object.values(formData.available_times).reduce((total, times) => total + times.length, 0)}</strong></p>
                            {selectedDates.length > 0 && (
                              <p className="text-orange-600 mt-2">
                                ⚠️ Не забудьте нажать "Сохранить изменения" чтобы сохранить настройки доступности
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSave} disabled={saving} className="flex-1">
                      {saving ? 'Сохранение...' : 'Сохранить изменения'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false)
                        fetchProfile() // Reset form data
                      }}
                      className="flex-1"
                    >
                      Отмена
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}