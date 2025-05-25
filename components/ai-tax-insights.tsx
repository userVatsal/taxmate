"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Lightbulb, AlertTriangle, TrendingUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import { TaxAnalysisService } from "@/lib/services/tax-analysis"
import { VATTransaction } from "@/lib/types"

interface TaxInsight {
  type: "recommendation" | "warning" | "opportunity"
  title: string
  description: string
  impact: string
  action?: string
  confidence: number
  category: "vat" | "corporation" | "income" | "general"
  priority: "high" | "medium" | "low"
}

interface TaxDeadline {
  type: string
  dueDate: string
  description: string
  status: "upcoming" | "overdue" | "completed"
  priority: "high" | "medium" | "low"
  reminderDays: number[]
}

interface TaxRecommendation {
  category: "vat" | "corporation" | "income" | "general"
  title: string
  description: string
  potentialSavings: number
  implementationComplexity: "low" | "medium" | "high"
  timeToImplement: string
  requirements: string[]
}

export function AITaxInsights() {
  const [isLoading, setIsLoading] = useState(false)
  const [insights, setInsights] = useState<TaxInsight[]>([])
  const [deadlines, setDeadlines] = useState<TaxDeadline[]>([])
  const [recommendations, setRecommendations] = useState<TaxRecommendation[]>([])
  const { toast } = useToast()

  const taxService = TaxAnalysisService.getInstance()

  useEffect(() => {
    // Start real-time tracking when component mounts
    const mockTransactions: VATTransaction[] = [
      // Add mock transactions for testing
      {
        id: "1",
        date: new Date().toISOString(),
        description: "Test Sale",
        amount: 1000,
        vatAmount: 200,
        type: "sale",
        vatRate: 20,
      },
    ]

    taxService.startRealTimeTracking(mockTransactions)

    // Cleanup on unmount
    return () => {
      taxService.stopRealTimeTracking()
    }
  }, [taxService])

  const handleAnalyze = async () => {
    setIsLoading(true)
    try {
      const result = await taxService.analyzeTransactions([]) // TODO: Pass actual transactions
      setInsights((result.insights as unknown) as TaxInsight[])
      setDeadlines(result.deadlines)
      setRecommendations((result.recommendations as unknown) as TaxRecommendation[])

      toast({
        title: "Analysis Complete",
        description: "New insights have been generated based on your recent transactions",
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to generate insights. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getInsightIcon = (type: TaxInsight["type"]) => {
    switch (type) {
      case "recommendation":
        return <Lightbulb className="h-4 w-4 text-yellow-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "opportunity":
        return <TrendingUp className="h-4 w-4 text-green-500" />
    }
  }

  const getDeadlineStatusColor = (status: TaxDeadline["status"]) => {
    switch (status) {
      case "upcoming":
        return "text-blue-500"
      case "overdue":
        return "text-red-500"
      case "completed":
        return "text-green-500"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Tax Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Analyzing..." : "Analyze Transactions"}
          </Button>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    {getInsightIcon(insight.type)}
                    <div className="space-y-1">
                      <h4 className="font-semibold">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                      <p className="text-sm font-medium">{insight.impact}</p>
                      {insight.action && (
                        <p className="text-sm text-blue-500">{insight.action}</p>
                      )}
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>Confidence: {Math.round(insight.confidence * 100)}%</span>
                        <span>•</span>
                        <span>Priority: {insight.priority}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deadlines.map((deadline, index) => (
                <TableRow key={index}>
                  <TableCell>{deadline.type}</TableCell>
                  <TableCell>{format(new Date(deadline.dueDate), "dd/MM/yyyy")}</TableCell>
                  <TableCell>{deadline.description}</TableCell>
                  <TableCell className={getDeadlineStatusColor(deadline.status)}>
                    {deadline.status.charAt(0).toUpperCase() + deadline.status.slice(1)}
                  </TableCell>
                  <TableCell>{deadline.priority}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold">{recommendation.title}</h4>
                    <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Potential Savings</p>
                        <p className="text-green-500">£{recommendation.potentialSavings.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="font-medium">Time to Implement</p>
                        <p>{recommendation.timeToImplement}</p>
                      </div>
                      <div>
                        <p className="font-medium">Complexity</p>
                        <p>{recommendation.implementationComplexity}</p>
                      </div>
                      <div>
                        <p className="font-medium">Requirements</p>
                        <ul className="list-disc list-inside">
                          {recommendation.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          AI insights are based on your transaction history and current tax regulations.
          Always consult with a tax professional before making significant changes.
        </AlertDescription>
      </Alert>
    </div>
  )
} 