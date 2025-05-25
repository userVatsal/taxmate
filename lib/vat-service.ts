import { VATTransaction, VATReturn, VATPayment } from "./types"

export class VATService {
  private static instance: VATService
  private vatReturns: VATReturn[] = []
  private transactions: VATTransaction[] = []
  private payments: VATPayment[] = []

  private constructor() {
    // Initialize with mock data
    this.initializeMockData()
  }

  public static getInstance(): VATService {
    if (!VATService.instance) {
      VATService.instance = new VATService()
    }
    return VATService.instance
  }

  private initializeMockData() {
    // Mock transactions
    this.transactions = [
      {
        id: "T001",
        date: "2024-01-15",
        description: "Product Sale",
        amount: 1000,
        vatAmount: 200,
        type: "sale",
        vatRate: 0.20,
      },
      {
        id: "T002",
        date: "2024-01-20",
        description: "Office Supplies",
        amount: 500,
        vatAmount: 100,
        type: "purchase",
        vatRate: 0.20,
      },
      // Add more mock transactions as needed
    ]

    // Mock VAT returns
    this.vatReturns = [
      {
        id: "VR001",
        period: "Q1 2024",
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        dueDate: "2024-05-07",
        status: "pending",
        vatDue: 12450.00,
        vatPaid: 0.00,
        transactions: this.transactions,
      },
      // Add more mock VAT returns as needed
    ]

    // Mock payments
    this.payments = [
      {
        id: "P001",
        returnId: "VR001",
        amount: 12450.00,
        date: "2024-05-01",
        method: "bank_transfer",
        reference: "VAT-Q1-2024",
        status: "completed",
      },
      // Add more mock payments as needed
    ]
  }

  public async getVATReturns(): Promise<VATReturn[]> {
    // TODO: Implement actual API call
    return this.vatReturns
  }

  public async getVATReturn(id: string): Promise<VATReturn | null> {
    // TODO: Implement actual API call
    return this.vatReturns.find((return_) => return_.id === id) || null
  }

  public async calculateVATDue(transactions: VATTransaction[]): Promise<number> {
    const salesVAT = transactions
      .filter((t) => t.type === "sale")
      .reduce((sum, t) => sum + t.vatAmount, 0)

    const purchaseVAT = transactions
      .filter((t) => t.type === "purchase")
      .reduce((sum, t) => sum + t.vatAmount, 0)

    return salesVAT - purchaseVAT
  }

  public async submitVATReturn(return_: VATReturn): Promise<boolean> {
    // TODO: Implement actual API call
    const index = this.vatReturns.findIndex((r) => r.id === return_.id)
    if (index !== -1) {
      this.vatReturns[index] = { ...return_, status: "submitted" }
      return true
    }
    return false
  }

  public async recordVATPayment(returnId: string, amount: number): Promise<boolean> {
    // TODO: Implement actual API call
    const index = this.vatReturns.findIndex((r) => r.id === returnId)
    if (index !== -1) {
      this.vatReturns[index] = {
        ...this.vatReturns[index],
        vatPaid: amount,
        status: "paid",
      }

      // Record the payment
      const payment: VATPayment = {
        id: `P${Date.now()}`,
        returnId,
        amount,
        date: new Date().toISOString(),
        method: "bank_transfer", // Default to bank transfer
        reference: `VAT-${this.vatReturns[index].period}`,
        status: "completed",
      }
      this.payments.push(payment)

      return true
    }
    return false
  }

  public async getPayments(): Promise<VATPayment[]> {
    // TODO: Implement actual API call
    return this.payments
  }

  public async getPayment(id: string): Promise<VATPayment | null> {
    // TODO: Implement actual API call
    return this.payments.find((payment) => payment.id === id) || null
  }
} 