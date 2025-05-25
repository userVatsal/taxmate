import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardOverview } from "@/components/dashboard-overview"
import { DashboardTaxCalendar } from "@/components/dashboard-tax-calendar"
import { DashboardRecentActivity } from "@/components/dashboard-recent-activity"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your tax situation.</p>
      </div>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vat">VAT</TabsTrigger>
          <TabsTrigger value="income">Income Tax</TabsTrigger>
          <TabsTrigger value="corporation">Corporation Tax</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <DashboardOverview />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Tax Calendar</CardTitle>
                <CardDescription>Upcoming tax deadlines and important dates</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardTaxCalendar />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent tax-related activities</CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardRecentActivity />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="vat" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>VAT Returns</CardTitle>
              <CardDescription>Manage your VAT returns and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>VAT content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="income" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Income Tax</CardTitle>
              <CardDescription>Manage your income tax returns and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Income tax content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="corporation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Corporation Tax</CardTitle>
              <CardDescription>Manage your corporation tax returns and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Corporation tax content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
