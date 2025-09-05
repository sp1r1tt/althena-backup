import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { createClient } from "../../../../lib/supabase/server"
import { sendBookingConfirmation } from "../../../../lib/email-service"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const sig = headersList.get('stripe-signature')

    console.log('🔔 STRIPE WEBHOOK RECEIVED!')
    console.log('📨 Headers:', Object.fromEntries(headersList.entries()))
    console.log('📄 Raw body length:', body.length)
    console.log('🔑 Webhook secret configured:', !!endpointSecret)

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, sig!, endpointSecret)
      console.log('✅ Webhook signature verified successfully')
      console.log('🎯 Event type:', event.type)
      console.log('🆔 Event ID:', event.id)
    } catch (err: any) {
      console.error('❌ Webhook signature verification failed:', err.message)
      console.error('🔑 Expected endpoint secret configured:', !!endpointSecret)
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
    }

    const supabase = await createClient()
    console.log('🔄 Processing webhook event:', event.type)
    console.log('📦 Event data:', JSON.stringify(event.data.object, null, 2))

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        console.log('🛒 CHECKOUT SESSION COMPLETED:', session.id)
        console.log('📋 Session metadata:', session.metadata)

        // Update booking status to confirmed
        const bookingId = session.metadata?.booking_id
        console.log('🎫 Booking ID from metadata:', bookingId)

        if (bookingId) {
          const { error } = await supabase
            .from('booking_sessions')
            .update({
              status: 'confirmed',
              payment_status: 'paid',
              stripe_payment_intent_id: session.payment_intent as string
            })
            .eq('id', bookingId)

          if (error) {
            console.error('❌ Error updating booking status:', error)
          } else {
            console.log('✅ Booking confirmed:', bookingId)

            // Send booking confirmation email
            try {
              // Get booking details with user and therapist info
              const { data: bookingDetails } = await supabase
                .from('booking_sessions')
                .select(`
                  id,
                  session_date,
                  user_id,
                  therapist_id
                `)
                .eq('id', bookingId)
                .single()

              if (bookingDetails) {
                // Get user details
                const { data: userData } = await supabase
                  .from('users')
                  .select('first_name, last_name, email')
                  .eq('id', bookingDetails.user_id)
                  .single()

                // Get therapist details
                const { data: therapistData } = await supabase
                  .from('therapists')
                  .select(`
                    hourly_rate_uah,
                    users!inner (
                      first_name,
                      last_name
                    )
                  `)
                  .eq('id', bookingDetails.therapist_id)
                  .single()

                if (userData && therapistData) {
                  const therapistUser = Array.isArray(therapistData.users)
                    ? therapistData.users[0]
                    : therapistData.users
                  const userName = `${userData.first_name} ${userData.last_name}`
                  const therapistName = `${therapistUser.first_name} ${therapistUser.last_name}`
                  const sessionDate = new Date(bookingDetails.session_date)
                  const dateStr = sessionDate.toLocaleDateString('ru-RU')
                  const timeStr = sessionDate.toLocaleTimeString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })

                  // Send confirmation email
                  await sendBookingConfirmation(
                    userData.email,
                    userName,
                    therapistName,
                    dateStr,
                    timeStr,
                    'Индивидуальная сессия',
                    `${therapistData.hourly_rate_uah} ₴`
                  )

                  console.log('📧 Booking confirmation email sent to:', userData.email)
                }
              }
            } catch (emailError) {
              console.error('Error sending confirmation email:', emailError)
              // Don't fail the webhook if email fails
            }
          }
        }
        break

      case 'payment_intent.payment_failed':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment failed:', paymentIntent.id)

        // Find booking by payment intent ID and update status
        const { error: paymentError } = await supabase
          .from('booking_sessions')
          .update({
            status: 'cancelled',
            payment_status: 'failed'
          })
          .eq('stripe_payment_intent_id', paymentIntent.id)

        if (paymentError) {
          console.error('Error updating payment failed status:', paymentError)
        } else {
          console.log('❌ Booking cancelled due to payment failure')
        }
        break

      case 'charge.succeeded':
        const charge = event.data.object as Stripe.Charge
        console.log('Charge succeeded:', charge.id)
        // Additional processing if needed
        break

      case 'charge.failed':
        const failedCharge = event.data.object as Stripe.Charge
        console.log('Charge failed:', failedCharge.id)
        // Additional processing if needed
        break

      case 'payment_intent.succeeded':
        const succeededPaymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('💳 PAYMENT INTENT SUCCEEDED:', succeededPaymentIntent.id)
        console.log('💳 Payment intent metadata:', succeededPaymentIntent.metadata)

        // Update booking status to confirmed
        const { error: paymentSuccessError } = await supabase
          .from('booking_sessions')
          .update({
            status: 'confirmed',
            payment_status: 'paid'
          })
          .eq('stripe_payment_intent_id', succeededPaymentIntent.id)

        if (paymentSuccessError) {
          console.error('❌ Error updating booking status after payment:', paymentSuccessError)
        } else {
          console.log('✅ Booking confirmed after payment:', succeededPaymentIntent.id)
        }
        break

      case 'payment_intent.created':
        const createdPaymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment intent created:', createdPaymentIntent.id)
        // Additional processing if needed
        break

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({
      received: true,
      event: event.type
    })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
