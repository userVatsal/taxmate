import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaxBreakdown as TaxBreakdownType } from '@/hooks/useReports';
import { formatCurrency, formatPercentage } from '@/lib/utils';

interface TaxBreakdownProps {
  incomeBreakdown: TaxBreakdownType[];
  expenseBreakdown: TaxBreakdownType[];
}

export function TaxBreakdown({ incomeBreakdown, expenseBreakdown }: TaxBreakdownProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Income Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {incomeBreakdown.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span>{item.category}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    {formatPercentage(item.percentage)}
                  </span>
                  <span className="font-medium">{formatCurrency(item.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenseBreakdown.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <span>{item.category}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    {formatPercentage(item.percentage)}
                  </span>
                  <span className="font-medium">{formatCurrency(item.amount)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 