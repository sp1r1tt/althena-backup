import { NextResponse } from "next/server"
import { createClient } from "../../../lib/supabase/server"

export async function POST() {
  try {
    console.log('[TEST THERAPIST] Starting test therapist creation...')
    const supabase = await createClient()

    // Create a test user first
    const testUserId = 'test-user-' + Date.now()
    console.log('[TEST THERAPIST] Creating test user with ID:', testUserId)

    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        id: testUserId,
        email: `test${Date.now()}@example.com`,
        first_name: 'Test',
        last_name: 'Therapist',
        phone: '+380501234567',
        role: 'therapist',
        is_verified: true
      })
      .select()
      .single()

    console.log('[TEST THERAPIST] User creation result:', { data: userData, error: userError })

    if (userError) {
      return NextResponse.json({ error: 'Failed to create test user', details: userError }, { status: 500 })
    }

    // Now create therapist profile
    console.log('[TEST THERAPIST] Creating therapist profile...')
    const { data: therapistData, error: therapistError } = await supabase
      .from('therapists')
      .insert({
        id: testUserId,
        user_id: testUserId,
        bio: 'Test therapist bio',
        experience_years: 5,
        education: 'Test University',
        certifications: ['Test Certification'],
        hourly_rate_uah: 500,
        available_times: {
          monday: "9:00-18:00",
          tuesday: "9:00-18:00",
          wednesday: "9:00-18:00",
          thursday: "9:00-18:00",
          friday: "9:00-18:00",
          saturday: "closed",
          sunday: "closed"
        },
        is_verified: true,
        rating: 5.0,
        total_sessions: 10,
        profile_image_url: null,
        therapy_approach: 'Когнитивно-поведенческая терапия',
        category: 'Когнитивно-поведенческий терапевт (КПТ)',
        location: 'Киев',
        languages: ['Украинский', 'Русский']
      })
      .select()
      .single()

    console.log('[TEST THERAPIST] Therapist creation result:', { data: therapistData, error: therapistError })

    if (therapistError) {
      return NextResponse.json({ error: 'Failed to create test therapist', details: therapistError }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Test therapist created successfully',
      user: userData,
      therapist: therapistData
    })

  } catch (error) {
    console.error('[TEST THERAPIST] Error:', error)
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 })
  }
}