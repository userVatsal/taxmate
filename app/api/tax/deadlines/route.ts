import { NextResponse } from 'next/server'
import { TaxDeadlineService } from '@/lib/services/tax-deadlines'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const daysAhead = parseInt(searchParams.get('daysAhead') || '30')
    const includeOverdue = searchParams.get('includeOverdue') === 'true'

    const now = new Date()
    const vatDeadlines = TaxDeadlineService.calculateVATDeadlines(now)
    const corporationTaxDeadlines = TaxDeadlineService.calculateCorporationTaxDeadlines(now)
    const selfAssessmentDeadlines = TaxDeadlineService.calculateSelfAssessmentDeadlines(now.getFullYear())

    const allDeadlines = [
      ...vatDeadlines,
      ...corporationTaxDeadlines,
      ...selfAssessmentDeadlines,
    ]

    const upcomingDeadlines = TaxDeadlineService.getUpcomingDeadlines(allDeadlines, daysAhead)
    const overdueDeadlines = includeOverdue ? TaxDeadlineService.getOverdueDeadlines(allDeadlines) : []

    return NextResponse.json({
      upcoming: upcomingDeadlines,
      overdue: overdueDeadlines,
    })
  } catch (error) {
    console.error('Tax deadlines error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tax deadlines' },
      { status: 500 }
    )
  }
} 