import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bug, AlertTriangle, Shield, Droplets } from "lucide-react";
import { Helmet } from "react-helmet-async";

const pests = [
  {
    name: "Spindle Bug",
    scientificName: "Carvalhoia arecae",
    damage: "Sucks sap from young leaves causing yellowish streaks and leaf drying",
    symptoms: ["Yellow streaks on leaves", "Leaf tip drying", "Stunted leaf growth", "Reduced photosynthesis"],
    lifecycle: "Active during dry months (December-May)",
    management: [
      "Spray Dimethoate 30EC @ 2ml/lit",
      "Apply Neem oil 3% spray",
      "Remove heavily infested leaves",
      "Encourage natural predators",
    ],
    prevention: ["Maintain plant hygiene", "Avoid water stress", "Regular monitoring"],
    severity: "medium",
  },
  {
    name: "Red Palm Mite",
    scientificName: "Raoiella indica",
    damage: "Feeds on underside of leaves causing yellowing and bronzing",
    symptoms: ["Bronze discoloration", "Fine webbing on leaves", "Premature leaf fall", "Reduced yield"],
    lifecycle: "Multiplies rapidly in hot, dry weather",
    management: [
      "Spray Wettable Sulphur @ 3g/lit",
      "Apply Propargite @ 1ml/lit",
      "Use predatory mites (Amblyseius)",
      "Water spray to dislodge mites",
    ],
    prevention: ["Avoid water stress", "Regular irrigation", "Overhead sprinklers help"],
    severity: "high",
  },
  {
    name: "Root Grub",
    scientificName: "Leucopholis spp.",
    damage: "Larvae feed on roots causing wilting and plant death",
    symptoms: ["Yellowing of fronds", "Wilting despite irrigation", "Loose palm base", "White grubs in soil"],
    lifecycle: "Adult beetles appear with first rains, larvae active for 6-8 months",
    management: [
      "Apply Chlorpyrifos 20EC @ 5ml/lit soil drench",
      "Use Metarhizium anisopliae @ 40g/palm",
      "Light trap for adult beetles",
      "Deep ploughing to expose grubs",
    ],
    prevention: ["Soil treatment before planting", "Avoid organic matter near base", "Regular soil inspection"],
    severity: "critical",
  },
  {
    name: "Caterpillars",
    scientificName: "Various species",
    damage: "Defoliation of leaves affecting photosynthesis",
    symptoms: ["Holes in leaves", "Skeletonized leaves", "Visible caterpillars", "Frass on crown"],
    lifecycle: "Active during monsoon season",
    management: [
      "Spray Carbaryl 50WP @ 2g/lit",
      "Apply Bacillus thuringiensis",
      "Hand pick and destroy",
      "Use pheromone traps",
    ],
    prevention: ["Regular crown inspection", "Clean cultivation", "Encourage birds"],
    severity: "low",
  },
  {
    name: "White Flies",
    scientificName: "Aleurocanthus spp.",
    damage: "Sucks plant sap and secretes honeydew leading to sooty mold",
    symptoms: ["Sticky honeydew", "Black sooty mold", "Yellowing leaves", "Reduced vigour"],
    lifecycle: "Present throughout the year, peaks in summer",
    management: [
      "Spray Imidacloprid @ 0.5ml/lit",
      "Apply Neem oil spray",
      "Yellow sticky traps",
      "Remove sooty mold affected leaves",
    ],
    prevention: ["Avoid excessive nitrogen", "Good air circulation", "Regular monitoring"],
    severity: "medium",
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical": return "destructive";
    case "high": return "secondary";
    case "medium": return "outline";
    default: return "default";
  }
};

const PestManagement = () => {
  return (
    <>
      <Helmet>
        <title>Pest Management Guide | ArecaWise - Control Arecanut Pests</title>
        <meta name="description" content="Learn about spindle bugs, mites, root grubs and other arecanut pests. Get expert pest control recommendations and prevention tips." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-warning/10 text-warning text-sm font-medium mb-4">
                Pest Management
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Protect Your Arecanut from Pests
              </h1>
              <p className="text-muted-foreground text-lg">
                Identify common pests affecting arecanut and learn effective management strategies to protect your plantation.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              <Card className="text-center p-4">
                <Bug className="w-8 h-8 text-warning mx-auto mb-2" />
                <div className="font-bold text-2xl text-foreground">{pests.length}</div>
                <div className="text-sm text-muted-foreground">Common Pests</div>
              </Card>
              <Card className="text-center p-4">
                <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
                <div className="font-bold text-2xl text-foreground">2</div>
                <div className="text-sm text-muted-foreground">Critical Threats</div>
              </Card>
              <Card className="text-center p-4">
                <Shield className="w-8 h-8 text-success mx-auto mb-2" />
                <div className="font-bold text-2xl text-foreground">20+</div>
                <div className="text-sm text-muted-foreground">Control Methods</div>
              </Card>
              <Card className="text-center p-4">
                <Droplets className="w-8 h-8 text-sky mx-auto mb-2" />
                <div className="font-bold text-2xl text-foreground">Bio</div>
                <div className="text-sm text-muted-foreground">Control Options</div>
              </Card>
            </div>

            {/* Pest Library */}
            <div className="max-w-5xl mx-auto space-y-6">
              {pests.map((pest, index) => (
                <Card key={pest.name} className="overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader className="bg-gradient-nature">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Bug className="w-5 h-5 text-warning" />
                          {pest.name}
                        </CardTitle>
                        <CardDescription className="italic">{pest.scientificName}</CardDescription>
                      </div>
                      <Badge variant={getSeverityColor(pest.severity) as any}>
                        {pest.severity.toUpperCase()} SEVERITY
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">{pest.damage}</p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4 text-warning" /> Symptoms
                        </h4>
                        <ul className="space-y-1">
                          {pest.symptoms.map((symptom, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5" />
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                          <Shield className="w-4 h-4 text-success" /> Management
                        </h4>
                        <ul className="space-y-1">
                          {pest.management.map((method, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5" />
                              {method}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                          <Droplets className="w-4 h-4 text-primary" /> Prevention
                        </h4>
                        <ul className="space-y-1">
                          {pest.prevention.map((tip, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-muted-foreground mt-3 italic">
                          {pest.lifecycle}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PestManagement;
