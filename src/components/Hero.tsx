import { Button } from "@/components/ui/button";
import { ArrowRight, Scan, TrendingUp, Cloud } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-arecanut.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Arecanut plantation in Karnataka"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground/90">
              Trusted by 10,000+ Arecanut Farmers
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-slide-up">
            Your Digital Partner for
            <span className="block text-accent mt-2">Smarter Arecanut Farming</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed max-w-2xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Detect diseases early, optimize irrigation, track market prices, and boost your yield by up to 30% with AI-powered insights designed specifically for arecanut cultivation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <Link to="/diseases">
            <Button variant="accent" size="xl" className="group">
              <Scan className="w-5 h-5" />
              Scan Your Arecanut
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
            <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Explore Features
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/diseases" className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20">
              <Scan className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-primary-foreground">Disease Detection</span>
            </Link>
            <Link to="/market" className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-primary-foreground">Market Prices</span>
            </Link>
            <Link to="/weather" className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/20">
              <Cloud className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-primary-foreground">Weather Forecast</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
