interface AnalyticsEvent {
  eventName: string
  eventData?: Record<string, any>
  userId?: string
}

interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

class AnalyticsService {
  private getUTMParams(): UTMParams {
    if (typeof window === "undefined") return {}

    const urlParams = new URLSearchParams(window.location.search)
    return {
      utm_source: urlParams.get("utm_source") || undefined,
      utm_medium: urlParams.get("utm_medium") || undefined,
      utm_campaign: urlParams.get("utm_campaign") || undefined,
    }
  }

  private getSessionId(): string {
    if (typeof window === "undefined") return ""

    let sessionId = sessionStorage.getItem("analytics_session_id")
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem("analytics_session_id", sessionId)
    }
    return sessionId
  }

  async track({ eventName, eventData, userId }: AnalyticsEvent) {
    try {
      const payload = {
        eventName,
        eventData: eventData || {},
        userId,
        sessionId: this.getSessionId(),
        ...this.getUTMParams(),
        referrer: typeof window !== "undefined" ? document.referrer : "",
        userAgent: typeof window !== "undefined" ? navigator.userAgent : "",
        timestamp: new Date().toISOString(),
      }

      // Send to our analytics endpoint
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      // Also send to Google Analytics if available
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("event", eventName, {
          custom_parameter: eventData,
          user_id: userId,
        })
      }
    } catch (error) {
      console.error("Analytics tracking error:", error)
    }
  }

  // Predefined event methods
  async trackTestView(testId: string, userId?: string) {
    await this.track({
      eventName: "tests_view",
      eventData: { testId },
      userId,
    })
  }

  async trackTestStarted(testId: string, userId?: string) {
    await this.track({
      eventName: "test_started",
      eventData: { testId },
      userId,
    })
  }

  async trackTestCompleted(testId: string, score: number, userId?: string) {
    await this.track({
      eventName: "test_completed",
      eventData: { testId, score },
      userId,
    })
  }

  async trackTherapistsListView(filters?: Record<string, any>, userId?: string) {
    await this.track({
      eventName: "therapists_list_view",
      eventData: { filters },
      userId,
    })
  }

  async trackTherapistProfileView(therapistId: string, userId?: string) {
    await this.track({
      eventName: "therapist_profile_view",
      eventData: { therapistId },
      userId,
    })
  }

  async trackSlotSelected(therapistId: string, slotTime: string, userId?: string) {
    await this.track({
      eventName: "slot_selected",
      eventData: { therapistId, slotTime },
      userId,
    })
  }

  async trackCheckoutStarted(amount: number, type: "session" | "package", userId?: string) {
    await this.track({
      eventName: "checkout_started",
      eventData: { amount, type },
      userId,
    })
  }

  async trackCheckoutCompleted(amount: number, type: "session" | "package", userId?: string) {
    await this.track({
      eventName: "checkout_completed",
      eventData: { amount, type },
      userId,
    })
  }

  async trackNoPurchase30Min(lastAction: string, userId?: string) {
    await this.track({
      eventName: "no_purchase_30min",
      eventData: { lastAction },
      userId,
    })
  }
}

export const analytics = new AnalyticsService()

// Hook for easy usage in React components
export function useAnalytics() {
  return analytics
}
