import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import DiseaseGuide from "./pages/DiseaseGuide";
import PestManagement from "./pages/PestManagement";
import WeatherAdvisory from "./pages/WeatherAdvisory";
import MarketPrices from "./pages/MarketPrices";
import PlantingGuide from "./pages/PlantingGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/diseases" element={<DiseaseGuide />} />
            <Route path="/pests" element={<PestManagement />} />
            <Route path="/weather" element={<WeatherAdvisory />} />
            <Route path="/market" element={<MarketPrices />} />
            <Route path="/planting" element={<PlantingGuide />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
