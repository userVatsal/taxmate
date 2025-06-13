import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`
    const label = segment.charAt(0).toUpperCase() + segment.slice(1)
    return { href, label }
  })

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/dashboard"
            className="text-gray-500 hover:text-gray-700"
          >
            <Home className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb) => (
          <li key={breadcrumb.href} className="flex items-center">
            <ChevronRight className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <Link
              href={breadcrumb.href}
              className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              {breadcrumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
} 