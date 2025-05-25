import Link from "next/link"
import { Logo } from "@/components/logo"

export function LandingFooter() {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-lg font-bold">TaxMate</span>
            </div>
            <p className="text-sm text-muted-foreground">Simplifying Taxes, Empowering Businesses</p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-sm font-medium">Product</h3>
            <nav className="grid gap-2">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground">
                Testimonials
              </Link>
              <Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
            </nav>
          </div>
          <div className="grid gap-2">
            <h3 className="text-sm font-medium">Company</h3>
            <nav className="grid gap-2">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Blog
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Careers
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </nav>
          </div>
          <div className="grid gap-2">
            <h3 className="text-sm font-medium">Legal</h3>
            <nav className="grid gap-2">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                GDPR
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} TaxMate. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
