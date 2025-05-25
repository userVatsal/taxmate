"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info, Upload, Download, AlertCircle, FileSpreadsheet, FileText, FileDown } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { format, isValid, parse } from "date-fns"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

interface Transaction {
  date: string
  description: string
  amount: number
  vatAmount: number
  type: "sale" | "purchase"
  vatRate: number
}

const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    date: "2024-01-01",
    description: "Sample Sale",
    amount: 1000,
    vatAmount: 200,
    type: "sale",
    vatRate: 20,
  },
  {
    date: "2024-01-02",
    description: "Sample Purchase",
    amount: 500,
    vatAmount: 100,
    type: "purchase",
    vatRate: 20,
  },
]

export function DataImportExport() {
  const [isImporting, setIsImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewData, setPreviewData] = useState<Transaction[] | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const { toast } = useToast()

  const validateTransaction = (transaction: Transaction, rowIndex: number): string | null => {
    // Date validation
    const date = parse(transaction.date, "yyyy-MM-dd", new Date())
    if (!isValid(date)) {
      return `Invalid date format in row ${rowIndex + 1}. Use YYYY-MM-DD format.`
    }

    // Amount validation
    if (transaction.amount <= 0) {
      return `Amount must be greater than 0 in row ${rowIndex + 1}`
    }

    // VAT amount validation
    const expectedVatAmount = (transaction.amount * transaction.vatRate) / 100
    if (Math.abs(transaction.vatAmount - expectedVatAmount) > 0.01) {
      return `VAT amount doesn't match the rate in row ${rowIndex + 1}`
    }

    // Description validation
    if (!transaction.description.trim()) {
      return `Description cannot be empty in row ${rowIndex + 1}`
    }

    // VAT rate validation
    if (![0, 5, 20].includes(transaction.vatRate)) {
      return `Invalid VAT rate in row ${rowIndex + 1}. Must be 0, 5, or 20.`
    }

    return null
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    setError(null)

    try {
      const text = await file.text()
      const rows = text.split("\n")
      const headers = rows[0].split(",")
      
      // Validate headers
      const requiredHeaders = ["date", "description", "amount", "vatAmount", "type", "vatRate"]
      const missingHeaders = requiredHeaders.filter(header => !headers.includes(header))
      
      if (missingHeaders.length > 0) {
        throw new Error(`Missing required columns: ${missingHeaders.join(", ")}`)
      }

      const transactions: Transaction[] = []
      
      for (let i = 1; i < rows.length; i++) {
        if (!rows[i].trim()) continue
        
        const values = rows[i].split(",")
        if (values.length !== headers.length) {
          throw new Error(`Invalid data in row ${i + 1}`)
        }

        const transaction: Transaction = {
          date: values[headers.indexOf("date")],
          description: values[headers.indexOf("description")],
          amount: parseFloat(values[headers.indexOf("amount")]),
          vatAmount: parseFloat(values[headers.indexOf("vatAmount")]),
          type: values[headers.indexOf("type")] as "sale" | "purchase",
          vatRate: parseFloat(values[headers.indexOf("vatRate")]),
        }

        // Validate transaction data
        const validationError = validateTransaction(transaction, i)
        if (validationError) {
          throw new Error(validationError)
        }

        transactions.push(transaction)
      }

      // Show preview instead of importing immediately
      setPreviewData(transactions)
      setShowPreview(true)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to import file")
      toast({
        title: "Import Failed",
        description: err instanceof Error ? err.message : "Failed to import file",
        variant: "destructive",
      })
    } finally {
      setIsImporting(false)
    }
  }

  const handleConfirmImport = async () => {
    if (!previewData) return

    try {
      // TODO: Send transactions to backend
      console.log("Importing transactions:", previewData)
      
      toast({
        title: "Import Successful",
        description: `Successfully imported ${previewData.length} transactions`,
      })
      
      setShowPreview(false)
      setPreviewData(null)
    } catch (err) {
      toast({
        title: "Import Failed",
        description: "Failed to import transactions",
        variant: "destructive",
      })
    }
  }

  const handleExport = async (format: "csv" | "excel" | "pdf") => {
    setIsExporting(true)
    setError(null)

    try {
      // TODO: Fetch transactions from backend
      const transactions: Transaction[] = SAMPLE_TRANSACTIONS

      switch (format) {
        case "csv":
          exportCSV(transactions)
          break
        case "excel":
          exportExcel(transactions)
          break
        case "pdf":
          exportPDF(transactions)
          break
      }

      toast({
        title: "Export Successful",
        description: `Your transactions have been exported as ${format.toUpperCase()}`,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to export data")
      toast({
        title: "Export Failed",
        description: err instanceof Error ? err.message : "Failed to export data",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const exportCSV = (transactions: Transaction[]) => {
    const headers = ["date", "description", "amount", "vatAmount", "type", "vatRate"]
    const csvContent = [
      headers.join(","),
      ...transactions.map(t => [
        t.date,
        t.description,
        t.amount,
        t.vatAmount,
        t.type,
        t.vatRate,
      ].join(","))
    ].join("\n")

    downloadFile(csvContent, "text/csv", "transactions.csv")
  }

  const exportExcel = (transactions: Transaction[]) => {
    const worksheet = XLSX.utils.json_to_sheet(
      transactions.map(t => ({
        Date: format(new Date(t.date), "dd/MM/yyyy"),
        Description: t.description,
        Amount: t.amount,
        "VAT Amount": t.vatAmount,
        Type: t.type.charAt(0).toUpperCase() + t.type.slice(1),
        "VAT Rate": `${t.vatRate}%`,
      }))
    )

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions")
    XLSX.writeFile(workbook, "transactions.xlsx")
  }

  const exportPDF = (transactions: Transaction[]) => {
    const doc = new jsPDF()
    
    // Add title
    doc.setFontSize(16)
    doc.text("Transaction Report", 14, 15)
    
    // Add date
    doc.setFontSize(10)
    doc.text(`Generated on: ${format(new Date(), "dd/MM/yyyy")}`, 14, 22)

    // Add table
    autoTable(doc, {
      startY: 30,
      head: [["Date", "Description", "Amount", "VAT Amount", "Type", "VAT Rate"]],
      body: transactions.map(t => [
        format(new Date(t.date), "dd/MM/yyyy"),
        t.description,
        `£${t.amount.toFixed(2)}`,
        `£${t.vatAmount.toFixed(2)}`,
        t.type.charAt(0).toUpperCase() + t.type.slice(1),
        `${t.vatRate}%`,
      ]),
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 8 },
    })

    doc.save("transactions.pdf")
  }

  const downloadFile = (content: string, mimeType: string, filename: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const downloadTemplate = () => {
    const headers = ["date", "description", "amount", "vatAmount", "type", "vatRate"]
    const csvContent = [
      headers.join(","),
      ...SAMPLE_TRANSACTIONS.map(t => [
        t.date,
        t.description,
        t.amount,
        t.vatAmount,
        t.type,
        t.vatRate,
      ].join(","))
    ].join("\n")

    downloadFile(csvContent, "text/csv", "transaction-template.csv")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Import Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="csv-upload">Upload CSV File</Label>
            <Input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={isImporting}
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={downloadTemplate}
              className="flex items-center"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download Template
            </Button>
          </div>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              CSV file should include the following columns: date, description, amount, vatAmount, type, vatRate.
              Download the template for the correct format.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Export Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => handleExport("csv")}
              disabled={isExporting}
              variant="outline"
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button
              onClick={() => handleExport("excel")}
              disabled={isExporting}
              variant="outline"
              className="w-full"
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export Excel
            </Button>
            <Button
              onClick={() => handleExport("pdf")}
              disabled={isExporting}
              variant="outline"
              className="w-full"
            >
              <FileText className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Export your transactions in various formats for reporting and record-keeping
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Preview Import Data</DialogTitle>
          </DialogHeader>
          {previewData && (
            <div className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>VAT Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>VAT Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>{format(new Date(transaction.date), "dd/MM/yyyy")}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>£{transaction.amount.toFixed(2)}</TableCell>
                        <TableCell>£{transaction.vatAmount.toFixed(2)}</TableCell>
                        <TableCell className="capitalize">{transaction.type}</TableCell>
                        <TableCell>{transaction.vatRate}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPreview(false)
                    setPreviewData(null)
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleConfirmImport}>
                  Confirm Import
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 