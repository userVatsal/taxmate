import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserProfileDropdown } from './UserProfileDropdown'
import { MobileMenu } from './MobileMenu'
import { Breadcrumbs } from './Breadcrumbs'

interface DashboardLayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Transactions', href: '/transactions' },
  { name: 'Reports', href: '/reports' },
  { name: 'Settings', href: '/settings' },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu */}
      <MobileMenu />

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <span className="text-xl font-bold">TaxMate</span>
            </div>
            <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1 items-center">
              <Breadcrumbs />
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <UserProfileDropdown />
            </div>
          </div>
        </div>

        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 