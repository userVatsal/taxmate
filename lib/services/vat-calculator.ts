import { z } from 'zod'

// Types
export const VATTransactionSchema = z.object({
  id: z.string(),
  date: z.date(),
  description: z.string(),
  amount: z.number(),
  vatRate: z.number(),
  type: z.enum(['sale', 'purchase']),
  category: z.string(),
})

export type VATTransaction = z.infer<typeof VATTransactionSchema>

export const VATReturnSchema = z.object({
  period: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  sales: z.array(VATTransactionSchema),
  purchases: z.array(VATTransactionSchema),
  totalSales: z.number(),
  totalPurchases: z.number(),
  vatDue: z.number(),
  vatReclaimed: z.number(),
  netVat: z.number(),
})

export type VATReturn = z.infer<typeof VATReturnSchema>

export class VATCalculator {
  private static readonly STANDARD_RATE = 0.20 // 20%
  private static readonly REDUCED_RATE = 0.05 // 5%
  private static readonly ZERO_RATE = 0.00 // 0%

  static calculateVATAmount(amount: number, rate: number): number {
    return amount * rate
  }

  static calculateNetAmount(amount: number, rate: number): number {
    return amount / (1 + rate)
  }

  static calculateGrossAmount(netAmount: number, rate: number): number {
    return netAmount * (1 + rate)
  }

  static calculateVATReturn(transactions: VATTransaction[]): VATReturn {
    const sales = transactions.filter(t => t.type === 'sale')
    const purchases = transactions.filter(t => t.type === 'purchase')

    const totalSales = sales.reduce((sum, t) => sum + t.amount, 0)
    const totalPurchases = purchases.reduce((sum, t) => sum + t.amount, 0)

    const vatDue = sales.reduce((sum, t) => sum + this.calculateVATAmount(t.amount, t.vatRate), 0)
    const vatReclaimed = purchases.reduce((sum, t) => sum + this.calculateVATAmount(t.amount, t.vatRate), 0)

    return {
      period: this.getCurrentPeriod(),
      startDate: this.getPeriodStartDate(),
      endDate: this.getPeriodEndDate(),
      sales,
      purchases,
      totalSales,
      totalPurchases,
      vatDue,
      vatReclaimed,
      netVat: vatDue - vatReclaimed,
    }
  }

  private static getCurrentPeriod(): string {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    return `${year}-Q${Math.ceil(month / 3)}`
  }

  private static getPeriodStartDate(): Date {
    const now = new Date()
    const quarter = Math.floor(now.getMonth() / 3)
    return new Date(now.getFullYear(), quarter * 3, 1)
  }

  private static getPeriodEndDate(): Date {
    const now = new Date()
    const quarter = Math.floor(now.getMonth() / 3)
    return new Date(now.getFullYear(), (quarter + 1) * 3, 0)
  }
} 