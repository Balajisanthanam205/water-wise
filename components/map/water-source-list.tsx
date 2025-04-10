"use client"

import type { WaterSource } from "@/components/map/water-source-map"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface WaterSourceListProps {
  sources: WaterSource[]
  onSourceSelect: (source: WaterSource) => void
}

export function WaterSourceList({ sources, onSourceSelect }: WaterSourceListProps) {
  const getQualityColor = (quality: number) => {
    if (quality >= 80) return "bg-green-500 hover:bg-green-600"
    if (quality >= 60) return "bg-yellow-500 hover:bg-yellow-600"
    return "bg-red-500 hover:bg-red-600"
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
    <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
      <div className="space-y-4 pt-4">
        {sources.length === 0 ? (
          <div className="rounded-md border p-4 text-center text-muted-foreground">
            No water sources found matching your criteria.
          </div>
        ) : (
          sources.map((source) => (
            <div
              key={source.id}
              className="cursor-pointer rounded-lg border p-4 transition-all hover:bg-accent"
              onClick={() => onSourceSelect(source)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{source.name}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="outline">{getTypeLabel(source.type)}</Badge>
                    <Badge variant="outline" className={getQualityColor(source.quality)}>
                      {source.quality}% Safe
                    </Badge>
                    {source.isFree ? (
                      <Badge variant="outline" className="bg-green-100">
                        Free
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-blue-100">
                        Paid
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Updated{" "}
                {formatDistanceToNow(new Date(source.lastUpdated), {
                  addSuffix: true,
                })}
              </p>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  )
}

