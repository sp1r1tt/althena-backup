import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "../../../lib/supabase/server"
import {
  generateBookingConfirmationEmail,
  generateSessionReminderEmail,
  generateTestResultsEmail,
  generateWelcomeEmail,
  generateBookingCancelledEmail,
} from "../../../lib/emailTemplates"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { to, subject, template, data } = await request.json()

    const templates = {
      "booking-confirmation": generateBookingConfirmationEmail(data),
      "session-reminder": generateSessionReminderEmail(data),
      "test-results": generateTestResultsEmail(data),
      welcome: generateWelcomeEmail(data),
      "booking-cancelled": generateBookingCancelledEmail(data),
    }

    const emailContent = templates[template as keyof typeof templates]

    console.log('Sending email:', { to, subject, template })

    const emailResult = await resend.emails.send({
      from: "Платформа Ментального Здоровья <noreply@resend.dev>",
      to: [to],
      subject,
      html: emailContent,
    })

    console.log('Email result:', {
      success: !emailResult.error,
      messageId: emailResult.data?.id,
      error: emailResult.error
    })

    const supabase = await createClient()
    await supabase.from("email_notifications").insert({
      recipient_email: to,
      email_type: template,
      subject,
      content: emailContent,
      resend_message_id: emailResult.data?.id,
      status: emailResult.error ? "failed" : "sent",
    })

    if (emailResult.error) {
      console.error("[v0] Resend error:", emailResult.error)
      return NextResponse.json({ success: false, error: emailResult.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      messageId: emailResult.data?.id,
    })
  } catch (error) {
    console.error("[v0] Email sending error:", error)
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}
