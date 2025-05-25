"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { VATService } from "@/lib/vat-service"
import { VATReturn, VATTransaction } from "@/lib/types"
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react"

interface AssessmentResult {
  score: number
  issues: Array<{
    type: "warning" | "error" | "success"
    message: string
    recommendation?: string
  }>
  insights: string[]
}

export function VATAIAssessment() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const analyzeVATData = async () => {
    try {
      setIsAnalyzing(true)
      setError(null)

      const vatService = VATService.getInstance()
      const returns = await vatService.getVATReturns()
      const latestReturn = returns[0] // Get the most recent return

      if (!latestReturn) {
        throw new Error("No VAT returns found")
      }

      // Perform AI analysis
      const result = await performAIAnalysis(latestReturn)
      setAssessment(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze VAT data")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const performAIAnalysis = async (vatReturn: VATReturn): Promise<AssessmentResult> => {
    // This is where we would integrate with an actual AI service
    // For now, we'll simulate AI analysis with some basic rules

    const issues: AssessmentResult["issues"] = []
    const insights: string[] = []

    // Check for common issues
    if (vatReturn.vatDue > 0 && vatReturn.vatPaid === 0) {
      issues.push({
        type: "warning",
        message: "VAT payment pending",
        recommendation: "Consider setting up a direct debit to ensure timely payments",
      })
    }

    // Analyze transaction patterns
    const salesTransactions = vatReturn.transactions.filter(t => t.type === "sale")
    const purchaseTransactions = vatReturn.transactions.filter(t => t.type === "purchase")

    if (salesTransactions.length === 0) {
      issues.push({
        type: "error",
        message: "No sales transactions recorded",
        recommendation: "Ensure all sales are properly recorded with VAT",
      })
    }

    if (purchaseTransactions.length === 0) {
      issues.push({
        type: "warning",
        message: "No purchase transactions recorded",
        recommendation: "Consider recording all business purchases to claim input VAT",
      })
    }

    // Calculate compliance score
    const score = calculateComplianceScore(vatReturn, issues)

    // Generate insights
    if (salesTransactions.length > 0) {
      const averageVATRate = salesTransactions.reduce((sum, t) => sum + t.vatRate, 0) / salesTransactions.length
      insights.push(`Average VAT rate on sales: ${(averageVATRate * 100).toFixed(1)}%`)
    }

    const totalVAT = vatReturn.transactions.reduce((sum, t) => sum + t.vatAmount, 0)
    insights.push(`Total VAT processed: £${totalVAT.toLocaleString()}`)

    return {
      score,
      issues,
      insights,
    }
  }

  const calculateComplianceScore = (vatReturn: VATReturn, issues: AssessmentResult["issues"]): number => {
    let score = 100

    // Deduct points for each issue
    issues.forEach(issue => {
      if (issue.type === "error") score -= 20
      if (issue.type === "warning") score -= 10
    })

    // Deduct points for missing data
    if (vatReturn.transactions.length === 0) score -= 30
    if (vatReturn.vatDue > 0 && vatReturn.vatPaid === 0) score -= 15

    return Math.max(0, score)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI VAT Assessment</CardTitle>
        <CardDescription>
          Get automated insights and recommendations for your VAT compliance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!assessment && !isAnalyzing && (
          <Button onClick={analyzeVATData} className="w-full">
            Start Assessment
          </Button>
        )}

        {isAnalyzing && (
          <div className="space-y-2">
            <Progress value={75} className="w-full" />
            <p className="text-sm text-muted-foreground text-center">
              Analyzing your VAT data...
            </p>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {assessment && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Compliance Score</p>
                <p className="text-2xl font-bold">{assessment.score}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                {assessment.score >= 80 ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-yellow-500" />
                )}
              </div>
            </div>

            {assessment.issues.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Issues Found</h3>
                {assessment.issues.map((issue, index) => (
                  <Alert
                    key={index}
                    variant={issue.type === "error" ? "destructive" : "default"}
                  >
                    {issue.type === "error" ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                    <AlertDescription>
                      <p>{issue.message}</p>
                      {issue.recommendation && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {issue.recommendation}
                        </p>
                      )}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}

            {assessment.insights.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Insights</h3>
                <div className="grid gap-2">
                  {assessment.insights.map((insight, index) => (
                    <div
                      key={index}
                      className="text-sm text-muted-foreground bg-muted p-3 rounded-lg"
                    >
                      {insight}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button onClick={analyzeVATData} variant="outline" className="w-full">
              Refresh Assessment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 