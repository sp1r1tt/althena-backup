import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "../../../lib/supabase/server"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: tests, error } = await supabase
      .from('psychological_tests')
      .select('*')
      .eq('is_free', true) // Only return free tests for now
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching tests:', error)
      return NextResponse.json({ error: 'Failed to fetch tests' }, { status: 500 })
    }

    // Transform data to match frontend interface
    const transformedTests = tests?.map(test => ({
      id: test.id,
      title: test.title,
      description: test.description,
      duration: "10-15 мин", // Could be calculated from questions count
      questions: Array.isArray(test.questions) ? test.questions.length : 0,
      category: "Эмоциональное состояние", // Could be added to database
      difficulty: "Легкий", // Could be added to database
      isFree: test.is_free,
      completions: 15420, // Mock data - could be calculated from test_results
      rating: 4.8, // Mock data - could be calculated from reviews
      features: [
        "Научно обоснованный тест",
        "Детальный анализ результатов",
        "Персональные рекомендации",
        "Отслеживание динамики",
      ],
    })) || []

    return NextResponse.json({
      tests: transformedTests,
      total: transformedTests.length
    })

  } catch (error) {
    console.error('Tests API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}