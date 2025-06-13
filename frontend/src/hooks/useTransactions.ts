import { useState, useMemo } from 'react'

export type TransactionType = 'income' | 'expense'
export type SortField = 'date' | 'amount' | 'description'
export type SortOrder = 'asc' | 'desc'

export interface Transaction {
  id: string
  description: string
  amount: number
  type: TransactionType
  category: string
  date: string
}

interface TransactionFilters {
  type?: TransactionType
  category?: string
  dateRange?: {
    start: string
    end: string
  }
  search?: string
}

interface TransactionSort {
  field: SortField
  order: SortOrder
}

export function useTransactions(initialTransactions: Transaction[] = []) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [filters, setFilters] = useState<TransactionFilters>({})
  const [sort, setSort] = useState<TransactionSort>({ field: 'date', order: 'desc' })

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = [...transactions]

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchLower) ||
        t.category.toLowerCase().includes(searchLower)
      )
    }

    if (filters.type) {
      filtered = filtered.filter(t => t.type === filters.type)
    }

    if (filters.category) {
      filtered = filtered.filter(t => t.category === filters.category)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sort.field]
      const bValue = b[sort.field]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.order === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sort.order === 'asc' 
          ? aValue - bValue
          : bValue - aValue
      }

      return 0
    })

    return filtered
  }, [transactions, filters, sort])

  const categories = useMemo(() => {
    const uniqueCategories = new Set(transactions.map(t => t.category))
    return Array.from(uniqueCategories)
  }, [transactions])

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
    }
    setTransactions(prev => [...prev, newTransaction])
  }

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    )
  }

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  return {
    transactions,
    filteredAndSortedTransactions,
    categories,
    filters,
    sort,
    setFilters,
    setSort,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  }
} 