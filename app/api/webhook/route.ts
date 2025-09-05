import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { createClient } from "../../../lib/supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const sig = headersList.get('stripe-signature')

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, sig!, endpointSecret)
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
    }

    const supabase = await createClient()
    console.log('🎣 Processing webhook event:', event.type, 'ID:', event.id)

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        console.log('✅ Checkout session completed:', session.id)

        // Update booking status to confirmed
        const bookingId = session.metadata?.booking_id
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
          }
        }
        break

      case 'payment_intent.payment_failed':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('❌ Payment failed:', paymentIntent.id)

        // Find booking by payment intent ID and update status
        const { error: paymentError } = await supabase
          .from('booking_sessions')
          .update({
            status: 'cancelled',
            payment_status: 'failed'
          })
          .eq('stripe_payment_intent_id', paymentIntent.id)

        if (paymentError) {
          console.error('❌ Error updating payment failed status:', paymentError)
        } else {
          console.log('✅ Booking cancelled due to payment failure')
        }
        break

      case 'charge.succeeded':
        const charge = event.data.object as Stripe.Charge
        console.log('💰 Charge succeeded:', charge.id, 'Amount:', charge.amount)
        break

      case 'charge.failed':
        const failedCharge = event.data.object as Stripe.Charge
        console.log('💸 Charge failed:', failedCharge.id)
        break

      case 'payment_intent.succeeded':
        const succeededPaymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('✅ Payment intent succeeded:', succeededPaymentIntent.id)
        break

      case 'payment_intent.created':
        const createdPaymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('📝 Payment intent created:', createdPaymentIntent.id)
        break

      case 'charge.refunded':
        const refundedCharge = event.data.object as Stripe.Charge
        console.log('↩️ Charge refunded:', refundedCharge.id)
        break

      case 'charge.updated':
        const updatedCharge = event.data.object as Stripe.Charge
        console.log('🔄 Charge updated:', updatedCharge.id)
        break

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({
      received: true,
      event: event.type,
      id: event.id
    })

  } catch (error) {
    console.error('💥 Webhook processing error:', error)
    return NextResponse.json({
      error: 'Webhook processing failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}