import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock next-auth
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(() => Promise.resolve(null)),
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(() => ({
    data: null,
    status: 'unauthenticated',
  })),
}))

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    transaction: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    taxAnalysis: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    taxDeadline: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}))

// Add TextEncoder/TextDecoder for JSDOM
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks()
}) 