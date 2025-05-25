"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VATReturnsTable } from "@/components/vat-returns-table"
import { VATSummaryChart } from "@/components/vat-summary-chart"
import { VATReturnForm } from "@/components/vat-return-form"
import { VATPaymentForm } from "@/components/vat-payment-form"
import { VATAIAssessment } from "@/components/vat-ai-assessment"
import { VATService } from "@/lib/vat-service"
import { useEffect } from "react"
import { VATReturn } from "@/lib/types"

export default function VATPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [vatReturns, setVATReturns] = useState<VATReturn[]>([])

  useEffect(() => {
    const loadVATReturns = async () => {
      const vatService = VATService.getInstance()
      const returns = await vatService.getVATReturns()
      setVATReturns(returns)
    }

    loadVATReturns()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">VAT Management</h1>
        <p className="text-muted-foreground">
          Manage your VAT returns, track payments, and view historical data.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="returns">VAT Returns</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current VAT Period</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Q1 2024</div>
                <p className="text-xs text-muted-foreground">
                  Due by 7th May 2024
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">VAT Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">£12,450.00</div>
                <p className="text-xs text-muted-foreground">
                  +£1,250.00 from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">VAT Refund</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">£0.00</div>
                <p className="text-xs text-muted-foreground">
                  No refund due
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Pending</div>
                <p className="text-xs text-muted-foreground">
                  23 days until due
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>VAT Summary</CardTitle>
                <CardDescription>
                  Overview of your VAT position for the current period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VATSummaryChart />
              </CardContent>
            </Card>

            <VATAIAssessment />
          </div>
        </TabsContent>

        <TabsContent value="returns" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <VATReturnForm />
            <Card>
              <CardHeader>
                <CardTitle>VAT Returns</CardTitle>
                <CardDescription>
                  View and manage your VAT returns history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VATReturnsTable />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <VATPaymentForm vatReturns={vatReturns} />
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>
                  Track your VAT payments and refunds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VATReturnsTable />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>VAT Settings</CardTitle>
              <CardDescription>
                Configure your VAT preferences and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* TODO: Implement VAT settings form */}
              <p>VAT settings form coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
