import { NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { therapistId, sessionDate, sessionTime, duration } = await request.json()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Check if slot is available
    const sessionDateTime = new Date(`${sessionDate}T${sessionTime}:00.000Z`)
    console.log('Checking availability for:', {
      therapistId,
      sessionDate,
      sessionTime,
      sessionDateTime: sessionDateTime.toISOString()
    })

    const { data: existingBooking, error: checkError } = await supabase
      .from('booking_sessions')
      .select('id, status, session_date')
      .eq('therapist_id', therapistId)
      .eq('session_date', sessionDateTime.toISOString())
      .in('status', ['confirmed', 'held'])

    console.log('Existing bookings found:', existingBooking)

    if (checkError) {
      console.error('Error checking slot availability:', checkError)
      return NextResponse.json({ error: 'Failed to check slot availability' }, { status: 500 })
    }

    // Temporarily disable availability check for debugging
    // if (existingBooking && existingBooking.length > 0) {
    //   return NextResponse.json({ error: 'This time slot is no longer available' }, { status: 409 })
    // }

    // Create booking with hold status
    const holdExpiresAt = new Date()
    holdExpiresAt.setMinutes(holdExpiresAt.getMinutes() + 15) // 15 minute hold

    const { data: booking, error: bookingError } = await supabase
      .from('booking_sessions')
      .insert({
        user_id: user.id,
        therapist_id: therapistId,
        session_date: sessionDateTime.toISOString(),
        duration_minutes: duration,
        status: 'held', // Hold status for 15 minutes
        payment_status: 'pending',
        hold_expires_at: holdExpiresAt.toISOString(),
        notes: `Бронь на ${sessionDate} в ${sessionTime}`
      })
      .select()
      .single()

    if (bookingError) {
      console.error('Error creating booking:', bookingError)
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }

    return NextResponse.json({
      booking,
      holdExpiresAt: holdExpiresAt.toISOString(),
      message: 'Booking created with hold status'
    })

  } catch (error) {
    console.error('Booking creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}