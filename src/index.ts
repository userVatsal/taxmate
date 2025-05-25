import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'

const app = new Hono()

// Enable CORS
app.use('/*', cors())

// JWT middleware
app.use('/*', jwt({
  secret: process.env.JWT_SECRET || 'your-secret-key',
  cookie: 'auth'
}))

// Health check endpoint
app.get('/', (c) => {
  return c.json({ status: 'ok' })
})

// Export the app
export default app 