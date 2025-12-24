import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import arecanutImage from "@/assets/arecanut-closeup.jpg";

const diseases = [
  {
    name: "Koleroga (Mahali / Fruit Rot)",
    symptoms: ["Black spots on nuts", "Premature fruit drop", "White fungal growth in humid conditions"],
    causes: "Fungal infection (Phytophthora) during monsoon season with high humidity",
    treatment: ["Apply 1% Bordeaux mixture before monsoon", "Remove and destroy infected fruits", "Improve drainage in plantation", "Spray copper-based fungicides"],
    prevention: ["Good canopy management", "Avoid waterlogging", "Regular inspection during monsoon"],
    severity: "high",
  },
  {
    name: "Yellow Leaf Disease (YLD)",
    symptoms: ["Yellowing of lower leaves", "Reduced nut size", "Crown size reduction", "Delayed flowering"],
    causes: "Phytoplasma infection spread by plant hoppers",
    treatment: ["Remove severely affected palms", "Apply balanced fertilizers", "Control vector insects", "Use tetracycline trunk injection"],
    prevention: ["Plant resistant varieties", "Control leaf hoppers", "Maintain plant health"],
    severity: "high",
  },
  {
    name: "Bud Rot",
    symptoms: ["Yellowing of spindle leaf", "Rotting of growing bud", "Foul smell from crown", "Complete wilting of palm"],
    causes: "Fungal infection (Phytophthora palmivora) in wet conditions",
    treatment: ["Remove infected tissue", "Apply Bordeaux paste to cut", "Drench with Metalaxyl", "Improve crown ventilation"],
    prevention: ["Avoid crown wetting", "Good drainage", "Regular crown cleaning"],
    severity: "critical",
  },
  {
    name: "Anaberoga (Inflorescence Dieback)",
    symptoms: ["Drying of inflorescence", "Poor nut setting", "Shriveled nuts", "Brown discoloration"],
    causes: "Fungal attack during flowering, high humidity",
    treatment: ["Spray Carbendazim (0.1%)", "Remove infected inflorescence", "Apply potash fertilizers"],
    prevention: ["Timely fungicide sprays", "Balanced nutrition", "Crown hygiene"],
    severity: "medium",
  },
  {
    name: "Basal Stem Rot",
    symptoms: ["Yellowing of outer leaves", "Oozing of brown liquid from base", "Bracket-shaped fungal growth", "Stem hollowing"],
    causes: "Ganoderma fungal infection from soil",
    treatment: ["Drench with Tridemorph", "Remove infected tissue", "Apply neem cake around base", "Isolate affected palm"],
    prevention: ["Avoid soil compaction", "Proper drainage", "Remove old palm stumps"],
    severity: "critical",
  },
];

const DiseaseGuide = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<typeof diseases[0] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        simulateAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      // Simulate random disease detection
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      setAnalysisResult(randomDisease);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-warning text-accent-foreground";
      case "medium": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <>
      <Helmet>
        <title>Disease Detection Guide | ArecaWise - Identify Arecanut Diseases</title>
        <meta name="description" content="Upload images to detect Koleroga, Yellow Leaf Disease, Bud Rot and more. Get expert treatment recommendations for arecanut diseases." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
                Disease Detection
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Identify & Treat Arecanut Diseases
              </h1>
              <p className="text-muted-foreground text-lg">
                Upload an image of your arecanut palm or fruit for AI-powered disease detection and get expert treatment recommendations.
              </p>
            </div>

            {/* Upload Section */}
            <Card className="max-w-2xl mx-auto mb-12 overflow-hidden">
              <CardHeader className="bg-gradient-nature">
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Upload Arecanut Image
                </CardTitle>
                <CardDescription>
                  Take a clear photo of the affected area for best results
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {selectedImage ? (
                      <div className="space-y-4">
                        <img
                          src={selectedImage}
                          alt="Uploaded arecanut"
                          className="max-h-64 mx-auto rounded-lg"
                        />
                        {isAnalyzing && (
                          <div className="flex items-center justify-center gap-2 text-primary">
                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            <span>Analyzing image...</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                          <Upload className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Click to upload image</p>
                          <p className="text-sm text-muted-foreground">or drag and drop</p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>

                {/* Analysis Result */}
                {analysisResult && (
                  <div className="mt-6 p-6 rounded-xl bg-gradient-nature border border-border animate-fade-in">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-destructive" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{analysisResult.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(analysisResult.severity)}`}>
                            {analysisResult.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{analysisResult.causes}</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                          <Info className="w-4 h-4 text-primary" /> Symptoms
                        </h4>
                        <ul className="space-y-1">
                          {analysisResult.symptoms.map((symptom, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-success" /> Treatment
                        </h4>
                        <ul className="space-y-1">
                          {analysisResult.treatment.slice(0, 3).map((step, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <CheckCircle2 className="w-3 h-3 text-success mt-1" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sample Image */}
            <div className="max-w-2xl mx-auto mb-12 text-center">
              <p className="text-sm text-muted-foreground mb-4">Or try with our sample image:</p>
              <button onClick={() => { setSelectedImage(arecanutImage); simulateAnalysis(); }} className="inline-block">
                <img src={arecanutImage} alt="Sample arecanut" className="w-32 h-32 rounded-xl object-cover border-2 border-border hover:border-primary transition-colors cursor-pointer" />
              </button>
            </div>

            {/* Disease Library */}
            <div className="max-w-5xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
                Common Arecanut Diseases
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {diseases.map((disease) => (
                  <Card key={disease.name} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{disease.name}</CardTitle>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(disease.severity)}`}>
                          {disease.severity.toUpperCase()}
                        </span>
                      </div>
                      <CardDescription>{disease.causes}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Symptoms</h4>
                        <ul className="space-y-1">
                          {disease.symptoms.map((symptom, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5" />
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Treatment</h4>
                        <ul className="space-y-1">
                          {disease.treatment.map((step, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <CheckCircle2 className="w-3 h-3 text-success mt-1 flex-shrink-0" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DiseaseGuide;
