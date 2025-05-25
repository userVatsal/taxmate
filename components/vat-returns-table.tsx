"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Eye } from "lucide-react"

export function VATReturnsTable() {
  const vatReturns = [
    {
      id: "VAT-2023-Q2",
      period: "Apr - Jun 2023",
      dueDate: "31 Jul 2023",
      amount: "£4,320.00",
      status: "Due",
    },
    {
      id: "VAT-2023-Q1",
      period: "Jan - Mar 2023",
      dueDate: "30 Apr 2023",
      amount: "£3,850.00",
      status: "Submitted",
    },
    {
      id: "VAT-2022-Q4",
      period: "Oct - Dec 2022",
      dueDate: "31 Jan 2023",
      amount: "£4,120.00",
      status: "Submitted",
    },
    {
      id: "VAT-2022-Q3",
      period: "Jul - Sep 2022",
      dueDate: "31 Oct 2022",
      amount: "£3,780.00",
      status: "Submitted",
    },
    {
      id: "VAT-2022-Q2",
      period: "Apr - Jun 2022",
      dueDate: "31 Jul 2022",
      amount: "£3,950.00",
      status: "Submitted",
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Return ID</TableHead>
          <TableHead>Period</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vatReturns.map((vatReturn) => (
          <TableRow key={vatReturn.id}>
            <TableCell className="font-medium">{vatReturn.id}</TableCell>
            <TableCell>{vatReturn.period}</TableCell>
            <TableCell>{vatReturn.dueDate}</TableCell>
            <TableCell>{vatReturn.amount}</TableCell>
            <TableCell>
              <Badge variant={vatReturn.status === "Due" ? "destructive" : "success"}>{vatReturn.status}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
