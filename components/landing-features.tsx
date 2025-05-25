import { BarChart3, Calendar, FileText, PiggyBank, RefreshCw, Shield } from "lucide-react"

export function LandingFeatures() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything you need to manage your taxes
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              TaxMate provides a comprehensive suite of tools to help you manage your taxes efficiently and effectively.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-2 rounded-lg border bg-background p-6 shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-50">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Automated VAT Returns</h3>
            <p className="text-muted-foreground">
              Automatically generate and submit VAT returns to HMRC, saving you time and reducing errors.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border bg-background p-6 shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-50">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Tax Estimations</h3>
            <p className="text-muted-foreground">
              Get accurate income and corporation tax estimations based on your financial data.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border bg-background p-6 shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-50">
              <PiggyBank className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Tax-Saving Insights</h3>
            <p className="text-muted-foreground">
              Receive AI-powered recommendations to optimize your tax position and save money.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border bg-background p-6 shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-50">
              <RefreshCw className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Accounting Integrations</h3>
            <p className="text-muted-foreground">
              Seamlessly integrate with Xero, QuickBooks, and other accounting platforms for real-time data.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border bg-background p-6 shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-50">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Deadline Management</h3>
            <p className="text-muted-foreground">
              Never miss a tax deadline with automated reminders and visual indicators.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border bg-background p-6 shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-50">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">GDPR Compliant</h3>
            <p className="text-muted-foreground">
              Your data is secure with our GDPR-compliant storage and processing systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
