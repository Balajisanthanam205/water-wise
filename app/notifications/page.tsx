"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Mail, MessageSquare, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const notificationFormSchema = z.object({
  email: z.boolean().default(true),
  sms: z.boolean().default(false),
  push: z.boolean().default(true),
  emailAddress: z.string().email().optional().or(z.literal("")),
  phoneNumber: z.string().optional().or(z.literal("")),
  overuseThreshold: z.coerce.number().min(0).max(100).default(20),
  dailySummary: z.boolean().default(true),
  weeklySummary: z.boolean().default(true),
  monthlySummary: z.boolean().default(true),
  leakAlert: z.boolean().default(true),
  tankLevelAlert: z.boolean().default(true),
  tankLevelThreshold: z.coerce.number().min(0).max(100).default(20),
  notificationTime: z.string().default("09:00"),
})

type NotificationFormValues = z.infer<typeof notificationFormSchema>

export default function NotificationsPage() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      email: true,
      sms: false,
      push: true,
      emailAddress: "user@example.com",
      phoneNumber: "",
      overuseThreshold: 20,
      dailySummary: true,
      weeklySummary: true,
      monthlySummary: true,
      leakAlert: true,
      tankLevelAlert: true,
      tankLevelThreshold: 20,
      notificationTime: "09:00",
    },
  })

  function onSubmit(data: NotificationFormValues) {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
    }, 1000)
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Notification Settings</h2>
        <p className="text-muted-foreground">Manage how and when you receive alerts and updates</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="channels" className="space-y-6">
            <TabsList>
              <TabsTrigger value="channels">Notification Channels</TabsTrigger>
              <TabsTrigger value="alerts">Alert Settings</TabsTrigger>
              <TabsTrigger value="summaries">Summary Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="channels">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Channels</CardTitle>
                  <CardDescription>Choose how you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <FormLabel className="text-base">Email Notifications</FormLabel>
                            </div>
                            <FormDescription>Receive notifications via email</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.watch("email") && (
                      <FormField
                        control={form.control}
                        name="emailAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="sms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4 text-muted-foreground" />
                              <FormLabel className="text-base">SMS Notifications</FormLabel>
                            </div>
                            <FormDescription>Receive notifications via SMS</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.watch("sms") && (
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="push"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <Smartphone className="h-4 w-4 text-muted-foreground" />
                              <FormLabel className="text-base">Push Notifications</FormLabel>
                            </div>
                            <FormDescription>Receive push notifications on your devices</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts">
              <Card>
                <CardHeader>
                  <CardTitle>Alert Settings</CardTitle>
                  <CardDescription>Configure when you want to receive alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="overuseThreshold"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Overuse Alert Threshold (%)</FormLabel>
                          <FormDescription>
                            Alert me when usage exceeds recommended levels by this percentage
                          </FormDescription>
                          <FormControl>
                            <div className="flex items-center gap-4">
                              <Input type="number" {...field} className="w-24" />
                              <span>%</span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="leakAlert"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Leak Detection Alerts</FormLabel>
                            <FormDescription>Notify me when a potential leak is detected</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tankLevelAlert"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Tank Level Alerts</FormLabel>
                            <FormDescription>Notify me when tank level falls below threshold</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.watch("tankLevelAlert") && (
                      <FormField
                        control={form.control}
                        name="tankLevelThreshold"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tank Level Threshold (%)</FormLabel>
                            <FormDescription>Alert me when tank level falls below this percentage</FormDescription>
                            <FormControl>
                              <div className="flex items-center gap-4">
                                <Input type="number" {...field} className="w-24" />
                                <span>%</span>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="summaries">
              <Card>
                <CardHeader>
                  <CardTitle>Summary Reports</CardTitle>
                  <CardDescription>Configure your regular water usage reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="notificationTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Notification Time</FormLabel>
                          <FormDescription>When should we send your summary reports?</FormDescription>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="06:00">6:00 AM</SelectItem>
                              <SelectItem value="09:00">9:00 AM</SelectItem>
                              <SelectItem value="12:00">12:00 PM</SelectItem>
                              <SelectItem value="18:00">6:00 PM</SelectItem>
                              <SelectItem value="21:00">9:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dailySummary"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Daily Summary</FormLabel>
                            <FormDescription>Receive a daily summary of your water usage</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weeklySummary"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Weekly Summary</FormLabel>
                            <FormDescription>Receive a weekly summary of your water usage</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="monthlySummary"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Monthly Summary</FormLabel>
                            <FormDescription>Receive a monthly summary of your water usage</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

