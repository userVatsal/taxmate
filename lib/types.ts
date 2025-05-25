export interface VATTransaction {
  id: string
  date: string
  description: string
  amount: number
  vatAmount: number
  type: "sale" | "purchase"
  vatRate: number
}

export interface VATReturn {
  id: string
  period: string
  startDate: string
  endDate: string
  dueDate: string
  status: "pending" | "submitted" | "paid"
  vatDue: number
  vatPaid: number
  transactions: VATTransaction[]
}

export interface VATPayment {
  id: string
  returnId: string
  amount: number
  date: string
  method: "bank_transfer" | "direct_debit" | "card"
  reference: string
  status: "pending" | "completed" | "failed"
} 