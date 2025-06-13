import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          'block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm',
          error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    )
  }
)

Select.displayName = 'Select'

export { Select } 