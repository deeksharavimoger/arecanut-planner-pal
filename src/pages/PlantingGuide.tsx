import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout, Droplets, Leaf, Sun, Calendar, CheckCircle2, AlertTriangle } from "lucide-react";
import { Helmet } from "react-helmet-async";

const plantingSteps = [
  {
    step: 1,
    title: "Site Selection & Land Preparation",
    duration: "2-3 months before planting",
    tasks: [
      "Choose well-drained soil with good water retention",
      "Ideal elevation: 250-900m above sea level",
      "Clear the land and remove weeds",
      "Dig pits of 90cm x 90cm x 90cm",
      "Leave pits open for 2 weeks for sun sterilization",
      "Mix topsoil with FYM (10kg) and bone meal (1kg)",
    ],
    tips: "Avoid waterlogged areas and low-lying lands prone to flooding.",
  },
  {
    step: 2,
    title: "Seedling Selection",
    duration: "During pit preparation",
    tasks: [
      "Select 12-18 month old seedlings from certified nurseries",
      "Choose seedlings from high-yielding mother palms",
      "Look for 5-6 healthy leaves and well-developed roots",
      "Avoid seedlings with yellowing or disease symptoms",
      "Transport seedlings carefully to avoid root damage",
    ],
    tips: "Get seedlings from CAMPCO, CPCRI, or certified government nurseries.",
  },
  {
    step: 3,
    title: "Planting Process",
    duration: "June-July (onset of monsoon)",
    tasks: [
      "Spacing: 2.7m x 2.7m (1350 palms/hectare)",
      "Plant seedlings in the center of prepared pits",
      "Keep root collar at ground level",
      "Press soil firmly around the seedling",
      "Provide shade using coconut fronds if needed",
      "Stake young plants for support",
    ],
    tips: "Never plant during peak summer or heavy monsoon rains.",
  },
  {
    step: 4,
    title: "Initial Care (0-2 years)",
    duration: "First 2 years after planting",
    tasks: [
      "Water regularly during dry spells (10-15 liters/palm)",
      "Apply mulch around base to retain moisture",
      "Remove weeds regularly",
      "Apply fertilizer: 100g N, 40g P, 140g K per palm/year",
      "Protect from cattle and rodents",
      "Monitor for pest and disease symptoms",
    ],
    tips: "Young palms are vulnerable - regular monitoring is crucial.",
  },
  {
    step: 5,
    title: "Growth Phase (2-5 years)",
    duration: "Pre-bearing stage",
    tasks: [
      "Increase fertilizer: 200g N, 80g P, 280g K per palm/year",
      "Apply organic manure (25kg FYM/palm)",
      "Basin management and soil working",
      "Irrigation during summer (drip or basin)",
      "Green manuring and intercropping",
      "Pest and disease management",
    ],
    tips: "This is when palms develop their root system and crown.",
  },
  {
    step: 6,
    title: "Bearing Stage (5+ years)",
    duration: "Productive phase",
    tasks: [
      "Fertilizer: 300g N, 120g P, 420g K per palm/year",
      "Apply in 2 split doses (June and October)",
      "Maintain 25-30kg FYM application annually",
      "Regular pruning of old leaves",
      "Timely harvesting of ripe bunches",
      "Post-harvest processing and storage",
    ],
    tips: "Well-maintained palms produce for 50+ years.",
  },
];

const irrigationGuide = {
  summer: {
    frequency: "Every 4-5 days",
    quantity: "40-50 liters per palm",
    method: "Basin or drip irrigation",
    tips: "Early morning or evening watering is best",
  },
  monsoon: {
    frequency: "Only if dry spell exceeds 15 days",
    quantity: "As needed",
    method: "Natural rainfall sufficient",
    tips: "Ensure good drainage to prevent waterlogging",
  },
  winter: {
    frequency: "Every 7-10 days",
    quantity: "30-40 liters per palm",
    method: "Basin irrigation",
    tips: "Reduce frequency as temperature drops",
  },
};

const fertilizerSchedule = [
  {
    stage: "0-2 years",
    n: "100g",
    p: "40g",
    k: "140g",
    fym: "10kg",
    timing: "Split: June & October",
  },
  {
    stage: "2-5 years",
    n: "200g",
    p: "80g",
    k: "280g",
    fym: "25kg",
    timing: "Split: June & October",
  },
  {
    stage: "5+ years",
    n: "300g",
    p: "120g",
    k: "420g",
    fym: "30kg",
    timing: "Split: June & October",
  },
];

