import { z } from 'zod'

export const TaxDeadlineSchema = z.object({
  id: z.string(),
  type: z.enum(['vat', 'corporation_tax', 'self_assessment', 'paye']),
  dueDate: z.date(),
  description: z.string(),
  amount: z.number().optional(),
  status: z.enum(['pending', 'completed', 'overdue']),
  reminderSent: z.boolean(),
  lastReminderDate: z.date().optional(),
})

export type TaxDeadline = z.infer<typeof TaxDeadlineSchema>

export class TaxDeadlineService {
  static calculateVATDeadlines(startDate: Date): TaxDeadline[] {
    const deadlines: TaxDeadline[] = []
    const year = startDate.getFullYear()

    // VAT deadlines are quarterly
    for (let quarter = 0; quarter < 4; quarter++) {
      const periodEnd = new Date(year, (quarter + 1) * 3, 31)
      const dueDate = new Date(periodEnd)
      dueDate.setMonth(dueDate.getMonth() + 1)
      dueDate.setDate(7) // 7th of the month after quarter end

      deadlines.push({
        id: `vat-${year}-q${quarter + 1}`,
        type: 'vat',
        dueDate,
        description: `VAT Return for ${this.getQuarterName(quarter + 1)} ${year}`,
        status: 'pending',
        reminderSent: false,
      })
    }

    return deadlines
  }

  static calculateCorporationTaxDeadlines(financialYearEnd: Date): TaxDeadline[] {
    const deadlines: TaxDeadline[] = []
    const year = financialYearEnd.getFullYear()

    // Corporation Tax payment deadline
    const paymentDeadline = new Date(financialYearEnd)
    paymentDeadline.setMonth(paymentDeadline.getMonth() + 9)

    deadlines.push({
      id: `ct-${year}`,
      type: 'corporation_tax',
      dueDate: paymentDeadline,
      description: `Corporation Tax Payment for Year Ended ${financialYearEnd.toLocaleDateString()}`,
      status: 'pending',
      reminderSent: false,
    })

    return deadlines
  }

  static calculateSelfAssessmentDeadlines(taxYear: number): TaxDeadline[] {
    const deadlines: TaxDeadline[] = []

    // Paper return deadline
    deadlines.push({
      id: `sa-paper-${taxYear}`,
      type: 'self_assessment',
      dueDate: new Date(taxYear, 9, 31), // October 31st
      description: `Self Assessment Paper Return for ${taxYear}/${taxYear + 1}`,
      status: 'pending',
      reminderSent: false,
    })

    // Online return deadline
    deadlines.push({
      id: `sa-online-${taxYear}`,
      type: 'self_assessment',
      dueDate: new Date(taxYear + 1, 0, 31), // January 31st
      description: `Self Assessment Online Return for ${taxYear}/${taxYear + 1}`,
      status: 'pending',
      reminderSent: false,
    })

    // Payment deadline
    deadlines.push({
      id: `sa-payment-${taxYear}`,
      type: 'self_assessment',
      dueDate: new Date(taxYear + 1, 0, 31), // January 31st
      description: `Self Assessment Payment for ${taxYear}/${taxYear + 1}`,
      status: 'pending',
      reminderSent: false,
    })

    return deadlines
  }

  static getUpcomingDeadlines(deadlines: TaxDeadline[], daysAhead: number = 30): TaxDeadline[] {
    const now = new Date()
    const futureDate = new Date()
    futureDate.setDate(now.getDate() + daysAhead)

    return deadlines.filter(deadline => {
      return deadline.dueDate >= now && deadline.dueDate <= futureDate && deadline.status === 'pending'
    })
  }

  static getOverdueDeadlines(deadlines: TaxDeadline[]): TaxDeadline[] {
    const now = new Date()
    return deadlines.filter(deadline => {
      return deadline.dueDate < now && deadline.status === 'pending'
    })
  }

  private static getQuarterName(quarter: number): string {
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4']
    return quarters[quarter - 1]
  }
} 