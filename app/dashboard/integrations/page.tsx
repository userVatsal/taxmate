import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { IntegrationsList } from "@/components/integrations-list"

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">Connect your accounting software and financial services</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Accounting Software</CardTitle>
            <CardDescription>Connect your accounting platform</CardDescription>
          </CardHeader>
          <CardContent>
            <IntegrationsList
              type="accounting"
              integrations={[
                {
                  id: "xero",
                  name: "Xero",
                  description: "Connect your Xero account",
                  connected: true,
                },
                {
                  id: "quickbooks",
                  name: "QuickBooks",
                  description: "Connect your QuickBooks account",
                  connected: false,
                },
                {
                  id: "sage",
                  name: "Sage",
                  description: "Connect your Sage account",
                  connected: false,
                },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Banking</CardTitle>
            <CardDescription>Connect your bank accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <IntegrationsList
              type="banking"
              integrations={[
                {
                  id: "plaid",
                  name: "Plaid",
                  description: "Connect your bank accounts via Plaid",
                  connected: false,
                },
                {
                  id: "truelayer",
                  name: "TrueLayer",
                  description: "Connect your bank accounts via TrueLayer",
                  connected: false,
                },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>HMRC</CardTitle>
            <CardDescription>Connect to HMRC for MTD compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <IntegrationsList
              type="hmrc"
              integrations={[
                {
                  id: "mtd-vat",
                  name: "MTD for VAT",
                  description: "Connect to HMRC for VAT submissions",
                  connected: true,
                },
                {
                  id: "mtd-itsa",
                  name: "MTD for Income Tax",
                  description: "Connect to HMRC for Income Tax",
                  connected: false,
                },
              ]}
            />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>API Access</CardTitle>
          <CardDescription>Manage your API keys and access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Production API Key</h3>
                  <p className="text-sm text-muted-foreground">Use this key for production environments</p>
                </div>
                <Button variant="outline">Generate Key</Button>
              </div>
            </div>
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Development API Key</h3>
                  <p className="text-sm text-muted-foreground">Use this key for testing and development</p>
                </div>
                <Button variant="outline">Generate Key</Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">API documentation is available in the developer portal.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
