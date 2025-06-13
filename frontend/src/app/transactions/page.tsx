import { useState, ChangeEvent } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/select'
import { TransactionForm } from '@/components/transactions/TransactionForm'
import { FileUpload } from '@/components/transactions/FileUpload'
import { useTransactions } from '@/hooks/useTransactions'
import { Plus } from 'lucide-react'

// Sample data - replace with API call
const initialTransactions = [
  {
    id: '1',
    description: 'Salary',
    amount: 5000,
    type: 'income' as const,
    category: 'Salary',
    date: '2024-03-01',
  },
  {
    id: '2',
    description: 'Office Supplies',
    amount: 150,
    type: 'expense' as const,
    category: 'Office',
    date: '2024-03-02',
  },
  // Add more sample transactions as needed
]

export default function TransactionsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const {
    transactions,
    categories,
    filters,
    sort,
    setFilters,
    setSort,
    addTransaction,
  } = useTransactions(initialTransactions)

  const handleFileUpload = async (file: File) => {
    // Implement file upload logic here
    console.log('Uploading file:', file.name)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
          <div className="flex space-x-4">
            <Button onClick={() => setIsUploadOpen(true)}>
              Import CSV
            </Button>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Input
              placeholder="Search transactions..."
              value={filters.search || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          <div>
            <Select
              value={filters.type || ''}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const value = e.target.value
                setFilters({ 
                  ...filters, 
                  type: value === '' ? undefined : value as 'income' | 'expense'
                })
              }}
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Select>
          </div>
          <div>
            <Select
              value={filters.category || ''}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Select
              value={`${sort.field}-${sort.order}`}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const [field, order] = e.target.value.split('-')
                setSort({ 
                  field: field as 'date' | 'amount' | 'description',
                  order: order as 'asc' | 'desc'
                })
              }}
            >
              <option value="date-desc">Date (Newest)</option>
              <option value="date-asc">Date (Oldest)</option>
              <option value="amount-desc">Amount (High to Low)</option>
              <option value="amount-asc">Amount (Low to High)</option>
              <option value="description-asc">Description (A-Z)</option>
              <option value="description-desc">Description (Z-A)</option>
            </Select>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    £{transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.type === 'income'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-medium mb-4">Add Transaction</h2>
            <TransactionForm
              onSubmit={addTransaction}
              categories={categories}
            />
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-medium mb-4">Import Transactions</h2>
            <FileUpload onUpload={handleFileUpload} />
            <Button
              variant="ghost"
              className="mt-4 w-full"
              onClick={() => setIsUploadOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
} 