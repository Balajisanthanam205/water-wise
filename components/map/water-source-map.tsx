"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Filter, Layers, List, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { WaterSourceFilters } from "@/components/map/water-source-filters"
import { WaterSourceList } from "@/components/map/water-source-list"
import { WaterSourceInfo } from "@/components/map/water-source-info"
import { cn } from "@/lib/utils"

// Replace the mapboxgl.accessToken line with this conditional token setup
// In a real application, you would use an environment variable
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "pk.eyJ1IjoibmlsYXZhbnNqIiwiYSI6ImNtOWJrNDQzczA5dTAya3F3YWd2Y3FjM2UifQ.FlSPtvEJVBpFZsv5xFw1SA"
//mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '<pk.eyJ1IjoibmlsYXZhbnNqIiwiYSI6ImNtOWJrNDQzczA5dTAya3F3YWd2Y3FjM2UifQ.FlSPtvEJVBpFZsv5xFw1SA>';



export type WaterSource = {
  id: string
  name: string
  type: "lake" | "tank" | "borewell" | "river" | "tap"
  coordinates: [number, number]
  quality: number // 0-100
  isFree: boolean
  lastUpdated: string
  description?: string
  image?: string
  indicators?: {
    color?: string
    odor?: string
    flow?: string
  }
}

