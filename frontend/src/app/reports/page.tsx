'use client';

import { useState } from 'react';
import { useReports } from '@/hooks/useReports';
import { TaxSummary } from '@/components/reports/TaxSummary';
import { TaxBreakdown } from '@/components/reports/TaxBreakdown';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';

export default function ReportsPage() {
  const { session } = useAuth();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  
  // Calculate tax year start and end dates
  const taxYearStart = `${selectedYear}-04-06`;
  const taxYearEnd = `${Number(selectedYear) + 1}-04-05`;
  
  const { taxSummary, incomeBreakdown, expenseBreakdown, isLoading } = useReports(
    session?.user?.id || '',
    taxYearStart,
    taxYearEnd
  );

  const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - i).toString());

  if (!session?.user) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-red-500">Please log in to view your reports.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tax Reports</h1>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : taxSummary ? (
        <div className="space-y-6">
          <TaxSummary summary={taxSummary} />
          <TaxBreakdown incomeBreakdown={incomeBreakdown} expenseBreakdown={expenseBreakdown} />
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">No data available for the selected year.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 