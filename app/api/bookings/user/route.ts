import { NextResponse } from "next/server"
import { createClient } from "../../../../lib/supabase/server"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Get user's bookings with therapist information
    const { data: bookings, error: bookingsError } = await supabase
      .from('booking_sessions')
      .select(`
        id,
        session_date,
        status,
        payment_status,
        therapists!inner (
          id,
          user_id,
          hourly_rate_uah,
          users!inner (
            first_name,
            last_name
          )
        )
      `)
      .eq('user_id', user.id)
      .order('session_date', { ascending: true })

    if (bookingsError) {
      console.error('Error fetching bookings:', bookingsError)
      return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
    }

    return NextResponse.json({
      bookings: bookings || [],
      total: bookings?.length || 0
    })

  } catch (error) {
    console.error('Bookings fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}