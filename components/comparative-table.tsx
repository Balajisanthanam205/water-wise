"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface UsageData {
  place: string
  recommended: number
  actual: number
  feedback: "Good" | "Overused" | "Underused"
}

const usageData: UsageData[] = [
  {
    place: "Kitchen",
    recommended: 20,
    actual: 35,
    feedback: "Overused",
  },
  {
    place: "Bathroom",
    recommended: 40,
    actual: 38,
    feedback: "Good",
  },
  {
    place: "Garden",
    recommended: 30,
    actual: 15,
    feedback: "Underused",
  },
  {
    place: "Laundry",
    recommended: 25,
    actual: 28,
    feedback: "Good",
  },
  {
    place: "Outdoor",
    recommended: 15,
    actual: 22,
    feedback: "Overused",
  },
]

export function ComparativeTable() {
  const [data] = useState<UsageData[]>(usageData)

  const getFeedbackColor = (feedback: UsageData["feedback"]) => {
    switch (feedback) {
      case "Good":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "Overused":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      case "Underused":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Comparison</CardTitle>
        <CardDescription>Compare your actual water usage with recommended levels</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Place</TableHead>
              <TableHead className="text-right">Recommended (L)</TableHead>
              <TableHead className="text-right">Actual (L)</TableHead>
              <TableHead className="text-right">Feedback</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.place}>
                <TableCell className="font-medium">{row.place}</TableCell>
                <TableCell className="text-right">{row.recommended}</TableCell>
                <TableCell className="text-right">{row.actual}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className={cn(getFeedbackColor(row.feedback))}>
                    {row.feedback}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

