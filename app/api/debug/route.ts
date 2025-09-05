import { NextResponse } from "next/server"
import { createClient } from "../../../lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Test database connection
    const { data: testData, error: testError } = await supabase
      .from('users')
      .select('count')
      .limit(1)

    if (testError) {
      return NextResponse.json({
        error: 'Database connection failed',
        details: testError
      }, { status: 500 })
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError) {
      return NextResponse.json({
        error: 'Auth error',
        details: authError
      }, { status: 401 })
    }

    // Get user profile
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user?.id)
      .single()

    // Get therapist profile if user is therapist
    let therapistData = null
    if (userData?.role === 'therapist') {
      const { data: therapist, error: therapistError } = await supabase
        .from('therapists')
        .select('*')
        .eq('user_id', user?.id)
        .single()

      if (!therapistError) {
        therapistData = therapist
      }
    }

    // Get all users for debugging
    const { data: allUsers, error: usersError } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, role')
      .limit(10)

    // Get all therapists
    const { data: allTherapists, error: therapistsError } = await supabase
      .from('therapists')
      .select('id, user_id, users(id, email, first_name, last_name)')
      .limit(10)

    // Get all bookings with more details
    const { data: allBookings, error: bookingsError } = await supabase
      .from('booking_sessions')
      .select(`
        id,
        user_id,
        therapist_id,
        status,
        payment_status,
        session_date,
        created_at,
        users(id, email, first_name, last_name),
        therapists(id, user_id, users(id, email, first_name, last_name))
      `)
      .limit(50)
      .order('created_at', { ascending: false })

    console.log('=== DEBUG: ALL BOOKINGS IN DATABASE ===')
    console.log('Total bookings found:', allBookings?.length || 0)
    if (allBookings && allBookings.length > 0) {
      allBookings.forEach((booking, i) => {
        console.log(`${i + 1}. ID: ${booking.id}`)
        console.log(`   Therapist ID: ${booking.therapist_id}`)
        console.log(`   User ID: ${booking.user_id}`)
        console.log(`   Status: ${booking.status}`)
        console.log(`   Created: ${booking.created_at}`)
        console.log('---')
      })
    } else {
      console.log('No bookings found in database!')
    }

    return NextResponse.json({
      success: true,
      user: userData,
      therapist: therapistData,
      allUsers: allUsers,
      allTherapists: allTherapists,
      allBookings: allBookings,
      databaseConnected: true,
      timestamp: new Date().toISOString(),
      // Add comparison for debugging
      currentUserBookings: allBookings?.filter(b => b.user_id === user?.id) || [],
      currentTherapistBookings: therapistData ? allBookings?.filter(b => b.therapist_id === therapistData.id) || [] : []
    })

  } catch (error) {
    return NextResponse.json({
      error: 'Debug endpoint failed',
      details: error
    }, { status: 500 })
  }
}

// POST endpoint to manually update booking status for testing
export async function POST() {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Find and update ALL held bookings to confirmed for testing
    console.log('[DEBUG] Updating ALL held bookings in system')

    const { data: updatedBookings, error: updateError } = await supabase
      .from('booking_sessions')
      .update({
        status: 'confirmed',
        payment_status: 'paid'
      })
      .eq('status', 'held')
      .select()

    console.log('[DEBUG] Update result:', { updatedBookings, updateError })

    if (updateError) {
      return NextResponse.json({
        error: 'Failed to update bookings',
        details: updateError
      }, { status: 500 })
    }

    // Get all bookings in the system
    const { data: allBookings, error: allError } = await supabase
      .from('booking_sessions')
      .select('id, user_id, therapist_id, status, payment_status, session_date, users(id, email, first_name, last_name)')
      .limit(20)

    console.log('[DEBUG] All bookings after update:', allBookings)

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedBookings?.length || 0} bookings from 'held' to 'confirmed'`,
      updatedBookings: updatedBookings,
      allBookings: allBookings
    })

  } catch (error) {
    return NextResponse.json({
      error: 'Debug update failed',
      details: error
    }, { status: 500 })
  }
}

// PATCH endpoint to manually trigger webhook for testing
export async function PATCH() {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Find the most recent booking for this user
    const { data: recentBooking, error: bookingError } = await supabase
      .from('booking_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (bookingError || !recentBooking) {
      return NextResponse.json({
        error: 'No recent booking found',
        details: bookingError
      }, { status: 404 })
    }

    // Manually update booking status to simulate webhook
    const { data: updatedBooking, error: updateError } = await supabase
      .from('booking_sessions')
      .update({
        status: 'confirmed',
        payment_status: 'paid'
      })
      .eq('id', recentBooking.id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({
        error: 'Failed to update booking',
        details: updateError
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Booking manually confirmed',
      booking: updatedBooking
    })

  } catch (error) {
    return NextResponse.json({
      error: 'Manual webhook trigger failed',
      details: error
    }, { status: 500 })
  }
}

// PUT endpoint to change user role for testing
export async function PUT() {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Change user role to therapist
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ role: 'therapist' })
      .eq('id', user.id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({
        error: 'Failed to update user role',
        details: updateError
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'User role changed to therapist',
      user: updatedUser
    })

  } catch (error) {
    return NextResponse.json({
      error: 'Debug role change failed',
      details: error
    }, { status: 500 })
  }
}