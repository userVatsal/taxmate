"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    vatDue: 4500,
    vatPaid: 4200,
  },
  {
    name: "Feb",
    vatDue: 5200,
    vatPaid: 4800,
  },
  {
    name: "Mar",
    vatDue: 4800,
    vatPaid: 4500,
  },
  {
    name: "Apr",
    vatDue: 5100,
    vatPaid: 4900,
  },
  {
    name: "May",
    vatDue: 4900,
    vatPaid: 4700,
  },
  {
    name: "Jun",
    vatDue: 5300,
    vatPaid: 5100,
  },
]

export function VATSummaryChart() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `£${value}`}
          />
          <Tooltip
            formatter={(value) => [`£${value}`, ""]}
            labelFormatter={(label) => `${label} 2024`}
          />
          <Bar
            dataKey="vatDue"
            fill="#2563eb"
            radius={[4, 4, 0, 0]}
            name="VAT Due"
          />
          <Bar
            dataKey="vatPaid"
            fill="#16a34a"
            radius={[4, 4, 0, 0]}
            name="VAT Paid"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
