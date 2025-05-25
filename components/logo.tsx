import { PoundSterling } from "lucide-react"

export function Logo() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-teal-500 to-blue-600">
      <PoundSterling className="h-6 w-6 text-white" />
    </div>
  )
}
