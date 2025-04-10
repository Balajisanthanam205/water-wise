"use client"

import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, type TooltipProps } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data
const dailyData = [
  { name: "Mon", usage: 120 },
  { name: "Tue", usage: 132 },
  { name: "Wed", usage: 101 },
  { name: "Thu", usage: 134 },
  { name: "Fri", usage: 90 },
  { name: "Sat", usage: 230 },
  { name: "Sun", usage: 220 },
]

const weeklyData = [
  { name: "Week 1", usage: 800 },
  { name: "Week 2", usage: 920 },
  { name: "Week 3", usage: 880 },
  { name: "Week 4", usage: 950 },
]

const monthlyData = [
  { name: "Jan", usage: 4200 },
  { name: "Feb", usage: 3800 },
  { name: "Mar", usage: 4100 },
  { name: "Apr", usage: 3900 },
  { name: "May", usage: 4300 },
  { name: "Jun", usage: 5200 },
]

type TimeRange = "daily" | "weekly" | "monthly"

export function UsageChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("daily")

  const getData = () => {
    switch (timeRange) {
      case "daily":
        return dailyData
      case "weekly":
        return weeklyData
      case "monthly":
        return monthlyData
      default:
        return dailyData
    }
  }

  const getUnit = () => {
    return timeRange === "daily" ? "L" : timeRange === "weekly" ? "L" : "L"
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-sm text-muted-foreground">{`Usage: ${payload[0].value} ${getUnit()}`}</p>
        </div>
      )
    }

    return null
  }

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Water Usage</CardTitle>
          <CardDescription>Your water consumption over time</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[300px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={getData()}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-xs text-muted-foreground" tickLine={false} axisLine={false} />
            <YAxis
              className="text-xs text-muted-foreground"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value} ${getUnit()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="usage"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

