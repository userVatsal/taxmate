// Tax analysis storage service for Cloudflare Worker (D1)
// This version is Worker-compatible and does not use Prisma

import type { TaxAnalysisResult, TaxDeadline } from '../types'

export class TaxAnalysisStorageService {
  static instance: TaxAnalysisStorageService

  static getInstance() {
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

  // Save analysis result for a user
  async saveAnalysis(userId: string, analysis: TaxAnalysisResult, env: any) {
    const db = this.getD1(env)
    await db.prepare(
      `INSERT INTO tax_analysis (user_id, result, created_at) VALUES (?, ?, datetime('now'))`
    ).bind(userId, JSON.stringify(analysis)).run()
  }

  // Get the latest analysis for a user
  async getLatestAnalysis(userId: string, env: any): Promise<TaxAnalysisResult | null> {
    const db = this.getD1(env)
    const result = await db.prepare(
      `SELECT result FROM tax_analysis WHERE user_id = ? ORDER BY created_at DESC LIMIT 1`
    ).bind(userId).first()
    if (!result) return null
    return JSON.parse(result.result)
  }

  // Get upcoming deadlines for a user
  async getUpcomingDeadlines(userId: string, env: any): Promise<TaxDeadline[]> {
    const db = this.getD1(env)
    const results = await db.prepare(
      `SELECT * FROM tax_deadline WHERE user_id = ? AND status = 'upcoming' ORDER BY due_date ASC`
    ).bind(userId).all()
    return results.results.map((deadline: any) => ({
      type: deadline.type,
      dueDate: deadline.due_date,
      description: deadline.description,
      status: deadline.status,
      priority: deadline.priority,
      reminderDays: deadline.reminder_days,
    }))
  }

  // Update deadline status
  async updateDeadlineStatus(deadlineId: string, status: string, env: any) {
    const db = this.getD1(env)
    await db.prepare(
      `UPDATE tax_deadline SET status = ? WHERE id = ?`
    ).bind(status, deadlineId).run()
  }
} 