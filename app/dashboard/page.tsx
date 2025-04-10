import { Droplets, FingerprintIcon as Faucet, Gauge, Timer } from "lucide-react"
import { WaterTank } from "@/components/water-tank"
import { UsageCard } from "@/components/usage-card"
import { UsageChart } from "@/components/usage-chart"
import { ComparativeTable } from "@/components/comparative-table"

export default function DashboardPage() {
  return (
    <div className="container space-y-6 py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Monitor and manage your water usage</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <UsageCard title="Today's Usage" value="120" unit="L" change={5} icon={<Droplets className="h-4 w-4" />} />
        <UsageCard title="Weekly Average" value="145" unit="L/day" change={-3} icon={<Gauge className="h-4 w-4" />} />
        <UsageCard title="Active Taps" value="4" unit="taps" change={0} icon={<Faucet className="h-4 w-4" />} />
        <UsageCard title="Last Activity" value="5" unit="min ago" change={0} icon={<Timer className="h-4 w-4" />} />
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <UsageChart />
        <div className="md:col-span-2">
          <WaterTank level={68} capacity={1000} name="Main Water Tank" className="h-full" />
        </div>
      </div>

      <ComparativeTable />
    </div>
  )
}

