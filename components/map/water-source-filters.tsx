"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const sourceTypes = [
  { id: "lake", label: "Lake" },
  { id: "tank", label: "Tank" },
  { id: "borewell", label: "Borewell" },
  { id: "river", label: "River" },
  { id: "tap", label: "Tap" },
]

const formSchema = z.object({
  types: z.array(z.string()),
  quality: z.string(),
  cost: z.string(),
})

type FiltersFormValues = z.infer<typeof formSchema>

interface WaterSourceFiltersProps {
  onApplyFilters: (filters: FiltersFormValues) => void
}

export function WaterSourceFilters({ onApplyFilters }: WaterSourceFiltersProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FiltersFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      types: [],
      quality: "all",
      cost: "all",
    },
  })

  function onSubmit(values: FiltersFormValues) {
    setIsSubmitting(true)
    onApplyFilters(values)
    setTimeout(() => {
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <FormField
          control={form.control}
          name="types"
          render={() => (
            <FormItem>
              <FormLabel className="text-base">Source Type</FormLabel>
              <div className="mt-2 space-y-2">
                {sourceTypes.map((type) => (
                  <FormField
                    key={type.id}
                    control={form.control}
                    name="types"
                    render={({ field }) => {
                      return (
                        <FormItem key={type.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(type.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, type.id])
                                  : field.onChange(field.value?.filter((value) => value !== type.id))
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{type.label}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />

        <Separator />

        <FormField
          control={form.control}
          name="quality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Water Quality</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quality level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">All Qualities</SelectItem>
                  <SelectItem value="high">High Quality (80-100)</SelectItem>
                  <SelectItem value="medium">Medium Quality (60-79)</SelectItem>
                  <SelectItem value="low">Low Quality (0-59)</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cost" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="free">Free Only</SelectItem>
                  <SelectItem value="paid">Paid Only</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Applying..." : "Apply Filters"}
        </Button>
      </form>
    </Form>
  )
}

