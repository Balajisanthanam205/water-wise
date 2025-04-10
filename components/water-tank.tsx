"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface WaterTankProps {
  level: number // 0-100
  capacity: number // in liters
  name: string
  className?: string
}

export function WaterTank({ level, capacity, name, className }: WaterTankProps) {
  const [animatedLevel, setAnimatedLevel] = useState(0)

  // Animate the water level
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(level)
    }, 500)
    return () => clearTimeout(timer)
  }, [level])

  // Calculate status based on level
  const getStatus = () => {
    if (level <= 20) return "critical"
    if (level <= 40) return "low"
    if (level >= 90) return "full"
    return "normal"
  }

  const status = getStatus()
  const statusColors = {
    critical: "bg-red-500",
    low: "bg-amber-500",
    normal: "bg-blue-500",
    full: "bg-green-500",
  }

  return (
    <div className={cn("flex flex-col items-center space-y-2 rounded-lg border p-4", className)}>
      <h3 className="text-lg font-medium">{name}</h3>
      <div className="relative h-48 w-full max-w-[120px] rounded-b-lg border-2 border-t-0 border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-800">
        {/* Tank top */}
        <div className="absolute -top-2 left-1/2 h-2 w-16 -translate-x-1/2 rounded-t-sm border-2 border-gray-300 bg-gray-200 dark:border-gray-600 dark:bg-gray-700"></div>

        {/* Water level */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out",
            statusColors[status as keyof typeof statusColors],
          )}
          style={{ height: `${animatedLevel}%` }}
        ></div>

        {/* Level markers */}
        {[25, 50, 75].map((marker) => (
          <div
            key={marker}
            className="absolute left-0 right-0 border-t border-dashed border-gray-400 dark:border-gray-500"
            style={{ top: `${100 - marker}%` }}
          >
            <span className="absolute -left-7 -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400">
              {marker}%
            </span>
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold">{level}%</p>
        <p className="text-sm text-muted-foreground">
          {Math.round((level / 100) * capacity)} / {capacity} L
        </p>
      </div>
    </div>
  )
}

