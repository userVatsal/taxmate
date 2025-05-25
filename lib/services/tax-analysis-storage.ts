import { prisma } from "@/lib/prisma"
import { TaxAnalysisResult, TaxDeadline } from "./tax-analysis"

export class TaxAnalysisStorageService {
  private static instance: TaxAnalysisStorageService

  private constructor() {}

  static getInstance(): TaxAnalysisStorageService {
    if (!TaxAnalysisStorageService.instance) {
      TaxAnalysisStorageService.instance = new TaxAnalysisStorageService()
    }
    return TaxAnalysisStorageService.instance
  }

  async saveAnalysis(userId: string, analysis: TaxAnalysisResult): Promise<void> {
    try {
      await prisma.taxAnalysis.create({
        data: {
          userId,
          insights: analysis.insights,
          deadlines: analysis.deadlines,
          recommendations: analysis.recommendations,
        },
      })

      // Save deadlines separately for better querying
      await Promise.all(
        analysis.deadlines.map((deadline: TaxDeadline) =>
          prisma.taxDeadline.create({
            data: {
              userId,
              type: deadline.type,
              dueDate: new Date(deadline.dueDate),
              description: deadline.description,
              status: deadline.status,
              priority: deadline.priority,
              reminderDays: deadline.reminderDays,
            },
          })
        )
      )
    } catch (error) {
      console.error("Failed to save tax analysis:", error)
      throw new Error("Failed to save tax analysis")
    }
  }

  async getLatestAnalysis(userId: string): Promise<TaxAnalysisResult | null> {
    try {
      const analysis = await prisma.taxAnalysis.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
      })

      if (!analysis) {
        return null
      }

      return {
        insights: analysis.insights as any,
        deadlines: analysis.deadlines as any,
        recommendations: analysis.recommendations as any,
      }
    } catch (error) {
      console.error("Failed to get latest analysis:", error)
      throw new Error("Failed to get latest analysis")
    }
  }

  async getUpcomingDeadlines(userId: string): Promise<TaxDeadline[]> {
    try {
      const deadlines = await prisma.taxDeadline.findMany({
        where: {
          userId,
          dueDate: {
            gte: new Date(),
          },
          status: "upcoming",
        },
        orderBy: {
          dueDate: "asc",
        },
      })

      return deadlines.map((deadline: { 
        type: string
        dueDate: Date
        description: string
        status: string
        priority: string
        reminderDays: number[]
      }) => ({
        type: deadline.type,
        dueDate: deadline.dueDate.toISOString(),
        description: deadline.description,
        status: deadline.status as "upcoming" | "overdue" | "completed",
        priority: deadline.priority as "high" | "medium" | "low",
        reminderDays: deadline.reminderDays,
      }))
    } catch (error) {
      console.error("Failed to get upcoming deadlines:", error)
      throw new Error("Failed to get upcoming deadlines")
    }
  }

  async updateDeadlineStatus(
    userId: string,
    deadlineId: string,
    status: "upcoming" | "overdue" | "completed"
  ): Promise<void> {
    try {
      await prisma.taxDeadline.update({
        where: {
          id: deadlineId,
          userId,
        },
        data: {
          status,
        },
      })
    } catch (error) {
      console.error("Failed to update deadline status:", error)
      throw new Error("Failed to update deadline status")
    }
  }
} 