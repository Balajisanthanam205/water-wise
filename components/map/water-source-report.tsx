"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  issueType: z.string({
    required_error: "Please select an issue type",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters",
    })
    .max(500, {
      message: "Description must not exceed 500 characters",
    }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address",
    })
    .optional()
    .or(z.literal("")),
})

interface WaterSourceReportProps {
  sourceId: string
}

export function WaterSourceReport({ sourceId }: WaterSourceReportProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issueType: "",
      description: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Report submitted",
        description: "Thank you for helping improve our water source data.",
      })
      form.reset()
    }, 1500)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <FormField
          control={form.control}
          name="issueType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an issue type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="contamination">Water Contamination</SelectItem>
                  <SelectItem value="availability">Low/No Availability</SelectItem>
                  <SelectItem value="access">Access Problems</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure Damage</SelectItem>
                  <SelectItem value="incorrect">Incorrect Information</SelectItem>
                  <SelectItem value="other">Other Issue</SelectItem>
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
                <Textarea placeholder="Please describe the issue in detail..." className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Include any relevant details that might help us address the issue.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" type="email" {...field} />
              </FormControl>
              <FormDescription>We'll only use this to follow up on your report if necessary.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </Button>
      </form>
    </Form>
  )
}

