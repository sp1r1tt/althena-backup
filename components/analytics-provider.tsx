"use client"

import { createContext, useContext, useEffect, type ReactNode } from "react"
import { analytics } from "../../althena-backup/lib/analytics"
import { usePathname } from "next/navigation"

interface AnalyticsContextType {
  track: typeof analytics.track
  trackTestView: typeof analytics.trackTestView
  trackTestStarted: typeof analytics.trackTestStarted
  trackTestCompleted: typeof analytics.trackTestCompleted
  trackTherapistsListView: typeof analytics.trackTherapistsListView
  trackTherapistProfileView: typeof analytics.trackTherapistProfileView
  trackSlotSelected: typeof analytics.trackSlotSelected
  trackCheckoutStarted: typeof analytics.trackCheckoutStarted
  trackCheckoutCompleted: typeof analytics.trackCheckoutCompleted
  trackNoPurchase30Min: typeof analytics.trackNoPurchase30Min
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null)

interface AnalyticsProviderProps {
  children: ReactNode
  userId?: string
}

export function AnalyticsProvider({ children, userId }: AnalyticsProviderProps) {
  const pathname = usePathname()

  useEffect(() => {
    const trackPageView = () => {
      analytics.track({
        eventName: "page_view",
        eventData: {
          path: pathname,
          title: document.title,
        },
        userId,
      })
    }

    trackPageView()
  }, [pathname, userId])

  useEffect(() => {
    let noPurchaseTimer: NodeJS.Timeout

    const resetNoPurchaseTimer = () => {
      if (noPurchaseTimer) clearTimeout(noPurchaseTimer)

      noPurchaseTimer = setTimeout(
        () => {
          analytics.trackNoPurchase30Min(pathname, userId)
        },
        30 * 60 * 1000,
      ) // 30 minutes
    }

    const handleUserActivity = () => {
      resetNoPurchaseTimer()
    }

    // Track user activity to reset timer
    document.addEventListener("click", handleUserActivity)
    document.addEventListener("scroll", handleUserActivity)
    document.addEventListener("keypress", handleUserActivity)

    resetNoPurchaseTimer()

    return () => {
      if (noPurchaseTimer) clearTimeout(noPurchaseTimer)
      document.removeEventListener("click", handleUserActivity)
      document.removeEventListener("scroll", handleUserActivity)
      document.removeEventListener("keypress", handleUserActivity)
    }
  }, [pathname, userId])

  const contextValue: AnalyticsContextType = {
    track: analytics.track.bind(analytics),
    trackTestView: analytics.trackTestView.bind(analytics),
    trackTestStarted: analytics.trackTestStarted.bind(analytics),
    trackTestCompleted: analytics.trackTestCompleted.bind(analytics),
    trackTherapistsListView: analytics.trackTherapistsListView.bind(analytics),
    trackTherapistProfileView: analytics.trackTherapistProfileView.bind(analytics),
    trackSlotSelected: analytics.trackSlotSelected.bind(analytics),
    trackCheckoutStarted: analytics.trackCheckoutStarted.bind(analytics),
    trackCheckoutCompleted: analytics.trackCheckoutCompleted.bind(analytics),
    trackNoPurchase30Min: analytics.trackNoPurchase30Min.bind(analytics),
  }

  return <AnalyticsContext.Provider value={contextValue}>{children}</AnalyticsContext.Provider>
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider")
  }
  return context
}
