import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import farmerImage from "@/assets/farmer-inspection.jpg";

const problems = [
  "Late disease detection causing major financial losses",
  "Limited access to expert guidance for treatment",
  "Water wastage due to inefficient irrigation",
  "Confusion about optimal selling time and prices",
  "Inconsistent grading leading to lower market prices",
];

const solutions = [
  "AI-powered early disease detection from images",
  "Expert-backed treatment guides available 24/7",
  "Smart irrigation scheduling based on real data",
  "Real-time market prices from local mandis",
  "Quality assessment to maximize your returns",
];

const ProblemSolution = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-accent rounded-3xl opacity-20 blur-2xl" />
            <img
              src={farmerImage}
              alt="Farmer inspecting arecanut leaves"
              className="relative rounded-2xl shadow-elevated w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-card p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <div className="font-bold text-foreground">Disease Identified</div>
                  <div className="text-sm text-muted-foreground">Yellow Leaf Disease</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Why ArecaWise?
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              From Challenges to Solutions
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Indian arecanut farmers face numerous challenges that lead to reduced yields and income. 
              ArecaWise bridges the gap between traditional farming and modern technology.
            </p>

            <div className="grid gap-6">
              {/* Problems */}
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-destructive mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Common Problems Faced
                  </h3>
                  <ul className="space-y-3">
                    {problems.map((problem, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-foreground/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                        {problem}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Solutions */}
              <Card className="border-success/20 bg-success/5">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-success mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Our Solutions
                  </h3>
                  <ul className="space-y-3">
                    {solutions.map((solution, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-foreground/80">
                        <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
