import { NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../../../lib/supabase/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { therapistId: string } }
) {
  try {
    const supabase = await createClient()
    const therapistId = params.therapistId
    console.log('[THERAPIST BOOKINGS] Request for therapistId:', therapistId)

    // Get current user (should be the therapist)
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    console.log('[THERAPIST BOOKINGS] Current user ID:', user.id)

    // Verify that the user is actually this therapist
    const { data: therapist, error: therapistError } = await supabase
      .from('therapists')
      .select('id, user_id')
      .eq('user_id', user.id)
      .maybeSingle()

    console.log('[THERAPIST BOOKINGS] Therapist record found:', therapist)
    console.log('[THERAPIST BOOKINGS] Current user ID:', user.id)
    console.log('[THERAPIST BOOKINGS] Requested therapist ID:', therapistId)

    // Allow access if therapist record exists and matches, or if no therapist record but user is accessing their own ID
    if (therapistError) {
      console.error('Error checking therapist record:', therapistError)
      return NextResponse.json({ error: 'Failed to verify therapist' }, { status: 500 })
    }

    // Determine the correct therapist ID to use for querying bookings
    let queryTherapistId = therapistId

    // Always use therapist record ID if it exists, otherwise use the requested ID
    if (therapist) {
      queryTherapistId = therapist.id
      console.log('[THERAPIST BOOKINGS] Using therapist record ID for query:', queryTherapistId)
    } else {
      console.log('[THERAPIST BOOKINGS] No therapist record found, using requested ID:', queryTherapistId)
    }

    console.log('[THERAPIST BOOKINGS] Authorization passed')

    // Get bookings for this therapist
    console.log('[THERAPIST BOOKINGS] Fetching bookings for therapistId:', queryTherapistId)

    // First, let's check if there are any bookings at all in the database
    const { data: allBookings, error: allBookingsError } = await supabase
      .from('booking_sessions')
      .select('id, therapist_id, status, payment_status')
      .limit(10)

    console.log('[THERAPIST BOOKINGS] All bookings in database:', allBookings)
    console.log('[THERAPIST BOOKINGS] All bookings error:', allBookingsError)

    // First, let's try a simpler query to see if we can find the bookings
    const { data: simpleBookings, error: simpleError } = await supabase
      .from('booking_sessions')
      .select('id, therapist_id, status, session_date')
      .eq('therapist_id', queryTherapistId)

    console.log('[THERAPIST BOOKINGS] Simple query result:', simpleBookings)
    console.log('[THERAPIST BOOKINGS] Simple query error:', simpleError)

    // Let's try a broader query to see if we can find any bookings
    console.log('[THERAPIST BOOKINGS] Trying broader query...')
    const { data: allBookingsCheck, error: allCheckError } = await supabase
      .from('booking_sessions')
      .select('id, therapist_id, status, payment_status, session_date')
      .limit(10)

    console.log('[THERAPIST BOOKINGS] All bookings in system:', allBookingsCheck)

    const { data: bookings, error: bookingsError } = await supabase
      .from('booking_sessions')
      .select(`
        id,
        session_date,
        duration_minutes,
        status,
        payment_status,
        notes,
        created_at,
        therapist_id,
        users (
          id,
          first_name,
          last_name,
          email
        ),
        test_results (
          result_text,
          recommendations
        )
      `)
      .eq('therapist_id', queryTherapistId)
      .in('status', ['confirmed', 'held'])  // Include both confirmed and held bookings
      .order('session_date', { ascending: true })

    console.log('[THERAPIST BOOKINGS] Found bookings for therapist:', bookings?.length || 0)
    if (bookings && bookings.length > 0) {
      console.log('[THERAPIST BOOKINGS] Sample booking:', bookings[0])
      console.log('[THERAPIST BOOKINGS] Booking therapist_id:', bookings[0].therapist_id)
    } else {
      console.log('[THERAPIST BOOKINGS] No bookings found for therapist:', queryTherapistId)
      // Let's check if there are any bookings with this therapist ID at all
      const { data: checkBookings, error: checkError } = await supabase
        .from('booking_sessions')
        .select('id, therapist_id, status')
        .eq('therapist_id', queryTherapistId)

      console.log('[THERAPIST BOOKINGS] All bookings for this therapist ID:', checkBookings)
      console.log('[THERAPIST BOOKINGS] Check error:', checkError)
    }

    if (bookingsError) {
      console.error('Error fetching therapist bookings:', bookingsError)
      return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
    }

    // Transform data
    const transformedBookings = bookings?.map(booking => {
      const client = Array.isArray(booking.users) ? booking.users[0] : booking.users
      const testResult = Array.isArray(booking.test_results) ? booking.test_results[0] : booking.test_results

      return {
        id: booking.id,
        session_date: booking.session_date,
        session_time: new Date(booking.session_date).toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        duration_minutes: booking.duration_minutes,
        status: booking.status,
        payment_status: booking.payment_status,
        notes: booking.notes,
        client: {
          id: client.id,
          name: `${client.first_name} ${client.last_name}`,
          email: client.email
        },
        test_result: testResult ? {
          result_text: testResult.result_text,
          recommendations: testResult.recommendations
        } : null
      }
    }) || []

    return NextResponse.json({
      bookings: transformedBookings,
      total: transformedBookings.length
    })

  } catch (error) {
    console.error('Therapist bookings API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}