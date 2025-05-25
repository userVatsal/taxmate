"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function VATSummaryChart() {
  const data = [
    { month: "Jan", sales: 24000, purchases: 18000, vat: 6000 },
    { month: "Feb", sales: 26000, purchases: 19000, vat: 7000 },
    { month: "Mar", sales: 28000, purchases: 21000, vat: 7000 },
    { month: "Apr", sales: 30000, purchases: 22000, vat: 8000 },
    { month: "May", sales: 32000, purchases: 24000, vat: 8000 },
    { month: "Jun", sales: 34000, purchases: 25000, vat: 9000 },
  ]

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorVAT" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="sales" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSales)" />
          <Area type="monotone" dataKey="purchases" stroke="#14b8a6" fillOpacity={1} fill="url(#colorPurchases)" />
          <Area type="monotone" dataKey="vat" stroke="#f43f5e" fillOpacity={1} fill="url(#colorVAT)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
