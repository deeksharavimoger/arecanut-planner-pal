import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, AlertTriangle, CheckCircle2, Info, Loader2, Camera, Sparkles } from "lucide-react";
import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import arecanutImage from "@/assets/arecanut-closeup.jpg";

interface DiseaseAnalysis {
  detected: boolean;
  disease?: {
    name: string;
    severity: "low" | "medium" | "high" | "critical";
    confidence: number;
    symptoms: string[];
    causes: string;
    treatment: string[];
    prevention: string[];
  };
  healthyIndicators?: string[];
  additionalNotes?: string;
}

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
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<DiseaseAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const analyzeImage = async (imageBase64: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-disease", {
        body: { imageBase64 },
      });

      if (error) throw error;

      setAnalysisResult(data);
      
      if (data.detected && data.disease) {
        toast({
          title: `${data.disease.name} Detected`,
          description: `Severity: ${data.disease.severity.toUpperCase()} | Confidence: ${data.disease.confidence}%`,
          variant: data.disease.severity === "critical" || data.disease.severity === "high" ? "destructive" : "default",
        });
      } else {
        toast({
          title: "Analysis Complete",
          description: data.additionalNotes || "No major issues detected.",
        });
      }
    } catch (error: any) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setSelectedImage(URL.createObjectURL(file));
      await analyzeImage(base64);
    } catch (error) {
      console.error("File processing error:", error);
      toast({
        title: "Error",
        description: "Failed to process image.",
        variant: "destructive",
      });
    }
  };

  const handleSampleImage = async () => {
    setSelectedImage(arecanutImage);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Fetch the sample image and convert to base64
      const response = await fetch(arecanutImage);
      const blob = await response.blob();
      const reader = new FileReader();
      
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        await analyzeImage(base64);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Sample image error:", error);
      setIsAnalyzing(false);
      toast({
        title: "Error",
        description: "Failed to analyze sample image.",
        variant: "destructive",
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-warning text-accent-foreground";
      case "medium": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <Helmet>
        <title>AI Disease Detection | ArecaWise - Smart Arecanut Analysis</title>
        <meta name="description" content="AI-powered disease detection for arecanut. Upload images to identify Koleroga, Yellow Leaf Disease, Bud Rot and get treatment recommendations." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                AI-Powered Detection
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Smart Disease Detection
              </h1>
              <p className="text-muted-foreground text-lg">
                Upload a photo of your arecanut palm or fruit and let AI analyze it for diseases, pests, and health issues.
              </p>
            </div>

            {/* Upload Section */}
            <Card className="max-w-2xl mx-auto mb-12 overflow-hidden">
              <CardHeader className="bg-gradient-nature">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  Upload Arecanut Image
                </CardTitle>
                <CardDescription>
                  Take a clear photo of the affected area for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />

                {!selectedImage ? (
                  <label 
                    htmlFor="image-upload" 
                    className="block border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <p className="font-medium text-foreground mb-1">Click to upload image</p>
                    <p className="text-sm text-muted-foreground">JPG, PNG up to 10MB</p>
                  </label>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={selectedImage}
                        alt="Uploaded arecanut"
                        className="w-full max-h-64 object-contain rounded-lg"
                      />
                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                          <div className="text-center">
                            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-2" />
                            <p className="text-sm font-medium text-foreground">AI is analyzing...</p>
                            <p className="text-xs text-muted-foreground">This may take a few seconds</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {!isAnalyzing && (
                      <div className="flex gap-2 justify-center">
                        <Button variant="outline" onClick={resetAnalysis}>
                          Upload New Image
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Analysis Result */}
                {analysisResult && !isAnalyzing && (
                  <div className="mt-6 animate-fade-in">
                    {analysisResult.detected && analysisResult.disease ? (
                      <div className="p-6 rounded-xl bg-gradient-nature border border-border">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="w-6 h-6 text-destructive" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="font-semibold text-foreground">{analysisResult.disease.name}</h3>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(analysisResult.disease.severity)}`}>
                                {analysisResult.disease.severity.toUpperCase()}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                {analysisResult.disease.confidence}% Confidence
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{analysisResult.disease.causes}</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                              <Info className="w-4 h-4 text-warning" /> Symptoms
                            </h4>
                            <ul className="space-y-1">
                              {analysisResult.disease.symptoms.map((symptom, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5" />
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
                              {analysisResult.disease.treatment.slice(0, 4).map((step, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <CheckCircle2 className="w-3 h-3 text-success mt-1 flex-shrink-0" />
                                  {step}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                              <Info className="w-4 h-4 text-primary" /> Prevention
                            </h4>
                            <ul className="space-y-1">
                              {analysisResult.disease.prevention.slice(0, 3).map((tip, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 rounded-xl bg-success/10 border border-success/20 text-center">
                        <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
                        <h3 className="font-semibold text-foreground mb-2">No Major Issues Detected</h3>
                        <p className="text-sm text-muted-foreground">
                          {analysisResult.additionalNotes || "The arecanut appears to be healthy. Continue regular maintenance and monitoring."}
                        </p>
                        {analysisResult.healthyIndicators && analysisResult.healthyIndicators.length > 0 && (
                          <div className="mt-4 text-left">
                            <h4 className="font-medium text-sm mb-2">Healthy Indicators:</h4>
                            <ul className="space-y-1">
                              {analysisResult.healthyIndicators.map((indicator, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <CheckCircle2 className="w-3 h-3 text-success mt-1 flex-shrink-0" />
                                  {indicator}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sample Image */}
            {!selectedImage && (
              <div className="max-w-2xl mx-auto mb-12 text-center">
                <p className="text-sm text-muted-foreground mb-4">Or try with our sample image:</p>
                <button onClick={handleSampleImage} className="inline-block" disabled={isAnalyzing}>
                  <img 
                    src={arecanutImage} 
                    alt="Sample arecanut" 
                    className="w-32 h-32 rounded-xl object-cover border-2 border-border hover:border-primary transition-colors cursor-pointer" 
                  />
                </button>
              </div>
            )}

            {/* Disease Library */}
            <div className="max-w-5xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
                Common Arecanut Diseases Reference
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
