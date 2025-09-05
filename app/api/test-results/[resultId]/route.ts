import { NextResponse } from "next/server"
import { createClient } from "../../../../lib/supabase/server"

export async function GET(
  request: NextResponse,
  { params }: { params: { resultId: string } }
) {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Get specific test result
    const { data: result, error } = await supabase
      .from("test_results")
      .select(`
        id,
        score,
        result_text,
        recommendations,
        created_at,
        psychological_tests (
          id,
          title,
          description
        )
      `)
      .eq("id", params.resultId)
      .eq("user_id", user.id)
      .single()

    if (error) {
      console.error("Error fetching test result:", error)
      return NextResponse.json({ error: "Test result not found" }, { status: 404 })
    }

    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error fetching test result:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE endpoint for deleting test results
export async function DELETE(
  request: NextResponse,
  { params }: { params: { resultId: string } }
) {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Delete the test result (only if it belongs to the current user)
    const { error } = await supabase
      .from('test_results')
      .delete()
      .eq('id', params.resultId)
      .eq('user_id', user.id)

    if (error) {
      console.error("Error deleting test result:", error)
      return NextResponse.json({ error: "Failed to delete test result" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Test result deleted successfully' })
  } catch (error) {
    console.error("Error deleting test result:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}