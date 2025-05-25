import { NextResponse } from 'next/server'
import { VATCalculator, VATTransaction } from '@/lib/services/vat-calculator'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const transactions: VATTransaction[] = body.transactions

    const vatReturn = VATCalculator.calculateVATReturn(transactions)

    return NextResponse.json(vatReturn)
  } catch (error) {
    console.error('VAT calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate VAT' },
      { status: 500 }
    )
  }
} 