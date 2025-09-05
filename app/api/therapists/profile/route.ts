import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../../lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Get therapist profile
    const { data: therapist, error } = await supabase
      .from('therapists')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching therapist profile:', error)
      return NextResponse.json({ error: 'Failed to fetch therapist profile' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      therapist: therapist || null,
      user: {
        id: user.id,
        email: user.email,
        role: user.user_metadata?.role || 'client'
      }
    })

  } catch (error) {
    console.error('Get therapist profile error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { action } = await request.json()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    if (action === 'verify') {
      // Update therapist verification status
      const { data, error } = await supabase
        .from('therapists')
        .update({ is_verified: true })
        .eq('user_id', user.id)
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
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

  } catch (error) {
    console.error('Update therapist profile error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}