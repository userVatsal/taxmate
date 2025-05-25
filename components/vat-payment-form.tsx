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
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const paymentSchema = z.object({
  returnId: z.string().min(1, "VAT return is required"),
  amount: z.string().min(1, "Amount is required"),
  paymentMethod: z.enum(["bank_transfer", "direct_debit", "card"]),
  reference: z.string().min(1, "Reference is required"),
})

type PaymentFormValues = z.infer<typeof paymentSchema>

interface VATPaymentFormProps {
  vatReturns: Array<{
    id: string
    period: string
    vatDue: number
    vatPaid: number
  }>
}

export function VATPaymentForm({ vatReturns }: VATPaymentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      returnId: "",
      amount: "",
      paymentMethod: "bank_transfer",
      reference: "",
    },
  })

  const onSubmit = async (data: PaymentFormValues) => {
    try {
      setIsSubmitting(true)
      setError(null)
      
      const vatService = VATService.getInstance()
      const success = await vatService.recordVATPayment(
        data.returnId,
        parseFloat(data.amount)
      )

      if (success) {
        setSuccess(true)
        form.reset()
      } else {
        setError("Failed to record payment")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record VAT Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="returnId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VAT Return</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a VAT return" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vatReturns.map((return_) => (
                        <SelectItem key={return_.id} value={return_.id}>
                          {return_.period} - £{return_.vatDue.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="direct_debit">Direct Debit</SelectItem>
                      <SelectItem value="card">Card Payment</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Reference</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter payment reference" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <AlertDescription>Payment recorded successfully!</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Record Payment"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 