import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTransactions } from './useTransactions'

describe('useTransactions', () => {
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
  ]

  it('initializes with provided transactions', () => {
    const { result } = renderHook(() => useTransactions(initialTransactions))

    expect(result.current.transactions).toEqual(initialTransactions)
  })

  it('filters transactions by type', () => {
    const { result } = renderHook(() => useTransactions(initialTransactions))

    act(() => {
      result.current.setFilters({ type: 'income' })
    })

    expect(result.current.filteredAndSortedTransactions).toHaveLength(1)
    expect(result.current.filteredAndSortedTransactions[0].type).toBe('income')
  })

  it('filters transactions by category', () => {
    const { result } = renderHook(() => useTransactions(initialTransactions))

    act(() => {
      result.current.setFilters({ category: 'Office' })
    })

    expect(result.current.filteredAndSortedTransactions).toHaveLength(1)
    expect(result.current.filteredAndSortedTransactions[0].category).toBe('Office')
  })

  it('filters transactions by search term', () => {
    const { result } = renderHook(() => useTransactions(initialTransactions))

    act(() => {
      result.current.setFilters({ search: 'Salary' })
    })

    expect(result.current.filteredAndSortedTransactions).toHaveLength(1)
    expect(result.current.filteredAndSortedTransactions[0].description).toBe('Salary')
  })

  it('sorts transactions by amount', () => {
    const { result } = renderHook(() => useTransactions(initialTransactions))

    act(() => {
      result.current.setSort({ field: 'amount', order: 'desc' })
    })

    expect(result.current.filteredAndSortedTransactions[0].amount).toBe(5000)
    expect(result.current.filteredAndSortedTransactions[1].amount).toBe(150)
  })

  it('sorts transactions by date', () => {
    const { result } = renderHook(() => useTransactions(initialTransactions))

    act(() => {
      result.current.setSort({ field: 'date', order: 'asc' })
    })

    expect(result.current.filteredAndSortedTransactions[0].date).toBe('2024-03-01')
    expect(result.current.filteredAndSortedTransactions[1].date).toBe('2024-03-02')
  })

  it('adds a new transaction', () => {
    const { result } = renderHook(() => useTransactions(initialTransactions))

    const newTransaction = {
      description: 'New Transaction',
      amount: 200,
      type: 'expense' as const,
      category: 'Office',
      date: '2024-03-03',
    }

    act(() => {
      result.current.addTransaction(newTransaction)
    })

    expect(result.current.transactions).toHaveLength(3)
    expect(result.current.transactions[2].description).toBe('New Transaction')
  })

  it('updates an existing transaction', () => {
    const { result } = renderHook(() => useTransactions(initialTransactions))

    act(() => {
      result.current.updateTransaction('1', { amount: 6000 })
    })

    expect(result.current.transactions[0].amount).toBe(6000)
  })

  it('deletes a transaction', () => {
    const { result } = renderHook(() => useTransactions(initialTransactions))

    act(() => {
      result.current.deleteTransaction('1')
    })

    expect(result.current.transactions).toHaveLength(1)
    expect(result.current.transactions[0].id).toBe('2')
  })

  it('returns unique categories', () => {
    const { result } = renderHook(() => useTransactions(initialTransactions))

    expect(result.current.categories).toEqual(['Salary', 'Office'])
  })
}) 