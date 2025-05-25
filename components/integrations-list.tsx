"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Integration {
  id: string
  name: string
  description: string
  connected: boolean
}

interface IntegrationsListProps {
  type: "accounting" | "banking" | "hmrc"
  integrations: Integration[]
}

export function IntegrationsList({ type, integrations }: IntegrationsListProps) {
  const [connectedState, setConnectedState] = useState<Record<string, boolean>>(
    integrations.reduce(
      (acc, integration) => {
        acc[integration.id] = integration.connected
        return acc
      },
      {} as Record<string, boolean>,
    ),
  )

  const handleToggle = (id: string) => {
    setConnectedState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="space-y-4">
      {integrations.map((integration) => (
        <div key={integration.id} className="flex items-center justify-between space-x-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center">
              <p className="font-medium">{integration.name}</p>
              {connectedState[integration.id] && (
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700">
                  Connected
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{integration.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            {connectedState[integration.id] ? (
              <Button variant="outline" size="sm" onClick={() => handleToggle(integration.id)}>
                Disconnect
              </Button>
            ) : (
              <Button size="sm" onClick={() => handleToggle(integration.id)}>
                Connect
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
