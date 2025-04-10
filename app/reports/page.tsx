"use client"

import { useState } from "react"
import { Download, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data
const monthlyData = [
  { name: "Jan", usage: 4200 },
  { name: "Feb", usage: 3800 },
  { name: "Mar", usage: 4100 },
  { name: "Apr", usage: 3900 },
  { name: "May", usage: 4300 },
  { name: "Jun", usage: 5200 },
  { name: "Jul", usage: 5800 },
  { name: "Aug", usage: 5100 },
  { name: "Sep", usage: 4700 },
  { name: "Oct", usage: 4200 },
  { name: "Nov", usage: 3900 },
  { name: "Dec", usage: 4100 },
]

const locationData = [
  { name: "Kitchen", value: 35 },
  { name: "Bathroom", value: 40 },
  { name: "Garden", value: 15 },
  { name: "Laundry", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const seasonalData = [
  {
    name: "Winter",
    "2022": 3800,
    "2023": 4100,
  },
  {
    name: "Spring",
    "2022": 4200,
    "2023": 4500,
  },
  {
    name: "Summer",
    "2022": 5800,
    "2023": 5200,
  },
  {
    name: "Fall",
    "2022": 4300,
    "2023": 4000,
  },
]

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("year")

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Usage Reports</h2>
          <p className="text-muted-foreground">View and analyze your water usage data</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Water Usage</CardTitle>
                <CardDescription>Your water consumption over the past year</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs text-muted-foreground" />
                    <YAxis
                      className="text-xs text-muted-foreground"
                      label={{
                        value: "Usage (L)",
                        angle: -90,
                        position: "insideLeft",
                        className: "text-xs text-muted-foreground",
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="usage" name="Water Usage (L)" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage by Location</CardTitle>
                <CardDescription>Distribution of water usage across different areas</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={locationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {locationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Available Reports</CardTitle>
                <CardDescription>Download detailed reports for your records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Monthly Summary", "Quarterly Analysis", "Annual Report"].map((report, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{report}</p>
                          <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Trends</CardTitle>
              <CardDescription>Compare water usage patterns across different seasons</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={seasonalData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs text-muted-foreground" />
                  <YAxis
                    className="text-xs text-muted-foreground"
                    label={{
                      value: "Usage (L)",
                      angle: -90,
                      position: "insideLeft",
                      className: "text-xs text-muted-foreground",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="2022" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="2023" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations">
          <div className="grid gap-6 md:grid-cols-2">
            {["Kitchen", "Bathroom", "Garden", "Laundry"].map((location) => (
              <Card key={location}>
                <CardHeader>
                  <CardTitle>{location} Usage</CardTitle>
                  <CardDescription>Water consumption in the {location.toLowerCase()}</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData.slice(0, 6).map((item) => ({
                        ...item,
                        usage: Math.floor(
                          item.usage *
                            (location === "Kitchen"
                              ? 0.35
                              : location === "Bathroom"
                                ? 0.4
                                : location === "Garden"
                                  ? 0.15
                                  : 0.1),
                        ),
                      }))}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-xs text-muted-foreground" />
                      <YAxis className="text-xs text-muted-foreground" />
                      <Tooltip />
                      <Bar
                        dataKey="usage"
                        name="Water Usage (L)"
                        fill={
                          location === "Kitchen"
                            ? "#0088FE"
                            : location === "Bathroom"
                              ? "#00C49F"
                              : location === "Garden"
                                ? "#FFBB28"
                                : "#FF8042"
                        }
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

