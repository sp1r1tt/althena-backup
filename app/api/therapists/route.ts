import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../lib/supabase/server"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('[THERAPISTS API] Request received:', request.url)
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)

    // Get query parameters
    const specialization = searchParams.get('specialization')
    const location = searchParams.get('location')
    const availableToday = searchParams.get('availableToday')
    const search = searchParams.get('search')

    let query = supabase
      .from('therapists')
      .select(`
        id,
        user_id,
        specializations,
        bio,
        experience_years,
        education,
        certifications,
        hourly_rate_uah,
        available_times,
        is_verified,
        rating,
        total_sessions,
        profile_image_url,
        therapy_approach,
        location,
        languages,
        category,
        created_at,
        users!inner (
          first_name,
          last_name,
          email
        )
      `)
      // Показываем только реальных терапевтов с аккаунтами пользователей
      .neq('user_id', null)

    // Apply filters
    if (specialization && specialization !== 'Все специализации') {
      query = query.contains('specializations', [specialization])
    }

    if (availableToday) {
      // Filter therapists who have availability today
      const today = new Date().toISOString().split('T')[0]
      query = query.not('available_times', 'is', null).filter('available_times', 'cs', { [today]: [] })
    }

    if (search) {
      // Search in therapist name or specializations
      query = query.or(`users.first_name.ilike.%${search}%,users.last_name.ilike.%${search}%,specializations.cs.{${search}}`)
    }

    const { data: therapists, error } = await query

    if (error) {
      console.error('Error fetching therapists:', error)
      return NextResponse.json({ error: 'Failed to fetch therapists' }, { status: 500 })
    }

    // Remove duplicates based on user_id to prevent showing the same therapist multiple times
    const uniqueTherapists = therapists?.filter((therapist, index, self) =>
      index === self.findIndex(t => t.user_id === therapist.user_id)
    ) || []

    console.log('[THERAPISTS API] Found therapists before deduplication:', therapists?.length || 0)
    console.log('[THERAPISTS API] Found unique therapists after deduplication:', uniqueTherapists?.length || 0)

    if (uniqueTherapists && uniqueTherapists.length > 0) {
      console.log('Unique therapists:', uniqueTherapists.map(t => {
        const user = Array.isArray(t.users) ? t.users[0] : t.users
        return {
          id: t.id,
          name: user ? `${user.first_name} ${user.last_name}` : 'Unknown',
          email: user?.email || 'No email',
          is_verified: t.is_verified,
          experience: t.experience_years || 0,
          hourly_rate: t.hourly_rate_uah || 0
        }
      }))
    } else {
      console.log('No verified therapists found. Only therapists who registered and were verified will be shown.')
      console.log('To become visible, therapists need to:')
      console.log('1. Register as therapist')
      console.log('2. Have is_verified = true in therapists table')
      console.log('3. Have a valid user account linked')
    }

    // Helper function to calculate availability
    const calculateAvailability = (availableTimes: any) => {
      try {
        if (!availableTimes || typeof availableTimes !== 'object' || Object.keys(availableTimes).length === 0) {
          return {
            available_today: false,
            next_available: 'Не доступен'
          }
        }

        const today = new Date()
        const todayKey = today.toISOString().split('T')[0]
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const tomorrowKey = tomorrow.toISOString().split('T')[0]

        // Check if available today
        const todaySlots = availableTimes[todayKey]
        if (Array.isArray(todaySlots) && todaySlots.length > 0) {
          // Find next available slot today
          const currentTime = today.getHours() * 100 + today.getMinutes()
          const futureSlots = todaySlots
            .filter((time: any) => typeof time === 'string' && time.includes(':'))
            .map((time: string) => {
              const [hours, minutes] = time.split(':').map(Number)
              return hours * 100 + minutes
            })
            .filter((timeNum: number) => !isNaN(timeNum) && timeNum > currentTime)
            .sort((a: number, b: number) => a - b)

          if (futureSlots.length > 0) {
            const nextSlot = futureSlots[0]
            const hours = Math.floor(nextSlot / 100)
            const minutes = nextSlot % 100
            const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
            return {
              available_today: true,
              next_available: `Сегодня в ${timeStr}`
            }
          }
        }

        // Check tomorrow
        const tomorrowSlots = availableTimes[tomorrowKey]
        if (Array.isArray(tomorrowSlots) && tomorrowSlots.length > 0) {
          const validSlots = tomorrowSlots.filter((time: any) => typeof time === 'string' && time.includes(':'))
          if (validSlots.length > 0) {
            const firstSlot = validSlots.sort()[0]
            return {
              available_today: false,
              next_available: `Завтра в ${firstSlot}`
            }
          }
        }

        // Find next available date
        const availableDates = Object.keys(availableTimes)
          .filter(dateKey => {
            const slots = availableTimes[dateKey]
            return Array.isArray(slots) && slots.length > 0 && slots.some((time: any) => typeof time === 'string' && time.includes(':'))
          })
          .sort()

        if (availableDates.length > 0) {
          const nextDate = new Date(availableDates[0])
          const slots = availableTimes[availableDates[0]]
          if (Array.isArray(slots) && slots.length > 0) {
            const validSlots = slots.filter((time: any) => typeof time === 'string' && time.includes(':'))
            if (validSlots.length > 0) {
              const firstSlot = validSlots.sort()[0]
              const dateStr = nextDate.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long'
              })
              return {
                available_today: false,
                next_available: `${dateStr} в ${firstSlot}`
              }
            }
          }
        }

        return {
          available_today: false,
          next_available: 'Не доступен'
        }
      } catch (error) {
        console.error('Error calculating availability:', error)
        return {
          available_today: false,
          next_available: 'Не доступен'
        }
      }
    }

    // Transform data to match frontend interface
    const transformedTherapists = uniqueTherapists?.map(therapist => {
      const user = Array.isArray(therapist.users) ? therapist.users[0] : therapist.users
      const availability = calculateAvailability(therapist.available_times)

      // Get all available dates and times for display
      const allAvailableSlots = []
      if (therapist.available_times && typeof therapist.available_times === 'object') {
        for (const [dateKey, times] of Object.entries(therapist.available_times)) {
          if (Array.isArray(times) && times.length > 0) {
            const date = new Date(dateKey)
            if (!isNaN(date.getTime())) {
              const dateStr = date.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'short'
              })
              allAvailableSlots.push({
                date: dateStr,
                times: times.slice(0, 3), // Show max 3 times per date
                fullDate: date
              })
            }
          }
        }
        // Sort by date
        allAvailableSlots.sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime())
      }

      return {
        id: therapist.id,
        name: user ? `${user.first_name} ${user.last_name}` : 'Терапевт',
        title: therapist.category || 'Клинический психолог',
        specializations: therapist.specializations || [],
        experience: therapist.experience_years || 0,
        rating: therapist.rating || 0,
        reviews_count: Math.floor(therapist.total_sessions / 3) || 0, // Estimate reviews from sessions
        hourly_rate: therapist.hourly_rate_uah && therapist.hourly_rate_uah > 0 ? therapist.hourly_rate_uah : null,
        location: therapist.location || 'Киев, Центр',
        languages: therapist.languages || ['Украинский', 'Русский'],
        approach: therapist.therapy_approach || 'Когнитивно-поведенческая терапия',
        available_today: availability.available_today,
        next_available: availability.next_available,
        total_sessions: therapist.total_sessions || 0,
        image: therapist.profile_image_url || null,
        bio: therapist.bio || '',
        all_available_slots: allAvailableSlots.slice(0, 5), // Show max 5 dates
      }
    }) || []

    return NextResponse.json({
      therapists: transformedTherapists,
      total: transformedTherapists.length
    })

  } catch (error) {
    console.error('Therapists API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}