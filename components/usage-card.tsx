import type React from "react"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UsageCardProps {
  title: string
  value: string
  change: number
  unit: string
  icon: React.ReactNode
  className?: string
}

export function UsageCard({ title, value, change, unit, icon, className }: UsageCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value} <span className="text-sm font-normal">{unit}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {change > 0 ? (
            <span className="flex items-center text-red-500">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              {change}% from last week
            </span>
          ) : (
            <span className="flex items-center text-green-500">
              <ArrowDownIcon className="mr-1 h-3 w-3" />
              {Math.abs(change)}% from last week
            </span>
          )}
        </p>
      </CardContent>
    </Card>
  )
}