const PlantingGuide = () => {
  return (
    <>
      <Helmet>
        <title>Arecanut Planting Guide | ArecaWise - Step by Step Cultivation</title>
        <meta name="description" content="Complete step-by-step guide for arecanut cultivation from seedling to harvest. Learn irrigation, fertilizer application, and best practices." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Planting Guide
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Complete Arecanut Cultivation Guide
              </h1>
              <p className="text-muted-foreground text-lg">
                Step-by-step instructions for successful arecanut farming from site selection to harvest.
              </p>
            </div>

            <Tabs defaultValue="planting" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="planting" className="flex items-center gap-2">
                  <Sprout className="w-4 h-4" />
                  Planting Steps
                </TabsTrigger>
                <TabsTrigger value="irrigation" className="flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  Irrigation
                </TabsTrigger>
                <TabsTrigger value="fertilizer" className="flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  Fertilizer
                </TabsTrigger>
              </TabsList>

              <TabsContent value="planting">
                <div className="space-y-6">
                  {plantingSteps.map((step, index) => (
                    <Card key={step.step} className="overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardHeader className="bg-gradient-nature">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl flex-shrink-0">
                            {step.step}
                          </div>
                          <div>
                            <CardTitle>{step.title}</CardTitle>
                            <CardDescription className="flex items-center gap-1 mt-1">
                              <Calendar className="w-4 h-4" />
                              {step.duration}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-success" /> Tasks
                            </h4>
                            <ul className="space-y-2">
                              {step.tasks.map((task, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <CheckCircle2 className="w-3 h-3 text-success mt-1 flex-shrink-0" />
                                  {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-warning" /> Pro Tip
                            </h4>
                            <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
                              <p className="text-sm text-muted-foreground">{step.tips}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="irrigation">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-sky" />
                      Irrigation Schedule
                    </CardTitle>
                    <CardDescription>Seasonal watering recommendations for arecanut palms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="p-6 rounded-xl bg-warning/10 border border-warning/20">
                        <div className="flex items-center gap-2 mb-4">
                          <Sun className="w-6 h-6 text-warning" />
                          <h3 className="font-semibold">Summer (Mar-May)</h3>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Frequency:</span>
                            <span className="ml-2 font-medium text-foreground">{irrigationGuide.summer.frequency}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Quantity:</span>
                            <span className="ml-2 font-medium text-foreground">{irrigationGuide.summer.quantity}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Method:</span>
                            <span className="ml-2 font-medium text-foreground">{irrigationGuide.summer.method}</span>
                          </div>
                          <p className="text-muted-foreground italic pt-2 border-t border-warning/20">{irrigationGuide.summer.tips}</p>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl bg-sky/10 border border-sky/20">
                        <div className="flex items-center gap-2 mb-4">
                          <Droplets className="w-6 h-6 text-sky" />
                          <h3 className="font-semibold">Monsoon (Jun-Sep)</h3>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Frequency:</span>
                            <span className="ml-2 font-medium text-foreground">{irrigationGuide.monsoon.frequency}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Quantity:</span>
                            <span className="ml-2 font-medium text-foreground">{irrigationGuide.monsoon.quantity}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Method:</span>
                            <span className="ml-2 font-medium text-foreground">{irrigationGuide.monsoon.method}</span>
                          </div>
                          <p className="text-muted-foreground italic pt-2 border-t border-sky/20">{irrigationGuide.monsoon.tips}</p>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl bg-muted border border-border">
                        <div className="flex items-center gap-2 mb-4">
                          <Leaf className="w-6 h-6 text-muted-foreground" />
                          <h3 className="font-semibold">Winter (Oct-Feb)</h3>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Frequency:</span>
                            <span className="ml-2 font-medium text-foreground">{irrigationGuide.winter.frequency}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Quantity:</span>
                            <span className="ml-2 font-medium text-foreground">{irrigationGuide.winter.quantity}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Method:</span>
                            <span className="ml-2 font-medium text-foreground">{irrigationGuide.winter.method}</span>
                          </div>
                          <p className="text-muted-foreground italic pt-2 border-t border-border">{irrigationGuide.winter.tips}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fertilizer">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-leaf" />
                      Fertilizer Schedule
                    </CardTitle>
                    <CardDescription>Recommended fertilizer doses per palm per year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="text-left p-4 font-medium text-muted-foreground">Growth Stage</th>
                            <th className="text-center p-4 font-medium text-muted-foreground">Nitrogen (N)</th>
                            <th className="text-center p-4 font-medium text-muted-foreground">Phosphorus (P)</th>
                            <th className="text-center p-4 font-medium text-muted-foreground">Potassium (K)</th>
                            <th className="text-center p-4 font-medium text-muted-foreground">FYM</th>
                            <th className="text-left p-4 font-medium text-muted-foreground">Application Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fertilizerSchedule.map((row) => (
                            <tr key={row.stage} className="border-b last:border-0 hover:bg-muted/30">
                              <td className="p-4 font-medium text-foreground">{row.stage}</td>
                              <td className="p-4 text-center text-muted-foreground">{row.n}</td>
                              <td className="p-4 text-center text-muted-foreground">{row.p}</td>
                              <td className="p-4 text-center text-muted-foreground">{row.k}</td>
                              <td className="p-4 text-center text-muted-foreground">{row.fym}</td>
                              <td className="p-4 text-muted-foreground">{row.timing}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-6 p-4 rounded-xl bg-success/10 border border-success/20">
                      <h4 className="font-medium text-foreground mb-2">Application Tips:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          Apply fertilizers in a circular ring 1.5m away from palm base
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          Best to apply after light rain or irrigation
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          Cover with soil after application to prevent nutrient loss
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          Apply lime (1kg/palm) if soil pH is below 5.5
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PlantingGuide;
