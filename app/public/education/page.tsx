import { AlertTriangle, BookOpen, Droplet, Eye, FileText, FlaskRoundIcon as Flask, Thermometer } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function EducationPage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Water Quality Education</h1>
          <p className="mt-2 text-muted-foreground">
            Learn how to identify safe water sources and understand water quality indicators
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Visual Indicators
              </CardTitle>
              <CardDescription>How to assess water quality by appearance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="font-medium">Clear Water</h3>
                  <div className="aspect-video rounded-md bg-blue-100"></div>
                  <p className="text-sm text-muted-foreground">
                    Clear water is generally a good sign, but clarity alone doesn't guarantee safety.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Cloudy/Turbid Water</h3>
                  <div className="aspect-video rounded-md bg-gray-200"></div>
                  <p className="text-sm text-muted-foreground">
                    Cloudiness indicates suspended particles and potential contamination.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Colored Water</h3>
                  <div className="aspect-video rounded-md bg-yellow-100"></div>
                  <p className="text-sm text-muted-foreground">
                    Yellow, brown, or green tints may indicate minerals, chemicals, or algae.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flask className="h-5 w-5 text-primary" />
                Chemical Indicators
              </CardTitle>
              <CardDescription>Understanding water chemistry basics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">pH Level</h3>
                <p className="text-sm text-muted-foreground">
                  Safe drinking water typically has a pH between 6.5 and 8.5. Extreme values can indicate contamination.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Chlorine</h3>
                <p className="text-sm text-muted-foreground">
                  Used to disinfect water. A slight chlorine smell is normal in treated water.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Hardness</h3>
                <p className="text-sm text-muted-foreground">
                  Hard water has high mineral content. It's safe but can affect taste and cause scale buildup.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Warning Signs
              </CardTitle>
              <CardDescription>Red flags that indicate unsafe water</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Strong Odors</h3>
                <p className="text-sm text-muted-foreground">
                  Rotten egg, fishy, or chemical smells indicate contamination.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Floating Material</h3>
                <p className="text-sm text-muted-foreground">
                  Visible particles, scum, or oil slicks suggest pollution.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Staining</h3>
                <p className="text-sm text-muted-foreground">
                  Water that stains containers may contain excess iron, manganese, or other contaminants.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-primary" />
                Environmental Factors
              </CardTitle>
              <CardDescription>How surroundings affect water quality</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Nearby Activities</h3>
                <p className="text-sm text-muted-foreground">
                  Industrial, agricultural, or waste disposal sites near water sources increase contamination risk.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Seasonal Changes</h3>
                <p className="text-sm text-muted-foreground">
                  Heavy rain can increase turbidity and contamination. Drought can concentrate pollutants.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Wildlife</h3>
                <p className="text-sm text-muted-foreground">
                  Animal activity near water sources can introduce bacteria and parasites.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        <div className="space-y-6">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Droplet className="h-6 w-6 text-primary" />
              Water Safety Guidelines
            </h2>
            <p className="mt-2 text-muted-foreground">Essential information for using different water sources safely</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>When is water safe to drink without treatment?</AccordionTrigger>
              <AccordionContent>
                <p>Water is generally safe to drink without treatment when it comes from:</p>
                <ul className="ml-6 mt-2 list-disc space-y-1">
                  <li>Verified municipal water supplies</li>
                  <li>Properly maintained and regularly tested community tanks</li>
                  <li>Deep borewells in areas free from industrial or agricultural contamination</li>
                  <li>Protected springs that have been tested and verified as safe</li>
                </ul>
                <p className="mt-2">
                  Even in these cases, if the water appears cloudy, has an unusual smell or taste, or if you're unsure
                  about its source, it's better to treat it before drinking.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Simple water treatment methods</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Boiling</h3>
                    <p className="text-sm text-muted-foreground">
                      Bring water to a rolling boil for at least 1 minute (3 minutes at high altitudes). This kills most
                      pathogens.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Chlorination</h3>
                    <p className="text-sm text-muted-foreground">
                      Add 2-4 drops of unscented household bleach (5-6% sodium hypochlorite) per liter of water. Wait 30
                      minutes before use.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Filtration</h3>
                    <p className="text-sm text-muted-foreground">
                      Use a commercial water filter certified to remove bacteria and parasites. Follow manufacturer
                      instructions.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Solar Disinfection (SODIS)</h3>
                    <p className="text-sm text-muted-foreground">
                      Fill clear plastic bottles with water and expose to direct sunlight for at least 6 hours (or 2
                      days if cloudy).
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Water-related health risks</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Bacterial Infections</h3>
                    <p className="text-sm text-muted-foreground">
                      E. coli, cholera, and typhoid can cause severe gastrointestinal illness. Symptoms include
                      diarrhea, vomiting, and fever.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Parasitic Infections</h3>
                    <p className="text-sm text-muted-foreground">
                      Giardia and cryptosporidium cause persistent diarrhea and abdominal pain. They're resistant to
                      chlorine treatment.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Chemical Contamination</h3>
                    <p className="text-sm text-muted-foreground">
                      Heavy metals, pesticides, and industrial chemicals can cause long-term health effects including
                      organ damage and increased cancer risk.
                    </p>
                  </div>
                  <div className="rounded-md bg-amber-100 p-3 dark:bg-amber-900/20">
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                      If you experience persistent diarrhea, vomiting, or other symptoms after consuming water, seek
                      medical attention immediately.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Special considerations for different sources</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Lakes and Rivers</h3>
                    <p className="text-sm text-muted-foreground">
                      Surface water is highly susceptible to contamination. Always treat before use, even if it looks
                      clean.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Borewells</h3>
                    <p className="text-sm text-muted-foreground">
                      Deep groundwater is generally safer but can contain natural contaminants like arsenic or fluoride
                      in some regions.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Rainwater</h3>
                    <p className="text-sm text-muted-foreground">
                      Relatively clean but can pick up contaminants from collection surfaces. First-flush diversion and
                      filtration are recommended.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Community Tanks</h3>
                    <p className="text-sm text-muted-foreground">
                      Quality depends on maintenance and water source. Check when it was last cleaned and tested.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Separator className="my-8" />

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Why Community Reporting Matters</h2>
              <p className="mt-2 text-muted-foreground">
                Your contributions help us maintain accurate, up-to-date information about water sources in your
                community. By reporting new sources, updating information, or flagging issues, you're helping others
                access safe water.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <a href="/public/community" className="text-sm font-medium text-primary hover:underline">
                  Learn more about becoming a volunteer
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

