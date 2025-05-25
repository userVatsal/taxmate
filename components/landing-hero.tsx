import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Simplifying Taxes, Empowering Businesses
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                TaxMate is an AI-driven tax assistant that automates VAT returns, provides tax estimations, and
                generates intelligent insights for UK businesses.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#demo">Watch Demo</Link>
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="inline-block h-8 w-8 rounded-full bg-gray-200" />
                ))}
              </div>
              <div className="text-muted-foreground">
                Trusted by <span className="font-medium text-foreground">2,000+</span> UK businesses
              </div>
            </div>
          </div>
          <div className="mx-auto aspect-video w-full max-w-[600px] overflow-hidden rounded-xl border bg-gradient-to-br from-blue-50 to-teal-50 object-cover shadow-xl dark:from-blue-950/50 dark:to-teal-950/50 lg:order-last" />
        </div>
      </div>
    </section>
  )
}
