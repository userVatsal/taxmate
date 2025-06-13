import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/select'
import { Transaction, TransactionType } from '@/hooks/useTransactions'

const transactionSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  amount: z.number().positive('Amount must be positive'),
  type: z.enum(['income', 'expense'] as const),
  category: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
})

type TransactionFormData = z.infer<typeof transactionSchema>

interface TransactionFormProps {
  onSubmit: (data: Omit<Transaction, 'id'>) => void
  initialData?: Partial<Transaction>
  categories: string[]
  isLoading?: boolean
}

export function TransactionForm({
  onSubmit,
  initialData,
  categories,
  isLoading = false,
}: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: initialData?.description || '',
      amount: initialData?.amount || 0,
      type: initialData?.type || 'expense',
      category: initialData?.category || '',
      date: initialData?.date || new Date().toISOString().split('T')[0],
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          label="Description"
          {...register('description')}
          error={errors.description?.message}
        />
      </div>

      <div>
        <Input
          label="Amount"
          type="number"
          step="0.01"
          {...register('amount', { valueAsNumber: true })}
          error={errors.amount?.message}
        />
      </div>

      <div>
        <Select
          label="Type"
          {...register('type')}
          error={errors.type?.message}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Select>
      </div>

      <div>
        <Select
          label="Category"
          {...register('category')}
          error={errors.category?.message}
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Input
          label="Date"
          type="date"
          {...register('date')}
          error={errors.date?.message}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Saving...' : initialData ? 'Update Transaction' : 'Add Transaction'}
      </Button>
    </form>
  )
} 