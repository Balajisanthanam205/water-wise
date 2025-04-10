import Link from "next/link"
import { ArrowRight, Droplets, MapPin, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute right-4 top-4 z-10">
          <ModeToggle />
        </div>
        <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-primary/10 to-background px-4 text-center">
          <div className="absolute inset-0 z-0 opacity-20">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {Array.from({ length: 20 }).map((_, i) => (
                <path
                  key={i}
                  d={`M${i * 5},100 C${i * 5 + 2},${
                    Math.random() * 50 + 30
                  } ${i * 5 + 3},${Math.random() * 50 + 30} ${i * 5 + 5},100`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-primary"
                />
              ))}
            </svg>
          </div>
          <div className="container relative z-10 mx-auto max-w-5xl space-y-6">
            <Droplets className="mx-auto h-16 w-16 text-primary" />
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">WaterWise</h1>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              Find safe water sources near you and contribute to our community water monitoring network
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/public/map">
                  Find Water Nearby <MapPin className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">
                  Monitor Your Usage <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">Our Mission</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md">
              <MapPin className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Find Safe Water</h3>
              <p className="text-muted-foreground">
                Locate verified water sources near you with real-time quality data and community feedback.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md">
              <Shield className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Ensure Safety</h3>
              <p className="text-muted-foreground">
                Get accurate information about water quality, safety ratings, and usage recommendations.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md">
              <Users className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Community Driven</h3>
              <p className="text-muted-foreground">
                Contribute to our database by reporting new sources or updating existing information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Join Our Water Monitoring Network</h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Help us expand our database of safe water sources and contribute to better water accessibility for everyone.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/public/report">Report a Water Source</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/public/community">Join as Volunteer</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Droplets className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">WaterWise</span>
            </div>
            <div className="flex gap-8">
              <Link href="/public/map" className="text-sm text-muted-foreground hover:text-foreground">
                Map
              </Link>
              <Link href="/public/education" className="text-sm text-muted-foreground hover:text-foreground">
                Education
              </Link>
              <Link href="/public/community" className="text-sm text-muted-foreground hover:text-foreground">
                Community
              </Link>
              <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
                Login
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">© 2025 WaterWise. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

