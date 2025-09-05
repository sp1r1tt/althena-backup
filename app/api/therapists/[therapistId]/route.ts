import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../../lib/supabase/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { therapistId: string } }
) {
  try {
    const supabase = await createClient()
    const therapistId = params.therapistId

    let { data: therapist, error } = await supabase
      .from('therapists')
      .select(`
        id,
        user_id,
        specializations,
        bio,
        experience_years,
        education,
        certifications,
        hourly_rate_uah,
        available_times,
        is_verified,
        rating,
        total_sessions,
        created_at,
        users!inner (
          first_name,
          last_name,
          email,
          profile_image_url
        )
      `)
      .eq('id', therapistId)
      // Убираем фильтр по is_verified, чтобы показывать всех терапевтов
      // .eq('is_verified', true)
      .maybeSingle()

    if (error) {
      console.error('Error fetching therapist:', error)
      return NextResponse.json({ error: 'Therapist not found' }, { status: 404 })
    }

    if (!therapist) {
      console.log('Therapist not found for ID:', therapistId, '- returning default data without creating record')

      // Return default data without creating a record to avoid duplicates
      return NextResponse.json({
        therapist: {
          id: therapistId,
          first_name: 'Терапевт',
          last_name: '',
          bio: 'Профиль терапевта находится в процессе настройки',
          specializations: [],
          experience_years: 0,
          hourly_rate_uah: 0,
          location: 'Киев',
          languages: ['Украинский', 'Русский'],
          profile_image_url: null,
          availability: {}
        }
      })
    }

    // Transform data to match frontend interface
    const user = Array.isArray(therapist.users) ? therapist.users[0] : therapist.users
    const transformedTherapist = {
      id: therapist.id,
      first_name: user.first_name,
      last_name: user.last_name,
      bio: therapist.bio || '',
      specializations: therapist.specializations || [],
      experience_years: therapist.experience_years || 0,
      hourly_rate_uah: therapist.hourly_rate_uah || 0,
      location: 'Киев',
      languages: ['Украинский', 'Русский'],
      profile_image_url: user.profile_image_url || null,
      availability: therapist.available_times || {},
    }

    return NextResponse.json({ therapist: transformedTherapist })

  } catch (error) {
    console.error('Therapist API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}