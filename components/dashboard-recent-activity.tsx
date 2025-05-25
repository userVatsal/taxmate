export function DashboardRecentActivity() {
  const activities = [
    {
      id: 1,
      action: "VAT Return Submitted",
      date: "2 days ago",
      status: "success",
    },
    {
      id: 2,
      action: "Tax Estimation Updated",
      date: "3 days ago",
      status: "info",
    },
    {
      id: 3,
      action: "New Tax Saving Recommendation",
      date: "1 week ago",
      status: "warning",
    },
    {
      id: 4,
      action: "QuickBooks Integration Updated",
      date: "2 weeks ago",
      status: "info",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4">
          <div
            className={`h-2 w-2 rounded-full ${
              activity.status === "success"
                ? "bg-green-500"
                : activity.status === "warning"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
            }`}
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{activity.action}</span>
            <span className="text-xs text-muted-foreground">{activity.date}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
