import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'
import { TaxAnalysisService } from '../../lib/services/tax-analysis'
import { TaxAnalysisStorageService } from '../../lib/services/tax-analysis-storage'
import type { Transaction, TaxAnalysisResult } from '../../lib/types'

const app = new Hono()

// Enable CORS
app.use('/*', cors())

// Declare JWT_SECRET as a global for Cloudflare Workers
declare const JWT_SECRET: string | undefined;

// JWT middleware
const jwtSecret = typeof JWT_SECRET !== 'undefined' ? JWT_SECRET : 'your-secret-key';

app.use('/*', jwt({
  secret: jwtSecret,
  cookie: 'auth'
}))

// Error handling middleware
app.use('/*', async (c, next) => {
  try {
    await next()
  } catch (error) {
    console.error('Worker error:', error)
    return c.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// POST /api/tax-analysis
app.post('/tax-analysis', async (c) => {
  try {
    const userId = c.get('jwtPayload')?.sub
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const { transactions } = await c.req.json<{ transactions: Transaction[] }>()
    if (!Array.isArray(transactions)) {
      return c.json({ error: 'Invalid transactions data' }, 400)
    }

    const taxService = TaxAnalysisService.getInstance()
    const analysis = await taxService.analyzeTransactions(transactions)

    // Store the analysis using D1
    const storageService = TaxAnalysisStorageService.getInstance()
    await storageService.saveAnalysis(userId, analysis, c.env)

    return c.json(analysis)
  } catch (error) {
    console.error('Tax analysis error:', error)
    return c.json({ 
      error: 'Failed to analyze transactions',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// GET /api/tax-analysis
app.get('/tax-analysis', async (c) => {
  try {
    const userId = c.get('jwtPayload')?.sub
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const storageService = TaxAnalysisStorageService.getInstance()
    const lastAnalysis = await storageService.getLatestAnalysis(userId, c.env)

    if (!lastAnalysis) {
      return c.json({ error: 'No analysis available' }, 404)
    }

    return c.json(lastAnalysis)
  } catch (error) {
    console.error('Failed to get last analysis:', error)
    return c.json({ 
      error: 'Failed to get last analysis',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

// GET /api/tax-analysis/deadlines
app.get('/tax-analysis/deadlines', async (c) => {
  try {
    const userId = c.get('jwtPayload')?.sub
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const storageService = TaxAnalysisStorageService.getInstance()
    const deadlines = await storageService.getUpcomingDeadlines(userId, c.env)

    return c.json(deadlines)
  } catch (error) {
    console.error('Failed to get deadlines:', error)
    return c.json({ 
      error: 'Failed to get deadlines',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500)
  }
})

export default app 