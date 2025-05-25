"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  vatNumber: z.string().optional(),
  companyNumber: z.string().optional(),
  taxYear: z.string({
    required_error: "Please select a tax year.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
})

export function SettingsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "Acme Inc",
      email: "info@acmeinc.com",
      vatNumber: "GB123456789",
      companyNumber: "12345678",
      taxYear: "2023-2024",
      address: "123 Business St, London, UK",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Submit to API
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="vatNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>VAT Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Optional if registered for VAT</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Companies House registration number</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="taxYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax Year</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tax year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="2022-2023">2022/2023</SelectItem>
                  <SelectItem value="2023-2024">2023/2024</SelectItem>
                  <SelectItem value="2024-2025">2024/2025</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Your current tax year for reporting</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Address</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  )
}
