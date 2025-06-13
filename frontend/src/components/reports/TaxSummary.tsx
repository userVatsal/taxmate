import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaxSummary as TaxSummaryType } from '@/hooks/useReports';
import { formatCurrency } from '@/lib/utils';

interface TaxSummaryProps {
  summary: TaxSummaryType;
}

export function TaxSummary({ summary }: TaxSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatCurrency(summary.totalIncome)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatCurrency(summary.totalExpenses)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Net Income</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatCurrency(summary.netIncome)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tax Liability</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatCurrency(summary.taxLiability)}</p>
        </CardContent>
      </Card>
    </div>
  );
} 