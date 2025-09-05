import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { Resend } from "resend"
import {
  generateBookingConfirmationEmail,
  generateSessionReminderEmail,
  generateTestResultsEmail,
  generateWelcomeEmail,
  generateBookingCancelledEmail,
} from "../../../../lib/emailTemplates"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    // Get pending emails from queue
    const { data: pendingEmails, error: fetchError } = await supabase
      .from("email_queue")
      .select("*")
      .eq("status", "pending")
      .lte("scheduled_at", new Date().toISOString())
      .limit(50) // Process max 50 emails per run

    if (fetchError) {
      console.error("Error fetching email queue:", fetchError)
      return NextResponse.json({ error: "Failed to fetch email queue" }, { status: 500 })
    }

    if (!pendingEmails || pendingEmails.length === 0) {
      return NextResponse.json({ message: "No emails to process", processed: 0 })
    }

    const templates = {
      "booking-confirmation": generateBookingConfirmationEmail,
      "session-reminder": generateSessionReminderEmail,
      "test-results": generateTestResultsEmail,
      welcome: generateWelcomeEmail,
      "booking-cancelled": generateBookingCancelledEmail,
    }

    let processed = 0
    let failed = 0

    // Process each email
    for (const email of pendingEmails) {
      try {
        const templateFunction = templates[email.type as keyof typeof templates]
        if (!templateFunction) {
          throw new Error(`Unknown email template: ${email.type}`)
        }

        const emailContent = templateFunction(email.payload)
        const subject = email.payload.subject || getDefaultSubject(email.type)

        // Send email via Resend
        const emailResult = await resend.emails.send({
          from: "MindCare <noreply@mindcare.com>",
          to: [email.to_email],
          subject,
          html: emailContent,
        })

        if (emailResult.error) {
          throw new Error(emailResult.error.message)
        }

        // Update email status to sent
        await supabase
          .from("email_queue")
          .update({
            status: "sent",
            sent_at: new Date().toISOString(),
          })
          .eq("id", email.id)

        // Log to email_notifications
        await supabase.from("email_notifications").insert({
          recipient_email: email.to_email,
          email_type: email.type,
          subject,
          content: emailContent,
          resend_message_id: emailResult.data?.id,
          status: "sent",
        })

        processed++
      } catch (error) {
        console.error(`Failed to send email ${email.id}:`, error)

        // Update email status to failed
        await supabase
          .from("email_queue")
          .update({
            status: "failed",
          })
          .eq("id", email.id)

        failed++
      }
    }

    return NextResponse.json({
      message: `Processed ${processed} emails, ${failed} failed`,
      processed,
      failed,
    })
  } catch (error) {
    console.error("Email queue processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function getDefaultSubject(emailType: string): string {
  const subjects = {
    "booking-confirmation": "Подтверждение записи к специалисту",
    "session-reminder": "Напоминание о сессии завтра",
    "test-results": "Результаты вашего теста",
    welcome: "Добро пожаловать на платформу ментального здоровья!",
    "booking-cancelled": "Отмена записи к специалисту",
  }

  return subjects[emailType as keyof typeof subjects] || "Уведомление от MindCare"
}
