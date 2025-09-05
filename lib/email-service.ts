interface EmailData {
  userName: string
  therapistName?: string
  date?: string
  time?: string
  sessionType?: string
  price?: string
  testName?: string
  score?: string
  interpretation?: string
  resultsUrl?: string
  dashboardUrl?: string
  bookingUrl?: string
}

interface EmailOptions {
  to: string
  subject: string
  template: "booking-confirmation" | "session-reminder" | "test-results" | "welcome" | "booking-cancelled"
  data: EmailData
}

export async function sendEmail({ to, subject, template, data }: EmailOptions) {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        subject,
        template,
        data,
      }),
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.error || "Failed to send email")
    }

    return result
  } catch (error) {
    console.error("[v0] Email service error:", error)
    throw error
  }
}

// Helper functions for common email scenarios
export async function sendBookingConfirmation(
  userEmail: string,
  userName: string,
  therapistName: string,
  date: string,
  time: string,
  sessionType: string,
  price: string,
) {
  return sendEmail({
    to: userEmail,
    subject: "Подтверждение записи к специалисту",
    template: "booking-confirmation",
    data: {
      userName,
      therapistName,
      date,
      time,
      sessionType,
      price,
    },
  })
}

export async function sendSessionReminder(userEmail: string, userName: string, therapistName: string, time: string) {
  return sendEmail({
    to: userEmail,
    subject: "Напоминание о сессии завтра",
    template: "session-reminder",
    data: {
      userName,
      therapistName,
      time,
    },
  })
}

export async function sendTestResults(
  userEmail: string,
  userName: string,
  testName: string,
  score: string,
  interpretation: string,
  resultsUrl: string,
) {
  return sendEmail({
    to: userEmail,
    subject: `Результаты теста: ${testName}`,
    template: "test-results",
    data: {
      userName,
      testName,
      score,
      interpretation,
      resultsUrl,
    },
  })
}

export async function sendWelcomeEmail(userEmail: string, userName: string, dashboardUrl: string) {
  return sendEmail({
    to: userEmail,
    subject: "Добро пожаловать на платформу ментального здоровья!",
    template: "welcome",
    data: {
      userName,
      dashboardUrl,
    },
  })
}

export async function sendBookingCancellation(
  userEmail: string,
  userName: string,
  therapistName: string,
  date: string,
  time: string,
  bookingUrl: string,
) {
  return sendEmail({
    to: userEmail,
    subject: "Отмена записи к специалисту",
    template: "booking-cancelled",
    data: {
      userName,
      therapistName,
      date,
      time,
      bookingUrl,
    },
  })
}
