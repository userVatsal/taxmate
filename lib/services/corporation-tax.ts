import { z } from 'zod'

export const FinancialYearSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  turnover: z.number(),
  expenses: z.number(),
  capitalAllowances: z.number(),
  otherIncome: z.number(),
  otherDeductions: z.number(),
})

export type FinancialYear = z.infer<typeof FinancialYearSchema>

export const CorporationTaxEstimateSchema = z.object({
  financialYear: FinancialYearSchema,
  taxableProfit: z.number(),
  corporationTaxRate: z.number(),
  corporationTaxDue: z.number(),
  paymentDeadline: z.date(),
  marginalRelief: z.number().optional(),
})

export type CorporationTaxEstimate = z.infer<typeof CorporationTaxEstimateSchema>

export class CorporationTaxCalculator {
  private static readonly MAIN_RATE = 0.25 // 25% for profits over £250,000
  private static readonly SMALL_PROFITS_RATE = 0.19 // 19% for profits under £50,000
  private static readonly MARGINAL_RELIEF_THRESHOLD = 50000
  private static readonly UPPER_THRESHOLD = 250000

  static calculateTaxableProfit(financialYear: FinancialYear): number {
    return (
      financialYear.turnover -
      financialYear.expenses -
      financialYear.capitalAllowances +
      financialYear.otherIncome -
      financialYear.otherDeductions
    )
  }

  static calculateCorporationTax(taxableProfit: number): CorporationTaxEstimate {
    const now = new Date()
    const financialYear = {
      startDate: new Date(now.getFullYear(), 3, 1), // April 1st
      endDate: new Date(now.getFullYear() + 1, 2, 31), // March 31st
      turnover: 0,
      expenses: 0,
      capitalAllowances: 0,
      otherIncome: 0,
      otherDeductions: 0,
    }

    let corporationTaxRate = this.MAIN_RATE
    let marginalRelief = 0

    if (taxableProfit <= this.MARGINAL_RELIEF_THRESHOLD) {
      corporationTaxRate = this.SMALL_PROFITS_RATE
    } else if (taxableProfit <= this.UPPER_THRESHOLD) {
      // Calculate marginal relief
      const fraction = (this.UPPER_THRESHOLD - taxableProfit) / (this.UPPER_THRESHOLD - this.MARGINAL_RELIEF_THRESHOLD)
      marginalRelief = (this.MAIN_RATE - this.SMALL_PROFITS_RATE) * fraction
      corporationTaxRate = this.MAIN_RATE - marginalRelief
    }

    const corporationTaxDue = taxableProfit * corporationTaxRate
    const paymentDeadline = this.calculatePaymentDeadline(financialYear.endDate)

    return {
      financialYear,
      taxableProfit,
      corporationTaxRate,
      corporationTaxDue,
      paymentDeadline,
      marginalRelief: marginalRelief > 0 ? marginalRelief : undefined,
    }
  }

  private static calculatePaymentDeadline(financialYearEnd: Date): Date {
    const deadline = new Date(financialYearEnd)
    deadline.setMonth(deadline.getMonth() + 9) // 9 months after year end
    return deadline
  }
} 