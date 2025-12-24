import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Statistics from "@/components/Statistics";
import ProblemSolution from "@/components/ProblemSolution";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>ArecaWise - Smart Arecanut Farming | Disease Detection & Market Prices</title>
        <meta name="description" content="AI-powered platform for arecanut farmers. Detect diseases early, track market prices, get weather advisories, and boost your yield by 30%. Trusted by 10,000+ farmers in Karnataka & Kerala." />
        <meta name="keywords" content="arecanut farming, betel nut, disease detection, Koleroga, Yellow Leaf Disease, market prices, Karnataka farmers, Kerala farmers" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Statistics />
          <ProblemSolution />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
