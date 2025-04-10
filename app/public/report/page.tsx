"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Camera, MapPin, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
  type: z.string({
    required_error: "Please select a source type",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters",
    })
    .max(500, {
      message: "Description must not exceed 500 characters",
    }),
  image: z.string().optional(),
  isFree: z.boolean().default(true),
  useGPS: z.boolean().default(true),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address",
    })
    .optional()
    .or(z.literal("")),
  isVolunteer: z.boolean().default(false),
  organizationName: z.string().optional(),
})

export default function ReportPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      description: "",
      image: "",
      isFree: true,
      useGPS: true,
      latitude: "",
      longitude: "",
      email: "",
      isVolunteer: false,
      organizationName: "",
    },
  })

  const watchUseGPS = form.watch("useGPS")
  const watchIsVolunteer = form.watch("isVolunteer")

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Water source submitted",
        description: "Thank you for contributing to our water source database.",
      })
      form.reset()
      setImagePreview(null)
    }, 1500)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("latitude", position.coords.latitude.toString())
          form.setValue("longitude", position.coords.longitude.toString())
          toast({
            title: "Location detected",
            description: "Your current location has been added to the form.",
          })
        },
        () => {
          toast({
            title: "Location error",
            description: "Unable to get your current location.",
            variant: "destructive",
          })
        },
      )
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Report a Water Source</h1>
          <p className="mt-2 text-muted-foreground">
            Help others find safe water by adding a new source to our database
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Central Park Lake, Community Tank" {...field} />
                      </FormControl>
                      <FormDescription>A descriptive name for the water source</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a source type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="lake">Lake</SelectItem>
                          <SelectItem value="tank">Tank</SelectItem>
                          <SelectItem value="borewell">Borewell</SelectItem>
                          <SelectItem value="river">River</SelectItem>
                          <SelectItem value="tap">Tap</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe the water source, its condition, and any other relevant details..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFree"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Free Access</FormLabel>
                        <FormDescription>Is this water source free to access?</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Source Image</FormLabel>
                      <FormDescription>Upload a clear image of the water source</FormDescription>
                      <FormControl>
                        <div className="mt-2 flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="gap-2"
                            onClick={() => document.getElementById("image-upload")?.click()}
                          >
                            <Upload className="h-4 w-4" />
                            Upload Image
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="gap-2"
                            onClick={() => {
                              // In a real app, this would trigger the device camera
                              document.getElementById("image-upload")?.click()
                            }}
                          >
                            <Camera className="h-4 w-4" />
                            Take Photo
                          </Button>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                const reader = new FileReader()
                                reader.onloadend = () => {
                                  setImagePreview(reader.result as string)
                                  field.onChange(file.name) // Update the form field value
                                }
                                reader.readAsDataURL(file)
                              }
                            }}
                          />
                        </div>
                      </FormControl>
                      {imagePreview && (
                        <div className="mt-4 overflow-hidden rounded-md border">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="h-48 w-full object-cover"
                          />
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="useGPS"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Use Current Location</FormLabel>
                        <FormDescription>Use your device's GPS to set the location</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {watchUseGPS ? (
                  <div className="flex items-center gap-4">
                    <Button type="button" variant="outline" className="gap-2" onClick={getCurrentLocation}>
                      <MapPin className="h-4 w-4" />
                      Get Current Location
                    </Button>
                    <FormDescription>Click to detect your current location</FormDescription>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="latitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 40.7128" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="longitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longitude</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., -74.0060" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" type="email" {...field} />
                      </FormControl>
                      <FormDescription>We'll only use this to verify your submission if needed</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isVolunteer"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">I am a volunteer/NGO</FormLabel>
                        <FormDescription>Are you submitting this as part of an organization?</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {watchIsVolunteer && (
                  <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Water Access Initiative" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Water Source"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