// Sample data
const sampleSources: WaterSource[] = [
  {
    id: "1",
    name: "Central Park Lake",
    type: "lake",
    coordinates: [-73.9665, 40.7812],
    quality: 85,
    isFree: true,
    lastUpdated: "2025-04-05T10:30:00Z",
    description: "Natural lake with good water quality. Suitable for non-drinking purposes.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Clear",
      odor: "None",
      flow: "Moderate",
    },
  },
  {
    id: "2",
    name: "Downtown Community Tank",
    type: "tank",
    coordinates: [-73.9845, 40.7484],
    quality: 95,
    isFree: false,
    lastUpdated: "2025-04-06T14:15:00Z",
    description: "Maintained by the city. Clean drinking water available for a small fee.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Clear",
      odor: "None",
      flow: "High",
    },
  },
  {
    id: "3",
    name: "Riverside Borewell",
    type: "borewell",
    coordinates: [-73.9754, 40.7614],
    quality: 70,
    isFree: true,
    lastUpdated: "2025-04-04T09:45:00Z",
    description: "Deep borewell with slightly mineral-rich water. Safe for most uses.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Slightly Yellow",
      odor: "Mineral",
      flow: "Low",
    },
  },
  {
    id: "4",
    name: "East River Access Point",
    type: "river",
    coordinates: [-73.9664, 40.758],
    quality: 60,
    isFree: true,
    lastUpdated: "2025-04-05T16:20:00Z",
    description: "River water access point. Not recommended for drinking without treatment.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Brownish",
      odor: "Slight",
      flow: "High",
    },
  },
  {
    id: "5",
    name: "Public Water Tap",
    type: "tap",
    coordinates: [-73.9902, 40.7342],
    quality: 90,
    isFree: true,
    lastUpdated: "2025-04-06T11:10:00Z",
    description: "City-maintained public water tap. Safe for drinking.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Clear",
      odor: "None",
      flow: "Moderate",
    },
  },
  {
    id: "6",
    name: "Palar River Point",
    type: "river",
    coordinates: [79.7079, 12.8342], // Near Kanchipuram
    quality: 55,
    isFree: true,
    lastUpdated: "2025-04-08T08:20:00Z",
    description: "Palar river access point. Water quality varies with season, not suitable for drinking.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Muddy",
      odor: "Earthy",
      flow: "Seasonal",
    },
  },
  {
    id: "7",
    name: "Kanchipuram Public Tap",
    type: "tap",
    coordinates: [79.7036, 12.8380],
    quality: 88,
    isFree: true,
    lastUpdated: "2025-04-09T09:45:00Z",
    description: "Public tap near bus stand, maintained by local municipality. Safe for drinking.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Clear",
      odor: "None",
      flow: "Moderate",
    },
  },
  {
    id: "8",
    name: "Velachery Lake",
    type: "lake",
    coordinates: [80.2180, 12.9698], // Chennai
    quality: 65,
    isFree: true,
    lastUpdated: "2025-04-07T12:10:00Z",
    description: "Urban lake with moderate water quality. Not suitable for consumption.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Greenish",
      odor: "Mild",
      flow: "Low",
    },
  },
  {
    id: "9",
    name: "T. Nagar RO Borewell",
    type: "borewell",
    coordinates: [80.2345, 13.0401],
    quality: 92,
    isFree: false,
    lastUpdated: "2025-04-08T10:00:00Z",
    description: "RO-treated borewell water near T. Nagar, available for a small fee.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Clear",
      odor: "None",
      flow: "High",
    },
  },
  {
    id: "10",
    name: "Tambaram Municipal Tank",
    type: "tank",
    coordinates: [80.1145, 12.9253],
    quality: 75,
    isFree: false,
    lastUpdated: "2025-04-09T13:30:00Z",
    description: "Municipality-maintained water tank. Water is chlorinated and safe for use.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Clear",
      odor: "Chlorine",
      flow: "Moderate",
    },
  },
  {
    id: "11",
    name: "Sriperumbudur Borewell Station",
    type: "borewell",
    coordinates: [79.9489, 12.9675],
    quality: 80,
    isFree: true,
    lastUpdated: "2025-04-08T08:30:00Z",
    description: "Government borewell used by locals. Clean but slightly mineralized.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Slight Yellow",
      odor: "Mineral",
      flow: "Moderate",
    },
  },
  {
    id: "12",
    name: "Taramani Public Tap",
    type: "tap",
    coordinates: [80.2469, 12.9853],
    quality: 89,
    isFree: true,
    lastUpdated: "2025-04-07T11:00:00Z",
    description: "Public access tap maintained by the local panchayat.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Clear",
      odor: "None",
      flow: "High",
    },
  },
  {
    id: "13",
    name: "Guindy Tank Reserve",
    type: "tank",
    coordinates: [80.2330, 13.0074],
    quality: 78,
    isFree: false,
    lastUpdated: "2025-04-06T09:20:00Z",
    description: "Used for municipal storage. Not suitable for drinking.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Greenish",
      odor: "Mild",
      flow: "Low",
    },
  },
  {
    id: "14",
    name: "Thiruvallur River Access",
    type: "river",
    coordinates: [79.9130, 13.1439],
    quality: 62,
    isFree: true,
    lastUpdated: "2025-04-08T07:00:00Z",
    description: "Seasonal river with moderate pollution levels. Not recommended for consumption.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Brown",
      odor: "Strong",
      flow: "Seasonal",
    },
  },
  {
    id: "15",
    name: "Tambaram East Lake",
    type: "lake",
    coordinates: [80.1210, 12.9243],
    quality: 67,
    isFree: true,
    lastUpdated: "2025-04-07T10:10:00Z",
    description: "Small urban lake. Used mainly for agriculture and livestock.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Green",
      odor: "Organic",
      flow: "Still",
    },
  },
  {
    id: "16",
    name: "Kumbakonam Municipal Tap",
    type: "tap",
    coordinates: [79.3915, 10.9629],
    quality: 93,
    isFree: true,
    lastUpdated: "2025-04-06T13:00:00Z",
    description: "High-quality water source managed by the municipality.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Clear",
      odor: "None",
      flow: "High",
    },
  },
  {
    id: "17",
    name: "Cuddalore Borewell Point",
    type: "borewell",
    coordinates: [79.7586, 11.7447],
    quality: 70,
    isFree: false,
    lastUpdated: "2025-04-07T12:30:00Z",
    description: "Community borewell with slightly saline water.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Pale Yellow",
      odor: "Slightly Salty",
      flow: "Moderate",
    },
  },
  {
    id: "18",
    name: "Adyar River Watch Point",
    type: "river",
    coordinates: [80.2590, 13.0156],
    quality: 50,
    isFree: true,
    lastUpdated: "2025-04-05T15:00:00Z",
    description: "Highly polluted river stretch. Not safe for any direct use.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Dark Brown",
      odor: "Strong Odor",
      flow: "Moderate",
    },
  },
  {
    id: "19",
    name: "Perungudi Lake",
    type: "lake",
    coordinates: [80.2303, 12.9621],
    quality: 66,
    isFree: true,
    lastUpdated: "2025-04-06T11:45:00Z",
    description: "Lake partially used for rainwater harvesting. Avoid drinking.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Greenish",
      odor: "Algae",
      flow: "Still",
    },
  },
  {
    id: "20",
    name: "Vellore City Tap",
    type: "tap",
    coordinates: [79.1449, 12.9165],
    quality: 85,
    isFree: true,
    lastUpdated: "2025-04-06T10:50:00Z",
    description: "Good quality city tap water. Regularly maintained.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Clear",
      odor: "None",
      flow: "High",
    },
  },
  {
    id: "21",
    name: "Madurai Rural Tank",
    type: "tank",
    coordinates: [78.1198, 9.9252],
    quality: 74,
    isFree: false,
    lastUpdated: "2025-04-07T16:00:00Z",
    description: "Used for irrigation and secondary needs.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Murky",
      odor: "None",
      flow: "Low",
    },
  },
  {
    id: "22",
    name: "Tiruchirappalli RO Tap",
    type: "tap",
    coordinates: [78.7047, 10.7905],
    quality: 91,
    isFree: true,
    lastUpdated: "2025-04-08T08:50:00Z",
    description: "Treated RO tap water. Recommended for drinking.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Crystal Clear",
      odor: "None",
      flow: "High",
    },
  },
  {
    id: "23",
    name: "Salem City Borewell",
    type: "borewell",
    coordinates: [78.1482, 11.6643],
    quality: 76,
    isFree: true,
    lastUpdated: "2025-04-08T09:30:00Z",
    description: "Common water source for local houses.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Clear",
      odor: "Mild",
      flow: "Moderate",
    },
  },
  {
    id: "24",
    name: "Chromepet Bus Stand Tap",
    type: "tap",
    coordinates: [80.1281, 12.9511],
    quality: 87,
    isFree: true,
    lastUpdated: "2025-04-09T10:20:00Z",
    description: "Public water access point. Often used by travelers.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Clear",
      odor: "None",
      flow: "High",
    },
  },
  {
    id: "25",
    name: "Anna Nagar Water Tank",
    type: "tank",
    coordinates: [80.2231, 13.0865],
    quality: 72,
    isFree: false,
    lastUpdated: "2025-04-09T11:40:00Z",
    description: "Urban tank for backup supply. Periodically cleaned.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Mild Yellow",
      odor: "Neutral",
      flow: "Medium",
    },
  },
  {
    id: "26",
    name: "Saidapet Urban Tap",
    type: "tap",
    coordinates: [80.2309, 13.0248],
    quality: 82,
    isFree: true,
    lastUpdated: "2025-04-09T14:00:00Z",
    description: "Local drinking water source. Fairly consistent quality.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Clear",
      odor: "None",
      flow: "High",
    },
  },
  {
    id: "27",
    name: "Alandur Water Point",
    type: "borewell",
    coordinates: [80.2015, 13.0108],
    quality: 79,
    isFree: false,
    lastUpdated: "2025-04-08T17:10:00Z",
    description: "Borewell connected to overhead tank. Not drinkable directly.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Yellow Tint",
      odor: "Iron",
      flow: "Low",
    },
  },
  {
    id: "28",
    name: "Tindivanam Tap Point",
    type: "tap",
    coordinates: [79.6526, 12.2489],
    quality: 88,
    isFree: true,
    lastUpdated: "2025-04-06T09:00:00Z",
    description: "Small town tap with consistently good quality.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Clear",
      odor: "None",
      flow: "Moderate",
    },
  },
  {
    id: "29",
    name: "Avadi Lake",
    type: "lake",
    coordinates: [80.1039, 13.1155],
    quality: 68,
    isFree: true,
    lastUpdated: "2025-04-07T07:30:00Z",
    description: "Seasonal lake used for irrigation and rain harvesting.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Greenish Brown",
      odor: "Organic",
      flow: "Still",
    },
  },
  {
    id: "30",
    name: "Chengalpattu River Access",
    type: "river",
    coordinates: [79.9710, 12.6933],
    quality: 73,
    isFree: true,
    lastUpdated: "2025-04-08T06:30:00Z",
    description: "Popular river bank for domestic use. Not safe to drink without treatment.",
    image: "/placeholder.svg?height=300&width=400",
    indicators: {
      color: "Brownish",
      odor: "Mild",
      flow: "Flowing",
    },
  },
]

