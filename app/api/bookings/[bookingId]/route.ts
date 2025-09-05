import { NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../../lib/supabase/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { bookingId: string } }
) {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Get booking with therapist details
    const { data: booking, error: bookingError } = await supabase
      .from('booking_sessions')
      .select(`
        id,
        session_date,
        status,
        payment_status,
        stripe_payment_intent_id,
        therapists!inner (
          id,
          hourly_rate_uah,
          users!inner (
            first_name,
            last_name
          )
        )
      `)
      .eq('id', params.bookingId)
      .eq('user_id', user.id) // Ensure user can only see their own bookings
      .single()

    if (bookingError || !booking) {
      console.error('Error fetching booking:', bookingError)
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Extract therapist info
    const therapist = booking.therapists as any
    const therapistUser = therapist?.users
    const therapistName = therapistUser ?
      `${therapistUser.first_name} ${therapistUser.last_name}` : 'Терапевт'

    // Get therapist's rate
    const amount = therapist?.hourly_rate_uah || 500

    console.log('Booking details API - Raw session_date:', booking.session_date)
    console.log('Booking details API - Parsed date:', new Date(booking.session_date))
    console.log('Booking details API - Therapist name:', therapistName)
    console.log('Booking details API - Amount:', amount)

    const bookingDetails = {
      id: booking.id,
      session_date: booking.session_date,
      therapist_name: therapistName,
      amount: amount,
      status: booking.status,
      payment_status: booking.payment_status
    }

    return NextResponse.json({ booking: bookingDetails })

  } catch (error) {
    console.error('Booking details fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}