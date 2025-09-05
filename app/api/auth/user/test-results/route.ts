import { NextResponse } from "next/server"
import { createClient } from "../../../../../lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Get current user from auth
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !authUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Get user's test results with test information
    const { data: testResults, error: resultsError } = await supabase
      .from("test_results")
      .select(`
        id,
        score,
        result_text,
        recommendations,
        created_at,
        test_id,
        psychological_tests!inner (
          id,
          title,
          description
        )
      `)
      .eq("user_id", authUser.id)
      .order("created_at", { ascending: false })

    if (resultsError) {
      console.error("Error fetching test results:", resultsError)
      return NextResponse.json({ error: "Failed to fetch test results" }, { status: 500 })
    }

    // Transform data to match dashboard interface
    const transformedResults = testResults?.map(result => {
      // Determine level based on score (simplified logic)
      let level = "Неизвестно"
      let color = "gray"

      if (result.score !== null) {
        if (result.score <= 4) {
          level = "Минимальный"
          color = "green"
        } else if (result.score <= 9) {
          level = "Легкий"
          color = "yellow"
        } else if (result.score <= 14) {
          level = "Умеренный"
          color = "orange"
        } else {
          level = "Высокий"
          color = "red"
        }
      }

      // Format date
      const date = new Date(result.created_at)
      const formattedDate = date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })

      return {
        id: result.id,
        test_id: result.test_id,
        name: (result.psychological_tests as any)?.title || "Неизвестный тест",
        score: result.score ? `${result.score}/15` : "N/A", // Assuming max score is 15
        level: level,
        date: formattedDate,
        color: color,
        result_text: result.result_text,
        recommendations: result.recommendations
      }
    }) || []

    return NextResponse.json({
      testResults: transformedResults,
      total: transformedResults.length
    })
  } catch (error) {
    console.error("Error fetching user test results:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE endpoint for deleting all test results for the current user
export async function DELETE() {
  try {
    const supabase = await createClient()

    // Get current user from auth
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !authUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Delete all test results for the current user
    const { error } = await supabase
      .from("test_results")
      .delete()
      .eq("user_id", authUser.id)

    if (error) {
      console.error("Error deleting all test results:", error)
      return NextResponse.json({ error: "Failed to delete test results" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "All test results deleted successfully"
    })
  } catch (error) {
    console.error("Error deleting all test results:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}