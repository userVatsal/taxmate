import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Profile settings */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Profile Information
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Label htmlFor="first-name">First name</Label>
                <div className="mt-1">
                  <Input
                    type="text"
                    name="first-name"
                    id="first-name"
                    defaultValue="John"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="last-name">Last name</Label>
                <div className="mt-1">
                  <Input
                    type="text"
                    name="last-name"
                    id="last-name"
                    defaultValue="Doe"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <Label htmlFor="email">Email address</Label>
                <div className="mt-1">
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue="john@example.com"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="phone">Phone number</Label>
                <div className="mt-1">
                  <Input
                    type="tel"
                    name="phone"
                    id="phone"
                    defaultValue="+44 7123 456789"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <Button>Save changes</Button>
          </div>
        </div>

        {/* Tax settings */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Tax Settings
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Label htmlFor="tax-year">Tax Year</Label>
                <div className="mt-1">
                  <select
                    id="tax-year"
                    name="tax-year"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    defaultValue="2023/24"
                  >
                    <option>2023/24</option>
                    <option>2022/23</option>
                    <option>2021/22</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="tax-regime">Tax Regime</Label>
                <div className="mt-1">
                  <select
                    id="tax-regime"
                    name="tax-regime"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    defaultValue="self-employed"
                  >
                    <option>Self-employed</option>
                    <option>Limited Company</option>
                    <option>Partnership</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <Label htmlFor="utr">Unique Taxpayer Reference (UTR)</Label>
                <div className="mt-1">
                  <Input
                    type="text"
                    name="utr"
                    id="utr"
                    placeholder="Enter your 10-digit UTR"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <Button>Save changes</Button>
          </div>
        </div>

        {/* Notification settings */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Notification Preferences
            </h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="email-notifications"
                    name="email-notifications"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    defaultChecked
                  />
                </div>
                <div className="ml-3 text-sm">
                  <Label htmlFor="email-notifications">Email notifications</Label>
                  <p className="text-gray-500">
                    Receive email notifications about important tax deadlines and updates.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="sms-notifications"
                    name="sms-notifications"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <Label htmlFor="sms-notifications">SMS notifications</Label>
                  <p className="text-gray-500">
                    Receive SMS notifications for urgent tax-related matters.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <Button>Save changes</Button>
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Danger Zone
            </h2>
            <div className="mt-6">
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Delete account
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        Once you delete your account, there is no going back. Please
                        be certain.
                      </p>
                    </div>
                    <div className="mt-4">
                      <Button className="bg-red-50 text-red-700 hover:bg-red-100">
                        Delete account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 