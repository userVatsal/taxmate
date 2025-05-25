import { TaxAnalysisStorageService } from '@/lib/services/tax-analysis-storage'
import { prisma } from '@/lib/prisma'
import { TaxAnalysisResult, TaxDeadline } from '@/lib/services/tax-analysis'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    taxAnalysis: {
      create: jest.fn(),
      findFirst: jest.fn(),
    },
    taxDeadline: {
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
  },
}))

describe('TaxAnalysisStorageService', () => {
  let service: TaxAnalysisStorageService
  const mockUserId = 'test-user-id'

  beforeEach(() => {
    service = TaxAnalysisStorageService.getInstance()
    jest.clearAllMocks()
  })

  describe('saveAnalysis', () => {
    it('should save analysis and deadlines', async () => {
      const mockAnalysis: TaxAnalysisResult = {
        insights: [
          {
            type: 'warning',
            title: 'Test Warning',
            description: 'Test Description',
            impact: 'Test Impact',
            confidence: 0.9,
            category: 'vat',
            priority: 'high',
          },
        ],
        deadlines: [
          {
            type: 'VAT Return',
            dueDate: '2024-04-01T00:00:00.000Z',
            description: 'Test Deadline',
            status: 'upcoming',
            priority: 'high',
            reminderDays: [30, 14, 7, 3, 1],
          },
        ],
        recommendations: [
          {
            category: 'vat',
            title: 'Test Recommendation',
            description: 'Test Description',
            potentialSavings: 1000,
            implementationComplexity: 'low',
            timeToImplement: '1 week',
            requirements: ['Test Requirement'],
          },
        ],
      }

      await service.saveAnalysis(mockUserId, mockAnalysis)

      expect(prisma.taxAnalysis.create).toHaveBeenCalledWith({
        data: {
          userId: mockUserId,
          insights: mockAnalysis.insights,
          deadlines: mockAnalysis.deadlines,
          recommendations: mockAnalysis.recommendations,
        },
      })

      expect(prisma.taxDeadline.create).toHaveBeenCalledWith({
        data: {
          userId: mockUserId,
          type: mockAnalysis.deadlines[0].type,
          dueDate: new Date(mockAnalysis.deadlines[0].dueDate),
          description: mockAnalysis.deadlines[0].description,
          status: mockAnalysis.deadlines[0].status,
          priority: mockAnalysis.deadlines[0].priority,
          reminderDays: mockAnalysis.deadlines[0].reminderDays,
        },
      })
    })
  })

  describe('getLatestAnalysis', () => {
    it('should return null when no analysis exists', async () => {
      ;(prisma.taxAnalysis.findFirst as jest.Mock).mockResolvedValue(null)

      const result = await service.getLatestAnalysis(mockUserId)
      expect(result).toBeNull()
    })

    it('should return the latest analysis', async () => {
      const mockAnalysis = {
        insights: [{ type: 'warning', title: 'Test' }],
        deadlines: [{ type: 'VAT Return', dueDate: '2024-04-01' }],
        recommendations: [{ category: 'vat', title: 'Test' }],
      }

      ;(prisma.taxAnalysis.findFirst as jest.Mock).mockResolvedValue(mockAnalysis)

      const result = await service.getLatestAnalysis(mockUserId)
      expect(result).toEqual(mockAnalysis)
    })
  })

  describe('getUpcomingDeadlines', () => {
    it('should return upcoming deadlines', async () => {
      const mockDeadlines = [
        {
          type: 'VAT Return',
          dueDate: new Date('2024-04-01'),
          description: 'Test Deadline',
          status: 'upcoming',
          priority: 'high',
          reminderDays: [30, 14, 7, 3, 1],
        },
      ]

      ;(prisma.taxDeadline.findMany as jest.Mock).mockResolvedValue(mockDeadlines)

      const result = await service.getUpcomingDeadlines(mockUserId)
      expect(result).toHaveLength(1)
      expect(result[0].type).toBe('VAT Return')
      expect(result[0].status).toBe('upcoming')
    })
  })

  describe('updateDeadlineStatus', () => {
    it('should update deadline status', async () => {
      const deadlineId = 'test-deadline-id'
      const newStatus = 'completed'

      await service.updateDeadlineStatus(mockUserId, deadlineId, newStatus)

      expect(prisma.taxDeadline.update).toHaveBeenCalledWith({
        where: {
          id: deadlineId,
          userId: mockUserId,
        },
        data: {
          status: newStatus,
        },
      })
    })
  })
}) 