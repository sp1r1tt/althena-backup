import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../../lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { therapistId } = await request.json()

    if (!therapistId) {
      return NextResponse.json({ error: "Therapist ID is required" }, { status: 400 })
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Check if user is admin or the therapist themselves
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    const isAdmin = userData?.role === 'admin'
    const isTherapist = user.id === therapistId

    if (!isAdmin && !isTherapist) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Update therapist verification status
    const { data, error } = await supabase
      .from('therapists')
      .update({ is_verified: true })
      .eq('id', therapistId)
      .select()
      .single()

    if (error) {
      console.error('Error updating therapist verification:', error)
      return NextResponse.json({ error: 'Failed to update verification status' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Therapist verification status updated successfully',
      therapist: data
    })

  } catch (error) {
    console.error('Verify therapist error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}