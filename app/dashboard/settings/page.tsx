"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const [companyInfo, setCompanyInfo] = useState({
    name: user?.companyName || "",
    vatNumber: user?.vatNumber || "",
    address: "",
    phone: "",
    email: user?.email || "",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    deadlineReminders: true,
    paymentAlerts: true,
    taxUpdates: true,
  })

  const [integrations, setIntegrations] = useState({
    xero: false,
    quickbooks: false,
    plaid: false,
  })

  const handleCompanyInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement company info update
    console.log("Updating company info:", companyInfo)
  }

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleIntegrationChange = (key: keyof typeof integrations) => {
    setIntegrations(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your company information and preferences
        </p>
      </div>

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList>
          <TabsTrigger value="company">Company Information</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCompanyInfoSubmit} className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="vatNumber">VAT Number</Label>
                    <Input
                      id="vatNumber"
                      value={companyInfo.vatNumber}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, vatNumber: e.target.value })}
                      placeholder="Enter VAT number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Input
                      id="address"
                      value={companyInfo.address}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                      placeholder="Enter business address"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={companyInfo.phone}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={companyInfo.email}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={() => handleNotificationChange("emailNotifications")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Deadline Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminders for upcoming tax deadlines
                  </p>
                </div>
                <Switch
                  checked={notifications.deadlineReminders}
                  onCheckedChange={() => handleNotificationChange("deadlineReminders")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Payment Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts for payment due dates
                  </p>
                </div>
                <Switch
                  checked={notifications.paymentAlerts}
                  onCheckedChange={() => handleNotificationChange("paymentAlerts")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tax Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Stay informed about tax law changes
                  </p>
                </div>
                <Switch
                  checked={notifications.taxUpdates}
                  onCheckedChange={() => handleNotificationChange("taxUpdates")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Accounting Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Xero</Label>
                  <p className="text-sm text-muted-foreground">
                    Connect your Xero account
                  </p>
                </div>
                <Switch
                  checked={integrations.xero}
                  onCheckedChange={() => handleIntegrationChange("xero")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>QuickBooks</Label>
                  <p className="text-sm text-muted-foreground">
                    Connect your QuickBooks account
                  </p>
                </div>
                <Switch
                  checked={integrations.quickbooks}
                  onCheckedChange={() => handleIntegrationChange("quickbooks")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Plaid</Label>
                  <p className="text-sm text-muted-foreground">
                    Connect your bank accounts via Plaid
                  </p>
                </div>
                <Switch
                  checked={integrations.plaid}
                  onCheckedChange={() => handleIntegrationChange("plaid")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Your data is securely stored and encrypted. We never share your information with third parties without your consent.
        </AlertDescription>
      </Alert>
    </div>
  )
}
