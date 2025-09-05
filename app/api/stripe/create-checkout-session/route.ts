import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "../../../../lib/supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
})

export async function POST(request: NextRequest) {
  try {
    const { therapistId, date, time, amount, bookingId } = await request.json()

    // Get current user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Get therapist info
    const { data: therapist } = await supabase
      .from('therapists')
      .select(`
        users!inner (
          first_name,
          last_name
        )
      `)
      .eq('id', therapistId)
      .single()

    const therapistUser = therapist && therapist.users ? (Array.isArray(therapist.users) ? therapist.users[0] : therapist.users) : null
    const therapistName = therapistUser ? `${therapistUser.first_name} ${therapistUser.last_name}` : 'Терапевт'

    // If bookingId is provided, update existing booking, otherwise create new one
    let booking
    if (bookingId) {
      console.log('Updating existing booking:', bookingId)
      const { data: existingBooking, error: updateError } = await supabase
        .from('booking_sessions')
        .update({
          status: 'held',
          payment_status: 'pending'
        })
        .eq('id', bookingId)
        .eq('user_id', user.id) // Ensure user owns the booking
        .select()
        .single()

      if (updateError) {
        console.error('Error updating booking:', updateError)
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
      }
      booking = existingBooking
    } else {
      // Create new booking record with hold status
      const holdExpiresAt = new Date()
      holdExpiresAt.setMinutes(holdExpiresAt.getMinutes() + 15) // 15 minute hold

      const sessionDateTime = new Date(`${date}T${time}:00.000Z`)
      console.log('Stripe checkout - Original date:', date)
      console.log('Stripe checkout - Original time:', time)
      console.log('Stripe checkout - Combined datetime:', sessionDateTime)
      console.log('Stripe checkout - ISO string:', sessionDateTime.toISOString())

      const { data: newBooking, error: bookingError } = await supabase
        .from('booking_sessions')
        .insert({
          user_id: user.id,
          therapist_id: therapistId,
          session_date: sessionDateTime.toISOString(),
          duration_minutes: 50,
          status: 'held', // Hold status for 15 minutes
          payment_status: 'pending',
          hold_expires_at: holdExpiresAt.toISOString(),
          notes: `Бронь на ${date} в ${time}`
        })
        .select()
        .single()

      if (bookingError) {
        console.error('Error creating booking:', bookingError)
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
      }
      booking = newBooking
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'uah',
            product_data: {
              name: `Сессия с ${therapistName}`,
              description: `${date} в ${time}`,
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/booking/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${booking.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/therapists/${therapistId}`,
      metadata: {
        booking_id: booking.id,
        user_id: user.id,
        therapist_id: therapistId,
      },
    })

    return NextResponse.json({ url: session.url, sessionId: session.id })

  } catch (error) {
    console.error('Stripe checkout session creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}