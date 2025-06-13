import { useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { Database } from '@/types/supabase';

type Transaction = Database['public']['Tables']['transactions']['Row'];

export interface TaxSummary {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  taxLiability: number;
  taxYear: {
    start: string;
    end: string;
  };
}

export interface TaxBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export function useReports(userId: string, taxYearStart: string, taxYearEnd: string) {
  // Fetch transactions for the tax year
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions', userId, taxYearStart, taxYearEnd],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .gte('date', taxYearStart)
        .lte('date', taxYearEnd);

      if (error) throw error;
      return data as Transaction[];
    },
    enabled: !!userId,
  });

  // Calculate tax summary
  const taxSummary = useMemo(() => {
    if (!transactions?.length) return null;

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const netIncome = totalIncome - totalExpenses;
    
    // Basic UK tax calculation (simplified)
    const taxLiability = calculateTaxLiability(netIncome);

    return {
      totalIncome,
      totalExpenses,
      netIncome,
      taxLiability,
      taxYear: {
        start: taxYearStart,
        end: taxYearEnd,
      },
    };
  }, [transactions, taxYearStart, taxYearEnd]);

  // Calculate income breakdown by category
  const incomeBreakdown = useMemo(() => {
    if (!transactions?.length) return [];

    const incomeByCategory = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
        return acc;
      }, {} as Record<string, number>);

    const totalIncome = Object.values(incomeByCategory).reduce((sum: number, amount: number) => sum + amount, 0);

    return Object.entries(incomeByCategory).map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / totalIncome) * 100,
    }));
  }, [transactions]);

  // Calculate expense breakdown by category
  const expenseBreakdown = useMemo(() => {
    if (!transactions?.length) return [];

    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
        return acc;
      }, {} as Record<string, number>);

    const totalExpenses = Object.values(expensesByCategory).reduce((sum: number, amount: number) => sum + amount, 0);

    return Object.entries(expensesByCategory).map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / totalExpenses) * 100,
    }));
  }, [transactions]);

  return {
    taxSummary,
    incomeBreakdown,
    expenseBreakdown,
    isLoading,
  };
}

// Helper function to calculate tax liability
function calculateTaxLiability(netIncome: number): number {
  // UK Tax Year 2023/2024 thresholds
  const PERSONAL_ALLOWANCE = 12570;
  const BASIC_RATE_THRESHOLD = 50270;
  const HIGHER_RATE_THRESHOLD = 125140;

  let tax = 0;

  if (netIncome <= PERSONAL_ALLOWANCE) {
    return 0;
  }

  // Basic rate (20%)
  if (netIncome > PERSONAL_ALLOWANCE) {
    const taxableAtBasicRate = Math.min(
      netIncome - PERSONAL_ALLOWANCE,
      BASIC_RATE_THRESHOLD - PERSONAL_ALLOWANCE
    );
    tax += taxableAtBasicRate * 0.2;
  }

  // Higher rate (40%)
  if (netIncome > BASIC_RATE_THRESHOLD) {
    const taxableAtHigherRate = Math.min(
      netIncome - BASIC_RATE_THRESHOLD,
      HIGHER_RATE_THRESHOLD - BASIC_RATE_THRESHOLD
    );
    tax += taxableAtHigherRate * 0.4;
  }

  // Additional rate (45%)
  if (netIncome > HIGHER_RATE_THRESHOLD) {
    const taxableAtAdditionalRate = netIncome - HIGHER_RATE_THRESHOLD;
    tax += taxableAtAdditionalRate * 0.45;
  }

  return tax;
} 