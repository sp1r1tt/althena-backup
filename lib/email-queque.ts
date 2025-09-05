interface QueueEmailOptions {
  type: "booking-confirmation" | "session-reminder" | "test-results" | "welcome" | "booking-cancelled"
  to_email: string
  payload: any
  scheduled_at?: string
}

export async function queueEmail({ type, to_email, payload, scheduled_at }: QueueEmailOptions) {
  try {
    const response = await fetch("/api/email-queue/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        to_email,
        payload,
        scheduled_at,
      }),
    })

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.error || "Failed to queue email")
    }

    return result
  } catch (error) {
    console.error("Email queue error:", error)
    throw error
  }
}

// Helper functions for common email scenarios
export async function queueBookingConfirmation(
  userEmail: string,
  userName: string,
  therapistName: string,
  date: string,
  time: string,
  sessionType: string,
  price: string,
) {
  return queueEmail({
    type: "booking-confirmation",
    to_email: userEmail,
    payload: {
      userName,
      therapistName,
      date,
      time,
      sessionType,
      price,
      subject: "Подтверждение записи к специалисту",
    },
  })
}

export async function queueSessionReminder(
  userEmail: string,
  userName: string,
  therapistName: string,
  time: string,
  scheduledAt: string,
) {
  return queueEmail({
    type: "session-reminder",
    to_email: userEmail,
    payload: {
      userName,
      therapistName,
      time,
      subject: "Напоминание о сессии завтра",
    },
    scheduled_at: scheduledAt,
  })
}

export async function queueTestResults(
  userEmail: string,
  userName: string,
  testName: string,
  score: string,
  interpretation: string,
  resultsUrl: string,
) {
  return queueEmail({
    type: "test-results",
    to_email: userEmail,
    payload: {
      userName,
      testName,
      score,
      interpretation,
      resultsUrl,
      subject: `Результаты теста: ${testName}`,
    },
  })
}

export async function queueWelcomeEmail(userEmail: string, userName: string, dashboardUrl: string) {
  return queueEmail({
    type: "welcome",
    to_email: userEmail,
    payload: {
      userName,
      dashboardUrl,
      subject: "Добро пожаловать на платформу ментального здоровья!",
    },
  })
}

export async function queueBookingCancellation(
  userEmail: string,
  userName: string,
  therapistName: string,
  date: string,
  time: string,
  bookingUrl: string,
) {
  return queueEmail({
    type: "booking-cancelled",
    to_email: userEmail,
    payload: {
      userName,
      therapistName,
      date,
      time,
      bookingUrl,
      subject: "Отмена записи к специалисту",
    },
  })
}
