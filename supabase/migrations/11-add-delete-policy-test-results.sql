-- Add DELETE policy for test_results table to allow users to delete their own test results
CREATE POLICY "Users can delete own test results" ON test_results
  FOR DELETE USING (auth.uid()::text = user_id);