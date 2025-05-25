import { TaxAnalysisService } from '@/lib/services/tax-analysis'
import { VATTransaction } from '@/lib/types'

describe('TaxAnalysisService', () => {
  let service: TaxAnalysisService

  beforeEach(() => {
    service = TaxAnalysisService.getInstance()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('analyzeTransactions', () => {
    it('should analyze transactions and return insights', async () => {
      const mockTransactions: VATTransaction[] = [
        {
          date: new Date('2024-01-01'),
          description: 'Test Sale',
          amount: 1000,
          vatAmount: 200,
          vatRate: 20,
          type: 'sale',
        },
        {
          date: new Date('2024-01-02'),
          description: 'Test Purchase',
          amount: 500,
          vatAmount: 100,
          vatRate: 20,
          type: 'purchase',
        },
      ]

      const result = await service.analyzeTransactions(mockTransactions)

      expect(result).toHaveProperty('insights')
      expect(result).toHaveProperty('deadlines')
      expect(result).toHaveProperty('recommendations')
      expect(Array.isArray(result.insights)).toBe(true)
      expect(Array.isArray(result.deadlines)).toBe(true)
      expect(Array.isArray(result.recommendations)).toBe(true)
    })

    it('should handle empty transaction array', async () => {
      const result = await service.analyzeTransactions([])

      expect(result.insights).toHaveLength(0)
      expect(result.deadlines).toHaveLength(0)
      expect(result.recommendations).toHaveLength(0)
    })

    it('should detect high VAT output', async () => {
      const mockTransactions: VATTransaction[] = [
        {
          date: new Date('2024-01-01'),
          description: 'High VAT Sale',
          amount: 10000,
          vatAmount: 2000,
          vatRate: 20,
          type: 'sale',
        },
        {
          date: new Date('2024-01-02'),
          description: 'Low VAT Purchase',
          amount: 1000,
          vatAmount: 200,
          vatRate: 20,
          type: 'purchase',
        },
      ]

      const result = await service.analyzeTransactions(mockTransactions)
      const vatWarning = result.insights.find(
        insight => insight.title === 'High VAT Output'
      )

      expect(vatWarning).toBeDefined()
      expect(vatWarning?.type).toBe('warning')
      expect(vatWarning?.priority).toBe('high')
    })
  })

  describe('realTimeTracking', () => {
    it('should start and stop real-time tracking', () => {
      const mockTransactions: VATTransaction[] = []
      const analyzeSpy = jest.spyOn(service, 'analyzeTransactions')

      service.startRealTimeTracking(mockTransactions)
      expect(analyzeSpy).toHaveBeenCalled()

      service.stopRealTimeTracking()
      // Wait for the interval to be cleared
      jest.advanceTimersByTime(5 * 60 * 1000)
      expect(analyzeSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('getLastAnalysis', () => {
    it('should return null when no analysis has been performed', () => {
      expect(service.getLastAnalysis()).toBeNull()
    })

    it('should return the last analysis result', async () => {
      const mockTransactions: VATTransaction[] = [
        {
          date: new Date('2024-01-01'),
          description: 'Test Transaction',
          amount: 1000,
          vatAmount: 200,
          vatRate: 20,
          type: 'sale',
        },
      ]

      const result = await service.analyzeTransactions(mockTransactions)
      expect(service.getLastAnalysis()).toEqual(result)
    })
  })
}) 