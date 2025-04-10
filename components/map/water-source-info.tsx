"use client"

import { useState } from "react"
import type { WaterSource } from "@/components/map/water-source-map"
import { formatDistanceToNow } from "date-fns"
import { AlertTriangle, ChevronDown, Droplet, ExternalLink, Flag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { WaterSourceReport } from "@/components/map/water-source-report"
import { cn } from "@/lib/utils"

interface WaterSourceInfoProps {
  source: WaterSource
  onClose: () => void
}

export function WaterSourceInfo({ source, onClose }: WaterSourceInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getQualityColor = (quality: number) => {
    if (quality >= 80) return "text-green-500"
    if (quality >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getQualityText = (quality: number) => {
    if (quality >= 80) return "Safe to use"
    if (quality >= 60) return "Use with caution"
    return "Not recommended"
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "lake":
        return "Lake"
      case "tank":
        return "Tank"
      case "borewell":
        return "Borewell"
      case "river":
        return "River"
      case "tap":
        return "Tap"
      default:
        return type
    }
  }

  return (
    <div
      className={cn("bg-card transition-all duration-300 ease-in-out", isExpanded ? "h-[80vh]" : "h-auto max-h-[40vh]")}
    >
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">{source.name}</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsExpanded(!isExpanded)}>
            <ChevronDown className={cn("h-5 w-5 transition-transform", isExpanded ? "rotate-180" : "")} />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="overflow-auto p-4">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="aspect-video overflow-hidden rounded-lg bg-muted">
              <img
                src={source.image || "/placeholder.svg?height=300&width=400"}
                alt={source.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline">{getTypeLabel(source.type)}</Badge>
              {source.isFree ? (
                <Badge variant="outline" className="bg-green-100">
                  Free
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-blue-100">
                  Paid
                </Badge>
              )}
              <Badge variant="outline">
                Updated{" "}
                {formatDistanceToNow(new Date(source.lastUpdated), {
                  addSuffix: true,
                })}
              </Badge>
            </div>

            <p className="mt-4 text-sm">{source.description}</p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-medium">Water Quality</h3>
              <div className="flex items-center gap-2">
                <Progress value={source.quality} className="h-2" />
                <span className="text-sm font-medium">{source.quality}%</span>
              </div>
              <p className={cn("mt-1 flex items-center gap-1 text-sm", getQualityColor(source.quality))}>
                <Droplet className="h-4 w-4" />
                {getQualityText(source.quality)}
              </p>
            </div>

            {source.indicators && (
              <>
                <Separator />
                <div>
                  <h3 className="mb-2 font-medium">Water Indicators</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {source.indicators.color && (
                      <div>
                        <span className="text-muted-foreground">Color:</span> {source.indicators.color}
                      </div>
                    )}
                    {source.indicators.odor && (
                      <div>
                        <span className="text-muted-foreground">Odor:</span> {source.indicators.odor}
                      </div>
                    )}
                    {source.indicators.flow && (
                      <div>
                        <span className="text-muted-foreground">Flow:</span> {source.indicators.flow}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            <Separator />

            <div className="flex flex-col gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="w-full gap-2">
                    <Flag className="h-4 w-4" />
                    Report Issue
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Report an Issue</SheetTitle>
                  </SheetHeader>
                  <WaterSourceReport sourceId={source.id} />
                </SheetContent>
              </Sheet>

              <Button variant="outline" className="w-full gap-2">
                <ExternalLink className="h-4 w-4" />
                Directions
              </Button>

              {source.quality < 60 && (
                <div className="mt-2 flex items-start gap-2 rounded-md bg-red-100 p-3 text-sm dark:bg-red-900/20">
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-red-600 dark:text-red-400" />
                  <div>
                    <p className="font-medium text-red-600 dark:text-red-400">Warning</p>
                    <p className="text-red-700 dark:text-red-300">
                      This water source is not recommended for drinking or cooking. Use only after proper treatment.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

