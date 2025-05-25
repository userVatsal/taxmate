import { NextResponse } from "next/server"
import { TaxAnalysisService } from "@/lib/services/tax-analysis"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { transactions } = await req.json()
    const taxService = TaxAnalysisService.getInstance()
    const analysis = await taxService.analyzeTransactions(transactions)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Tax analysis error:", error)
    return NextResponse.json(
      { error: "Failed to analyze transactions" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const taxService = TaxAnalysisService.getInstance()
    const lastAnalysis = taxService.getLastAnalysis()

    if (!lastAnalysis) {
      return NextResponse.json(
        { error: "No analysis available" },
        { status: 404 }
      )
    }

    return NextResponse.json(lastAnalysis)
  } catch (error) {
    console.error("Failed to get last analysis:", error)
    return NextResponse.json(
      { error: "Failed to get last analysis" },
      { status: 500 }
    )
  }
} 