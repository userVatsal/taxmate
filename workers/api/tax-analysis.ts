import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { TaxAnalysisService } from '../../lib/services/tax-analysis'
import { TaxAnalysisStorageService } from '../../lib/services/tax-analysis-storage'

const app = new Hono()

// Enable CORS
app.use('/*', cors())

// Middleware to verify JWT token
app.use('/*', async (c, next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const token = authHeader.split(' ')[1]
  try {
    // Verify JWT token here
    // For now, we'll just check if it exists
    if (!token) {
      return c.json({ error: 'Invalid token' }, 401)
    }
    await next()
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401)
  }
})

// POST /api/tax-analysis
app.post('/tax-analysis', async (c) => {
  try {
    const { transactions } = await c.req.json()
    const taxService = TaxAnalysisService.getInstance()
    const analysis = await taxService.analyzeTransactions(transactions)

    // Store the analysis using D1
    const storageService = TaxAnalysisStorageService.getInstance()
    await storageService.saveAnalysis('user-id', analysis, c.env) // Replace with actual user ID

    return c.json(analysis)
  } catch (error) {
    console.error('Tax analysis error:', error)
    return c.json({ error: 'Failed to analyze transactions' }, 500)
  }
})

// GET /api/tax-analysis
app.get('/tax-analysis', async (c) => {
  try {
    const storageService = TaxAnalysisStorageService.getInstance()
    const lastAnalysis = await storageService.getLatestAnalysis('user-id', c.env) // Replace with actual user ID

    if (!lastAnalysis) {
      return c.json({ error: 'No analysis available' }, 404)
    }

    return c.json(lastAnalysis)
  } catch (error) {
    console.error('Failed to get last analysis:', error)
    return c.json({ error: 'Failed to get last analysis' }, 500)
  }
})

export default app 