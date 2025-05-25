"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye } from "lucide-react"

const vatReturns = [
  {
    id: "VR001",
    period: "Q1 2024",
    dueDate: "2024-05-07",
    status: "pending",
    vatDue: 12450.00,
    vatPaid: 0.00,
  },
  {
    id: "VR002",
    period: "Q4 2023",
    dueDate: "2024-02-07",
    status: "paid",
    vatDue: 11200.00,
    vatPaid: 11200.00,
  },
  {
    id: "VR003",
    period: "Q3 2023",
    dueDate: "2023-11-07",
    status: "paid",
    vatDue: 10800.00,
    vatPaid: 10800.00,
  },
  {
    id: "VR004",
    period: "Q2 2023",
    dueDate: "2023-08-07",
    status: "paid",
    vatDue: 9500.00,
    vatPaid: 9500.00,
  },
]

export function VATReturnsTable() {
  const [selectedReturn, setSelectedReturn] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button>New VAT Return</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Period</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">VAT Due</TableHead>
            <TableHead className="text-right">VAT Paid</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vatReturns.map((return_) => (
            <TableRow key={return_.id}>
              <TableCell>{return_.period}</TableCell>
              <TableCell>{return_.dueDate}</TableCell>
              <TableCell>
                <Badge
                  variant={return_.status === "paid" ? "success" : "warning"}
                >
                  {return_.status === "paid" ? "Paid" : "Pending"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                £{return_.vatDue.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                £{return_.vatPaid.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