export function WaterSourceMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [lng, setLng] = useState(-73.9759)
  const [lat, setLat] = useState(-40.7659)
  const [zoom, setZoom] = useState(12)
  const [sources, setSources] = useState<WaterSource[]>(sampleSources)
  const [filteredSources, setFilteredSources] = useState<WaterSource[]>(sources)
  const [selectedSource, setSelectedSource] = useState<WaterSource | null>(null)
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  // Add this state to track map loading errors
  const [mapError, setMapError] = useState(false)

  // Modify the map initialization in the useEffect to include error handling
  useEffect(() => {
    if (map.current || !mapContainer.current) return

    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLng(position.coords.longitude)
          setLat(position.coords.latitude)
        },
        () => {
          // If geolocation fails, use default coordinates
          console.log("Geolocation permission denied, using default location")
        },
      )
    }

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      })

      map.current.on("load", () => {
        setIsMapLoaded(true)
      })

      map.current.on("move", () => {
        if (!map.current) return
        setLng(Number.parseFloat(map.current.getCenter().lng.toFixed(4)))
        setLat(Number.parseFloat(map.current.getCenter().lat.toFixed(4)))
        setZoom(Number.parseFloat(map.current.getZoom().toFixed(2)))
      })

      map.current.on("error", (e) => {
        console.error("Mapbox error:", e)
        setMapError(true)
      })
    } catch (error) {
      console.error("Failed to initialize map:", error)
      setMapError(true)
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Add markers when map is loaded or sources change
  useEffect(() => {
    if (!map.current || !isMapLoaded) return

    // Clear existing markers
    const existingMarkers = document.querySelectorAll(".mapboxgl-marker")
    existingMarkers.forEach((marker) => marker.remove())

    // Add markers for filtered sources
    filteredSources.forEach((source) => {
      const markerElement = document.createElement("div")
      markerElement.className = "marker"
      markerElement.innerHTML = getMarkerHTML(source)

      const marker = new mapboxgl.Marker(markerElement).setLngLat(source.coordinates).addTo(map.current!)

      markerElement.addEventListener("click", () => {
        setSelectedSource(source)
        setIsInfoOpen(true)
      })
    })
  }, [filteredSources, isMapLoaded])

  // Filter sources based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSources(sources)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = sources.filter(
        (source) => source.name.toLowerCase().includes(query) || source.type.toLowerCase().includes(query),
      )
      setFilteredSources(filtered)
    }
  }, [searchQuery, sources])

  // Helper function to generate marker HTML
  const getMarkerHTML = (source: WaterSource) => {
    const getColorByQuality = (quality: number) => {
      if (quality >= 80) return "bg-green-500"
      if (quality >= 60) return "bg-yellow-500"
      return "bg-red-500"
    }

    const getIconByType = (type: string) => {
      switch (type) {
        case "lake":
          return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-waves"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`
        case "tank":
          return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-cylinder"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/></svg>`
        case "borewell":
          return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-arrow-down-to-line"><path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/></svg>`
        case "river":
          return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-wave"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`
        case "tap":
          return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-droplet"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>`
        default:
          return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-droplet"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>`
      }
    }

    return `
      <div class="flex h-8 w-8 items-center justify-center rounded-full ${getColorByQuality(
        source.quality,
      )} text-white shadow-md">
        ${getIconByType(source.type)}
      </div>
    `
  }

  // Apply filters to sources
  const applyFilters = (filters: any) => {
    let filtered = [...sources]

    if (filters.types.length > 0) {
      filtered = filtered.filter((source) => filters.types.includes(source.type))
    }

    if (filters.quality !== "all") {
      switch (filters.quality) {
        case "high":
          filtered = filtered.filter((source) => source.quality >= 80)
          break
        case "medium":
          filtered = filtered.filter((source) => source.quality >= 60 && source.quality < 80)
          break
        case "low":
          filtered = filtered.filter((source) => source.quality < 60)
          break
      }
    }

    if (filters.cost !== "all") {
      filtered = filtered.filter((source) => (filters.cost === "free" ? source.isFree : !source.isFree))
    }

    setFilteredSources(filtered)
  }

  // Modify the return statement to include a fallback UI
  return (
    <div className="relative h-[calc(100vh-4rem)] w-full">
      <div className="absolute left-4 right-4 top-4 z-10 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search water sources..."
            className="pl-9 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Filter Water Sources</SheetTitle>
            </SheetHeader>
            <WaterSourceFilters onApplyFilters={applyFilters} />
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <List className="h-4 w-4" />
              <span className="sr-only">List</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Water Sources</SheetTitle>
            </SheetHeader>
            <WaterSourceList
              sources={filteredSources}
              onSourceSelect={(source) => {
                setSelectedSource(source)
                setIsInfoOpen(true)
              }}
            />
          </SheetContent>
        </Sheet>
        {!mapError && (
          <Button
            variant="outline"
            size="icon"
            className="bg-background"
            onClick={() => {
              if (navigator.geolocation && map.current) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    map.current?.flyTo({
                      center: [position.coords.longitude, position.coords.latitude],
                      zoom: 14,
                    })
                  },
                  () => {
                    console.log("Geolocation permission denied")
                  },
                )
              }
            }}
          >
            <Layers className="h-4 w-4" />
            <span className="sr-only">My Location</span>
          </Button>
        )}
      </div>

      {mapError ? (
        <div className="flex h-full w-full flex-col items-center justify-center bg-muted/20 p-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">Map Unavailable</h2>
            <p className="mt-2 text-muted-foreground">
              We're unable to load the map at this time. You can still view and search water sources below.
            </p>
          </div>
          <div className="w-full max-w-3xl rounded-lg border bg-card p-4">
            <h3 className="mb-4 text-lg font-medium">Available Water Sources</h3>
            <div className="max-h-[60vh] overflow-y-auto pr-2">
              <WaterSourceList
                sources={filteredSources}
                onSourceSelect={(source) => {
                  setSelectedSource(source)
                  setIsInfoOpen(true)
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div ref={mapContainer} className="h-full w-full" style={{ background: "#e5e5e5" }} />
      )}

      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 z-10 transform transition-transform duration-300 ease-in-out",
          isInfoOpen ? "translate-y-0" : "translate-y-full",
        )}
      >
        {selectedSource && <WaterSourceInfo source={selectedSource} onClose={() => setIsInfoOpen(false)} />}
      </div>
    </div>
  )
}

