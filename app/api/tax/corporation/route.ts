import { NextResponse } from 'next/server'
import { CorporationTaxCalculator, FinancialYear } from '@/lib/services/corporation-tax'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const financialYear: FinancialYear = body.financialYear

    const taxableProfit = CorporationTaxCalculator.calculateTaxableProfit(financialYear)
    const taxEstimate = CorporationTaxCalculator.calculateCorporationTax(taxableProfit)

    return NextResponse.json(taxEstimate)
  } catch (error) {
    console.error('Corporation tax calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate corporation tax' },
      { status: 500 }
    )
  }
} 