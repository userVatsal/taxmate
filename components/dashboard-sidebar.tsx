"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, CreditCard, FileText, Home, PiggyBank, Settings, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "VAT Returns",
    href: "/dashboard/vat",
    icon: FileText,
  },
  {
    title: "Income Tax",
    href: "/dashboard/income",
    icon: PiggyBank,
  },
  {
    title: "Corporation Tax",
    href: "/dashboard/corporation",
    icon: BarChart3,
  },
  {
    title: "Integrations",
    href: "/dashboard/integrations",
    icon: CreditCard,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
      <div className="flex flex-col gap-2 p-4">
        {sidebarItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            asChild
            className={cn(
              "flex w-full items-center justify-start gap-2",
              pathname === item.href && "bg-muted font-medium",
            )}
          >
            <Link href={item.href}>
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  )
}
