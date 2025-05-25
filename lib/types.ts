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

export interface TaxAnalysisResult {
  insights: {
    totalIncome: number;
    totalExpenses: number;
    netIncome: number;
    taxLiability: number;
    vatLiability: number;
    corporationTax: number;
  };
  deadlines: TaxDeadline[];
  recommendations: {
    type: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }[];
}

export interface TaxDeadline {
  type: string;
  dueDate: string;
  description: string;
  status: 'upcoming' | 'overdue' | 'completed';
  priority: 'high' | 'medium' | 'low';
  reminderDays: number[];
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  vatRate?: number;
  vatAmount?: number;
} 