import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function LandingPricing() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, transparent pricing</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that's right for your business. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>For small businesses just getting started</CardDescription>
              <div className="pt-4">
                <span className="text-3xl font-bold">£19</span>
                <span className="text-muted-foreground"> / month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-500" />
                  <span>VAT return automation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-500" />
                  <span>Basic tax estimations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-500" />
                  <span>1 accounting integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-500" />
                  <span>Email support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
          <Card className="border-blue-600 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Professional</CardTitle>
                <div className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-semibold text-white">Popular</div>
              </div>
              <CardDescription>For growing businesses with more complex needs</CardDescription>
              <div className="pt-4">
                <span className="text-3xl font-bold">£29</span>
                <span className="text-muted-foreground"> / month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-500" />
                  <span>Everything in Starter</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-500" />
                  <span>Advanced tax estimations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-500" />
                  <span>3 accounting integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-500" />
                  <span>Tax-saving recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-500" />
                  <span>Priority email support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>For larger businesses with complex tax requirements</CardDescription>
              <div className="pt-4">
                <span className="text-3xl font-bold">£79</span>
                <span className="text-muted-foreground"> / month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-500" />
                  <span>Everything in Professional</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-500" />
                  <span>Unlimited accounting integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-500" />
                  <span>Custom tax reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-500" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-teal-500" />
                  <span>Phone and email support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
