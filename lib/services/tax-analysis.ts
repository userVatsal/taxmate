import { VATTransaction } from "@/lib/types"
import { Transaction, TaxAnalysisResult, TaxDeadline } from '../types'

export interface TaxAnalysisResult {
  insights: TaxInsight[]
  deadlines: TaxDeadline[]
  recommendations: TaxRecommendation[]
}

export interface TaxInsight {
  type: "recommendation" | "warning" | "opportunity"
  title: string
  description: string
  impact: string
  action?: string
  confidence: number
  category: "vat" | "corporation" | "income" | "general"
  priority: "high" | "medium" | "low"
}

export interface TaxDeadline {
  type: string
  dueDate: string
  description: string
  status: "upcoming" | "overdue" | "completed"
  priority: "high" | "medium" | "low"
  reminderDays: number[]
}

export interface TaxRecommendation {
  category: "vat" | "corporation" | "income" | "general"
  title: string
  description: string
  potentialSavings: number
  implementationComplexity: "low" | "medium" | "high"
  timeToImplement: string
  requirements: string[]
}

export class TaxAnalysisService {
  private static instance: TaxAnalysisService
  private lastAnalysis: TaxAnalysisResult | null = null
  private analysisInterval: NodeJS.Timeout | null = null

  private constructor() {}

  public static getInstance(): TaxAnalysisService {
    if (!TaxAnalysisService.instance) {
      TaxAnalysisService.instance = new TaxAnalysisService()
    }
    return TaxAnalysisService.instance
  }

  public async analyzeTransactions(transactions: Transaction[]): Promise<TaxAnalysisResult> {
    const insights = this.calculateInsights(transactions)
    const deadlines = this.calculateDeadlines(transactions)
    const recommendations = this.generateRecommendations(insights, deadlines)

    return {
      insights,
      deadlines,
      recommendations
    }
  }

  startRealTimeTracking(transactions: VATTransaction[]) {
    if (this.analysisInterval) {
      clearInterval(this.analysisInterval)
    }

    // Analyze immediately
    this.analyzeTransactions(transactions)

    // Set up periodic analysis
    this.analysisInterval = setInterval(async () => {
      try {
        // TODO: Fetch latest transactions from backend
        const latestTransactions = transactions // Replace with actual API call
        await this.analyzeTransactions(latestTransactions)
      } catch (error) {
        console.error("Real-time analysis failed:", error)
      }
    }, 5 * 60 * 1000) // Analyze every 5 minutes
  }

  stopRealTimeTracking() {
    if (this.analysisInterval) {
      clearInterval(this.analysisInterval)
      this.analysisInterval = null
    }
  }

  getLastAnalysis(): TaxAnalysisResult | null {
    return this.lastAnalysis
  }

  private calculateInsights(transactions: Transaction[]) {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    const netIncome = totalIncome - totalExpenses

    // Calculate VAT liability
    const vatLiability = transactions
      .filter(t => t.vatAmount)
      .reduce((sum, t) => {
        if (t.type === 'income') {
          return sum + (t.vatAmount || 0)
        } else {
          return sum - (t.vatAmount || 0)
        }
      }, 0)

    // Calculate corporation tax (simplified)
    const corporationTax = Math.max(0, netIncome * 0.19) // 19% corporation tax rate

    // Calculate income tax (simplified)
    const taxLiability = Math.max(0, netIncome * 0.20) // 20% basic rate

    return {
      totalIncome,
      totalExpenses,
      netIncome,
      taxLiability,
      vatLiability,
      corporationTax
    }
  }

  private calculateDeadlines(transactions: Transaction[]): TaxDeadline[] {
    const deadlines: TaxDeadline[] = []
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth()

    // VAT Return deadlines (quarterly)
    const vatQuarter = Math.floor(currentMonth / 3)
    const vatDueDate = new Date(currentYear, (vatQuarter + 1) * 3, 7) // 7th day of month after quarter end

    deadlines.push({
      type: 'VAT Return',
      dueDate: vatDueDate.toISOString(),
      description: `VAT Return for Q${vatQuarter + 1} ${currentYear}`,
      status: vatDueDate < now ? 'overdue' : 'upcoming',
      priority: 'high',
      reminderDays: [30, 14, 7, 1]
    })

    // Corporation Tax deadline (9 months after year end)
    const yearEnd = new Date(currentYear, 11, 31)
    const corporationTaxDueDate = new Date(currentYear + 1, 8, 30) // 9 months after year end

    deadlines.push({
      type: 'Corporation Tax',
      dueDate: corporationTaxDueDate.toISOString(),
      description: `Corporation Tax for year ending ${yearEnd.toISOString().split('T')[0]}`,
      status: corporationTaxDueDate < now ? 'overdue' : 'upcoming',
      priority: 'high',
      reminderDays: [90, 60, 30, 14, 7]
    })

    return deadlines
  }

  private generateRecommendations(
    insights: TaxAnalysisResult['insights'],
    deadlines: TaxDeadline[]
  ): TaxAnalysisResult['recommendations'] {
    const recommendations: TaxAnalysisResult['recommendations'] = []

    // Check VAT liability
    if (insights.vatLiability > 0) {
      recommendations.push({
        type: 'VAT',
        description: `You have a VAT liability of £${insights.vatLiability.toFixed(2)}. Consider setting aside funds for payment.`,
        priority: 'high'
      })
    }

    // Check corporation tax
    if (insights.corporationTax > 0) {
      recommendations.push({
        type: 'Corporation Tax',
        description: `Estimated corporation tax liability of £${insights.corporationTax.toFixed(2)}. Plan for payment.`,
        priority: 'high'
      })
    }

    // Check upcoming deadlines
    const upcomingDeadlines = deadlines.filter(d => d.status === 'upcoming')
    if (upcomingDeadlines.length > 0) {
      recommendations.push({
        type: 'Deadlines',
        description: `You have ${upcomingDeadlines.length} upcoming tax deadlines. Review and prepare documentation.`,
        priority: 'medium'
      })
    }

    // Check profit margin
    const profitMargin = insights.netIncome / insights.totalIncome
    if (profitMargin < 0.2) {
      recommendations.push({
        type: 'Profitability',
        description: 'Your profit margin is below 20%. Consider reviewing expenses and pricing strategy.',
        priority: 'medium'
      })
    }

    return recommendations
  }
} 