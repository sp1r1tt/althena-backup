import { NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../../lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { bookingId } = await request.json()

    console.log('Manually confirming booking:', bookingId)

    const { data, error } = await supabase
      .from('booking_sessions')
      .update({
        status: 'confirmed',
        payment_status: 'paid'
      })
      .eq('id', bookingId)
      .select()

    if (error) {
      console.error('Error confirming booking:', error)
      return NextResponse.json({ error: 'Failed to confirm booking' }, { status: 500 })
    }

    console.log('Booking confirmed successfully:', data)
    return NextResponse.json({ success: true, booking: data })

  } catch (error) {
    console.error('Test confirm error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}