"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Award, Building, Calendar, CheckCircle, MapPin, MessageSquare, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z.string().optional(),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters",
  }),
  organization: z.string().optional(),
  experience: z.string().optional(),
  motivation: z
    .string()
    .min(20, {
      message: "Please tell us a bit more about your motivation",
    })
    .max(500, {
      message: "Motivation must not exceed 500 characters",
    }),
  availability: z.string({
    required_error: "Please select your availability",
  }),
})

// Sample data for partner organizations
const partnerOrganizations = [
  {
    id: 1,
    name: "Clean Water Initiative",
    logo: "/placeholder.svg?height=80&width=80",
    description:
      "Working to provide clean water access to underserved communities through infrastructure development and education.",
    website: "https://example.com/cwi",
  },
  {
    id: 2,
    name: "Water Quality Alliance",
    logo: "/placeholder.svg?height=80&width=80",
    description:
      "A coalition of scientists and volunteers monitoring water quality and advocating for clean water policies.",
    website: "https://example.com/wqa",
  },
  {
    id: 3,
    name: "Community Water Monitoring Network",
    logo: "/placeholder.svg?height=80&width=80",
    description:
      "Training citizens to collect and analyze water samples, creating a community-based monitoring network.",
    website: "https://example.com/cwmn",
  },
]

// Sample data for volunteer leaderboard
const topVolunteers = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    contributions: 47,
    location: "New York, NY",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    contributions: 38,
    location: "San Francisco, CA",
  },
  {
    id: 3,
    name: "Aisha Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    contributions: 32,
    location: "Chicago, IL",
  },
  {
    id: 4,
    name: "Carlos Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    contributions: 29,
    location: "Miami, FL",
  },
  {
    id: 5,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    contributions: 24,
    location: "Seattle, WA",
  },
]

// Sample data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Water Quality Testing Workshop",
    date: "May 15, 2025",
    location: "Central Community Center",
    description: "Learn how to test water quality using simple tools and contribute to our database.",
  },
  {
    id: 2,
    title: "Source Mapping Expedition",
    date: "May 22, 2025",
    location: "Eastern District",
    description: "Join us as we map and document water sources in underserved areas.",
  },
  {
    id: 3,
    title: "Water Safety Education Day",
    date: "June 5, 2025",
    location: "Public Library",
    description: "Help educate community members about water safety and treatment methods.",
  },
]

export default function CommunityPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      organization: "",
      experience: "",
      motivation: "",
      availability: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Application submitted",
        description: "Thank you for your interest in volunteering!",
      })
      form.reset()
    }, 1500)
  }

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Join Our Community</h1>
        <p className="mt-2 text-muted-foreground">
          Become part of our network of volunteers and organizations working to improve water accessibility
        </p>
      </div>

      <Tabs defaultValue="volunteer" className="space-y-8">
        <TabsList className="mx-auto grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="volunteer">
          <div className="mx-auto max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle>Become a Volunteer</CardTitle>
                <CardDescription>
                  Join our team of dedicated volunteers helping to map and monitor water sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Map Water Sources</h3>
                      <p className="text-sm text-muted-foreground">
                        Help identify and document water sources in your community
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Verify Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Confirm the accuracy of reported water sources and quality data
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Community Education</h3>
                      <p className="text-sm text-muted-foreground">Teach others about water safety and conservation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Participate in Events</h3>
                      <p className="text-sm text-muted-foreground">
                        Join water testing workshops and community outreach activities
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, State/Province" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="organization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Company or organization name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="availability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Availability</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select availability" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="weekends">Weekends only</SelectItem>
                                <SelectItem value="weekdays">Weekdays only</SelectItem>
                                <SelectItem value="evenings">Evenings only</SelectItem>
                                <SelectItem value="flexible">Flexible schedule</SelectItem>
                                <SelectItem value="limited">Limited availability</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relevant Experience (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about any relevant experience you have (water testing, community organizing, etc.)"
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
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Why do you want to volunteer?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us why you're interested in joining our water monitoring community"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Your motivation helps us understand how to best involve you in our community.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-bold tracking-tight">Upcoming Volunteer Events</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <Card key={event.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <Button variant="outline" size="sm" className="mt-2 w-full">
                          Register
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="partners">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold tracking-tight">Our Partner Organizations</h2>
              <p className="mt-2 text-muted-foreground">
                We collaborate with these organizations to improve water accessibility and quality
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {partnerOrganizations.map((org) => (
                <Card key={org.id}>
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                    <div className="h-16 w-16 overflow-hidden rounded-md">
                      <img src={org.logo || "/placeholder.svg"} alt={org.name} className="h-full w-full object-cover" />
                    </div>
                    <CardTitle className="text-lg">{org.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{org.description}</p>
                    <Button variant="link" className="mt-2 h-auto p-0 text-primary" asChild>
                      <a href={org.website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 rounded-lg border bg-card p-6">
              <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
                <div className="rounded-full bg-primary/10 p-3">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Become a Partner Organization</h3>
                  <p className="mt-2 text-muted-foreground">
                    Is your organization interested in joining our network? We're always looking for new partners to
                    help expand our water monitoring and accessibility initiatives.
                  </p>
                  <Button className="mt-4">Contact Us</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="leaderboard">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold tracking-tight">Volunteer Leaderboard</h2>
              <p className="mt-2 text-muted-foreground">Recognizing our most active community contributors</p>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Top Contributors
                </CardTitle>
                <CardDescription>Based on number of water sources reported and verified</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topVolunteers.map((volunteer, index) => (
                    <div key={volunteer.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {index + 1}
                        </div>
                        <Avatar>
                          <AvatarImage src={volunteer.avatar} />
                          <AvatarFallback>
                            {volunteer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{volunteer.name}</p>
                          <p className="text-xs text-muted-foreground">
                            <MapPin className="mr-1 inline-block h-3 w-3" />
                            {volunteer.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{volunteer.contributions}</span>
                        <span className="text-sm text-muted-foreground">contributions</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <h3 className="text-xl font-semibold">Want to join the board?</h3>
              <p className="mt-2 text-muted-foreground">
                Start contributing by reporting water sources and helping verify existing data
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <Button asChild>
                  <a href="/public/report">Report a Source</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/public/map">Explore the Map</a>
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

