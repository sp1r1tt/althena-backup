import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../../../lib/supabase/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { therapistId: string } }
) {
  try {
    const supabase = await createClient()
    const therapistId = params.therapistId
    const { searchParams } = new URL(request.url)

    const startDate = searchParams.get('startDate') || new Date().toISOString().split('T')[0]
    const days = parseInt(searchParams.get('days') || '30')

    // Get therapist's available times
    const { data: therapist, error: therapistError } = await supabase
      .from('therapists')
      .select('available_times')
      .eq('id', therapistId)
      .single()

    if (therapistError) {
      console.error('Error fetching therapist:', therapistError)
      return NextResponse.json({ error: 'Therapist not found' }, { status: 404 })
    }

    // Get existing bookings for this therapist
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + days)

    const { data: bookings, error: bookingsError } = await supabase
      .from('booking_sessions')
      .select('session_date')
      .eq('therapist_id', therapistId)
      .gte('session_date', startDate)
      .lte('session_date', endDate.toISOString())
      .in('status', ['confirmed', 'pending'])

    if (bookingsError) {
      console.error('Error fetching bookings:', bookingsError)
      return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
    }

    // Generate available slots
    const availableTimes = therapist.available_times || {}
    const bookedDates = new Set(bookings?.map(b => b.session_date.split('T')[0]) || [])

    const slots = []
    const currentDate = new Date(startDate)

    for (let i = 0; i < days; i++) {
      const dateStr = currentDate.toISOString().split('T')[0]
      const dayOfWeek = currentDate.toLocaleDateString('en', { weekday: 'long' }).toLowerCase()

      // Check if therapist works on this day
      const daySchedule = availableTimes[dayOfWeek]
      if (daySchedule && daySchedule !== 'closed' && !bookedDates.has(dateStr)) {
        // Parse time slots from schedule (e.g., "9:00-18:00")
        const [startTime, endTime] = daySchedule.split('-')
        if (startTime && endTime) {
          const [startHour] = startTime.split(':').map(Number)
          const [endHour] = endTime.split(':').map(Number)

          // Generate hourly slots
          for (let hour = startHour; hour < endHour; hour++) {
            const slotTime = `${hour.toString().padStart(2, '0')}:00`
            const slotDateTime = `${dateStr}T${slotTime}:00`

            slots.push({
              date: dateStr,
              time: slotTime,
              datetime: slotDateTime,
              available: true
            })
          }
        }
      }

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return NextResponse.json({
      therapistId,
      availableSlots: slots,
      totalSlots: slots.length
    })

  } catch (error) {
    console.error('Available slots API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}