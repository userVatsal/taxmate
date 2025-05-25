"use client"

import { Calendar } from "@/components/ui/calendar"

export function DashboardTaxCalendar() {
  const today = new Date()

  // Example tax deadlines
  const taxDeadlines = [
    new Date(today.getFullYear(), today.getMonth(), 15), // VAT return
    new Date(today.getFullYear(), today.getMonth(), 22), // PAYE
    new Date(today.getFullYear(), today.getMonth() + 1, 7), // Corporation tax
  ]

  return (
    <Calendar
      mode="single"
      selected={today}
      className="rounded-md border"
      modifiers={{
        deadline: taxDeadlines,
      }}
      modifiersClassNames={{
        deadline: "bg-red-100 text-red-600 font-bold",
      }}
    />
  )
}
