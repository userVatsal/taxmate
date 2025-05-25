import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'

// Declare JWT_SECRET as a global for Cloudflare Workers
declare const JWT_SECRET: string | undefined;

const app = new Hono()

// Enable CORS
app.use('/*', cors())

// JWT middleware
const jwtSecret = typeof JWT_SECRET !== 'undefined' ? JWT_SECRET : 'your-secret-key';

app.use('/*', jwt({
  secret: jwtSecret,
  cookie: 'auth'
}))

// Health check endpoint
app.get('/', (c) => {
  return c.json({ status: 'ok' })
})

// Export the app
export default app 