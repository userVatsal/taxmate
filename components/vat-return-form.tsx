"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VATService } from "@/lib/vat-service"
import { Upload, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { VATTransaction, VATReturn } from "@/lib/types"

const vatReturnSchema = z.object({
  period: z.string().min(1, "Period is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  vatDue: z.number().optional(),
})

type VATReturnFormValues = z.infer<typeof vatReturnSchema>

export function VATReturnForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const form = useForm<VATReturnFormValues>({
    resolver: zodResolver(vatReturnSchema),
    defaultValues: {
      period: "",
      startDate: "",
      endDate: "",
      dueDate: "",
      vatDue: 0,
    },
  })

  const onSubmit = async (data: VATReturnFormValues) => {
    try {
      setIsSubmitting(true)
      setError(null)
      
      const vatService = VATService.getInstance()
      const newReturn: VATReturn = {
        id: `VR${Date.now()}`,
        ...data,
        status: "pending",
        vatDue: data.vatDue || 0,
        vatPaid: 0,
        transactions: [],
      }

      const success = await vatService.submitVATReturn(newReturn)
      if (success) {
        setSuccess(true)
        form.reset()
      } else {
        setError("Failed to create VAT return")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsSubmitting(true)
      setError(null)

      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string
          const transactions = parseCSV(content)
          
          const vatService = VATService.getInstance()
          const vatDue = await vatService.calculateVATDue(transactions)
          
          // Update the form with calculated VAT due
          form.setValue("vatDue", vatDue)
        } catch (err) {
          setError("Failed to process file")
        } finally {
          setIsSubmitting(false)
        }
      }

      reader.readAsText(file)
    } catch (err) {
      setError("Failed to read file")
      setIsSubmitting(false)
    }
  }

  const parseCSV = (content: string): VATTransaction[] => {
    // Basic CSV parsing - expand based on your file format
    const lines = content.split("\n")
    const headers = lines[0].split(",")
    
    return lines.slice(1).map((line) => {
      const values = line.split(",")
      return {
        id: `T${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        date: values[0],
        description: values[1],
        amount: parseFloat(values[2]),
        vatAmount: parseFloat(values[3]),
        type: values[4] as "sale" | "purchase",
        vatRate: parseFloat(values[5]),
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New VAT Return</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Period</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Q1 2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">CSV file with transactions</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".csv"
                    onChange={handleFileUpload}
                    disabled={isSubmitting}
                  />
                </label>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <AlertDescription>VAT return created successfully!</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create VAT Return"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 