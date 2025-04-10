"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"

const tankFormSchema = z.object({
  name: z.string().min(2, {
    message: "Tank name must be at least 2 characters.",
  }),
  height: z.coerce.number().min(1, {
    message: "Height must be at least 1 cm.",
  }),
  width: z.coerce.number().min(1, {
    message: "Width must be at least 1 cm.",
  }),
  depth: z.coerce.number().min(1, {
    message: "Depth must be at least 1 cm.",
  }),
  floorLevel: z.coerce.number().min(0, {
    message: "Floor level must be at least 0 cm.",
  }),
})

const tapFormSchema = z.object({
  name: z.string().min(2, {
    message: "Tap name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  pipeDiameter: z.coerce.number().min(0.1, {
    message: "Pipe diameter must be at least 0.1 cm.",
  }),
  isMonitored: z.boolean().default(true),
})

type TankFormValues = z.infer<typeof tankFormSchema>
type TapFormValues = z.infer<typeof tapFormSchema>

interface Tap {
  id: string
  name: string
  location: string
  pipeDiameter: number
  isMonitored: boolean
}

export default function SettingsPage() {
  const { toast } = useToast()
  const [taps, setTaps] = useState<Tap[]>([
    {
      id: "1",
      name: "Kitchen Sink",
      location: "Kitchen",
      pipeDiameter: 1.5,
      isMonitored: true,
    },
    {
      id: "2",
      name: "Bathroom Shower",
      location: "Bathroom",
      pipeDiameter: 2.0,
      isMonitored: true,
    },
    {
      id: "3",
      name: "Garden Hose",
      location: "Garden",
      pipeDiameter: 1.8,
      isMonitored: true,
    },
  ])

  // Tank form
  const tankForm = useForm<TankFormValues>({
    resolver: zodResolver(tankFormSchema),
    defaultValues: {
      name: "Main Water Tank",
      height: 200,
      width: 100,
      depth: 100,
      floorLevel: 10,
    },
  })

  // Tap form
  const tapForm = useForm<TapFormValues>({
    resolver: zodResolver(tapFormSchema),
    defaultValues: {
      name: "",
      location: "",
      pipeDiameter: 1.5,
      isMonitored: true,
    },
  })

  function onTankSubmit(data: TankFormValues) {
    toast({
      title: "Tank settings updated",
      description: "Your tank settings have been saved successfully.",
    })
  }

  function onTapSubmit(data: TapFormValues) {
    const newTap: Tap = {
      id: Date.now().toString(),
      ...data,
    }

    setTaps((prev) => [...prev, newTap])

    toast({
      title: "Tap added",
      description: `${data.name} has been added successfully.`,
    })

    tapForm.reset({
      name: "",
      location: "",
      pipeDiameter: 1.5,
      isMonitored: true,
    })
  }

  function deleteTap(id: string) {
    setTaps((prev) => prev.filter((tap) => tap.id !== id))

    toast({
      title: "Tap deleted",
      description: "The tap has been removed successfully.",
    })
  }

  function toggleTapMonitoring(id: string) {
    setTaps((prev) => prev.map((tap) => (tap.id === id ? { ...tap, isMonitored: !tap.isMonitored } : tap)))
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Tank & Tap Settings</h2>
        <p className="text-muted-foreground">Configure your water tanks and taps</p>
      </div>

      <Tabs defaultValue="tank" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tank">Tank Settings</TabsTrigger>
          <TabsTrigger value="taps">Tap Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="tank">
          <Card>
            <CardHeader>
              <CardTitle>Tank Configuration</CardTitle>
              <CardDescription>Configure your water tank dimensions and parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...tankForm}>
                <form onSubmit={tankForm.handleSubmit(onTankSubmit)} className="space-y-6">
                  <FormField
                    control={tankForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tank Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>A descriptive name for your water tank</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={tankForm.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={tankForm.control}
                      name="width"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Width (cm)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={tankForm.control}
                      name="depth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Depth (cm)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={tankForm.control}
                      name="floorLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Floor Level (cm)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormDescription>Distance from the ground to the tank bottom</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">Save Tank Settings</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="taps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Tap</CardTitle>
              <CardDescription>Configure a new tap for monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...tapForm}>
                <form onSubmit={tapForm.handleSubmit(onTapSubmit)} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={tapForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tap Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={tapForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a location" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Kitchen">Kitchen</SelectItem>
                              <SelectItem value="Bathroom">Bathroom</SelectItem>
                              <SelectItem value="Garden">Garden</SelectItem>
                              <SelectItem value="Laundry">Laundry</SelectItem>
                              <SelectItem value="Outdoor">Outdoor</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={tapForm.control}
                      name="pipeDiameter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pipe Diameter (cm)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={tapForm.control}
                      name="isMonitored"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Enable Monitoring</FormLabel>
                            <FormDescription>Track water usage for this tap</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit">Add Tap</Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Taps</CardTitle>
              <CardDescription>View and manage your configured taps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taps.map((tap) => (
                  <div key={tap.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <h4 className="font-medium">{tap.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {tap.location} • {tap.pipeDiameter} cm
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Switch checked={tap.isMonitored} onCheckedChange={() => toggleTapMonitoring(tap.id)} />
                      <Button variant="ghost" size="icon" onClick={() => deleteTap(tap.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

