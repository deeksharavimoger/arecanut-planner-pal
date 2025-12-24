import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scan, Bug, Cloud, TrendingUp, Droplets, MapPin, Sprout, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Scan,
    title: "Disease Detection",
    description: "Upload images of your arecanut to identify Koleroga, Yellow Leaf Disease, Bud Rot, and more with AI-powered analysis.",
    link: "/diseases",
    color: "bg-destructive/10 text-destructive",
  },
  {
    icon: Bug,
    title: "Pest Management",
    description: "Learn about spindle bugs, mites, root grubs and get expert-backed treatment recommendations.",
    link: "/pests",
    color: "bg-warning/10 text-warning",
  },
  {
    icon: Cloud,
    title: "Weather Advisory",
    description: "Get 3-day weather forecasts and climate-based growing condition advisories for optimal cultivation.",
    link: "/weather",
    color: "bg-sky/10 text-sky",
  },
  {
    icon: TrendingUp,
    title: "Market Prices",
    description: "Track real-time arecanut prices from local mandis and make informed selling decisions.",
    link: "/market",
    color: "bg-success/10 text-success",
  },
  {
    icon: Droplets,
    title: "Irrigation Planner",
    description: "Smart irrigation scheduling based on soil moisture, weather, and crop growth stage.",
    link: "/planting",
    color: "bg-sky/10 text-sky",
  },
  {
    icon: Sprout,
    title: "Fertilizer Guide",
    description: "Get personalized fertilizer recommendations based on soil health and growth requirements.",
    link: "/planting",
    color: "bg-leaf/10 text-leaf",
  },
  {
    icon: MapPin,
    title: "Collection Hubs",
    description: "Find nearest arecanut collection centers and storage facilities in your area.",
    link: "/market",
    color: "bg-secondary/20 text-secondary",
  },
  {
    icon: BookOpen,
    title: "Planting Guide",
    description: "Complete step-by-step guide for arecanut cultivation from seedling to harvest.",
    link: "/planting",
    color: "bg-primary/10 text-primary",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gradient-nature">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for Successful Arecanut Farming
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive digital tools designed specifically for arecanut farmers to improve yield, reduce losses, and maximize profits.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              to={feature.link}
              className="group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="h-full hover:-translate-y-2 transition-all duration-300 cursor-pointer border-transparent hover:border-primary/20">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
