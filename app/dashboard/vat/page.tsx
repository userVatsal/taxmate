import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VATReturnsTable } from "@/components/vat-returns-table"
import { VATSummaryChart } from "@/components/vat-summary-chart"

export default function VATPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">VAT Returns</h1>
        <p className="text-muted-foreground">Manage your VAT returns and payments</p>
      </div>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>VAT Summary</CardTitle>
                <CardDescription>Overview of your VAT position</CardDescription>
              </div>
              <Button>New VAT Return</Button>
            </div>
          </CardHeader>
          <CardContent>
            <VATSummaryChart />
          </CardContent>
        </Card>
        <Tabs defaultValue="returns">
          <TabsList>
            <TabsTrigger value="returns">Returns</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="returns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>VAT Returns</CardTitle>
                <CardDescription>Your VAT return history</CardDescription>
              </CardHeader>
              <CardContent>
                <VATReturnsTable />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>VAT Payments</CardTitle>
                <CardDescription>Your VAT payment history</CardDescription>
              </CardHeader>
              <CardContent>
                <p>VAT payments content will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>VAT Settings</CardTitle>
                <CardDescription>Configure your VAT settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p>VAT settings content will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
