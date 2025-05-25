"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, PieChart, FileText, PiggyBank } from "lucide-react"

export function DashboardOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next VAT Return</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">£4,320.00</div>
          <p className="text-xs text-muted-foreground">Due on 31 July 2023</p>
          <div className="mt-4 h-1 w-full rounded-full bg-muted">
            <div className="h-1 w-1/2 rounded-full bg-blue-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Income Tax Estimate</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">£12,580.00</div>
          <p className="text-xs text-muted-foreground">For tax year 2023/24</p>
          <div className="mt-4 h-1 w-full rounded-full bg-muted">
            <div className="h-1 w-3/4 rounded-full bg-teal-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Corporation Tax</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">£28,450.00</div>
          <p className="text-xs text-muted-foreground">Due on 1 October 2023</p>
          <div className="mt-4 h-1 w-full rounded-full bg-muted">
            <div className="h-1 w-1/4 rounded-full bg-blue-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">£3,240.00</div>
          <p className="text-xs text-muted-foreground">Based on AI recommendations</p>
          <div className="mt-4 h-1 w-full rounded-full bg-muted">
            <div className="h-1 w-full rounded-full bg-teal-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
