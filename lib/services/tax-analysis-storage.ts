// Tax analysis storage service for Cloudflare Worker (D1)
// This version is Worker-compatible and does not use Prisma

import { TaxAnalysisResult, TaxDeadline } from '../types'

interface TaxDeadlineRow {
  type: string
  due_date: string
  description: string
  status: 'upcoming' | 'overdue' | 'completed'
  priority: 'high' | 'medium' | 'low'
  reminder_days: string
}

export class TaxAnalysisStorageService {
  private static instance: TaxAnalysisStorageService

  private constructor() {}

  public static getInstance(): TaxAnalysisStorageService {
    if (!TaxAnalysisStorageService.instance) {
      TaxAnalysisStorageService.instance = new TaxAnalysisStorageService()
    }
    return TaxAnalysisStorageService.instance
  }

  // Helper to get D1 binding from Worker environment
  private getD1(env: any) {
    if (!env || !env.DB) {
      throw new Error('D1 binding (env.DB) not found. Make sure to bind D1 in wrangler.toml and pass env to methods.')
    }
    return env.DB
  }

  public async saveAnalysis(userId: string, analysis: TaxAnalysisResult, env: any): Promise<void> {
    const { DB } = env

    // Save the analysis
    await DB.prepare(
      `INSERT INTO tax_analysis (user_id, result, created_at, updated_at)
       VALUES (?, ?, datetime('now'), datetime('now'))`
    )
    .bind(userId, JSON.stringify(analysis))
    .run()

    // Save the deadlines
    for (const deadline of analysis.deadlines) {
      await DB.prepare(
        `INSERT INTO tax_deadline (user_id, type, due_date, description, status, priority, reminder_days, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
      )
      .bind(
        userId,
        deadline.type,
        deadline.dueDate,
        deadline.description,
        deadline.status,
        deadline.priority,
        JSON.stringify(deadline.reminderDays)
      )
      .run()
    }
  }

  public async getLatestAnalysis(userId: string, env: any): Promise<TaxAnalysisResult | null> {
    const { DB } = env

    const result = await DB.prepare(
      `SELECT result FROM tax_analysis 
       WHERE user_id = ? 
       ORDER BY created_at DESC 
       LIMIT 1`
    )
    .bind(userId)
    .first()

    if (!result) {
      return null
    }

    return JSON.parse(result.result)
  }

  public async getUpcomingDeadlines(userId: string, env: any): Promise<TaxDeadline[]> {
    const { DB } = env

    const results = await DB.prepare(
      `SELECT type, due_date, description, status, priority, reminder_days
       FROM tax_deadline
       WHERE user_id = ? AND status != 'completed'
       ORDER BY due_date ASC`
    )
    .bind(userId)
    .all()

    return results.map((row: TaxDeadlineRow) => ({
      type: row.type,
      dueDate: row.due_date,
      description: row.description,
      status: row.status,
      priority: row.priority,
      reminderDays: JSON.parse(row.reminder_days)
    }))
  }

  public async markDeadlineCompleted(userId: string, deadlineType: string, env: any): Promise<void> {
    const { DB } = env

    await DB.prepare(
      `UPDATE tax_deadline
       SET status = 'completed', updated_at = datetime('now')
       WHERE user_id = ? AND type = ? AND status != 'completed'`
    )
    .bind(userId, deadlineType)
    .run()
  }
} 