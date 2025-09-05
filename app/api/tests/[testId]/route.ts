import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../../lib/supabase/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { testId: string } }
) {
  try {
    const supabase = await createClient()
    const testId = params.testId

    const { data: test, error } = await supabase
      .from('psychological_tests')
      .select('*')
      .eq('id', testId)
      .single()

    if (error) {
      console.error('Error fetching test:', error)
      return NextResponse.json({ error: 'Test not found' }, { status: 404 })
    }

    // Transform data to match frontend interface
    const transformedTest = {
      id: test.id,
      title: test.title,
      description: test.description,
      duration: "10-15 мин",
      isFree: test.is_free,
      questions: Array.isArray(test.questions) ? test.questions : [],
      scoringLogic: test.scoring_logic || {},
    }

    return NextResponse.json({ test: transformedTest })

  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST endpoint for saving test results
export async function POST(
  request: NextRequest,
  { params }: { params: { testId: string } }
) {
  try {
    const supabase = await createClient()
    const testId = params.testId
    const body = await request.json()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Save test result
    const { data, error } = await supabase
      .from('test_results')
      .insert({
        user_id: user.id,
        test_id: testId,
        answers: body.answers,
        score: body.score,
        result_text: body.resultText,
        recommendations: body.recommendations,
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving test result:', error)
      return NextResponse.json({ error: 'Failed to save test result' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      resultId: data.id,
      message: 'Test result saved successfully'
    })

  } catch (error) {
    console.error('Test result save error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}