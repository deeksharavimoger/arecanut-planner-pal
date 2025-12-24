import { TrendingUp, Users, Leaf, Shield } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Active Farmers",
    description: "Trusted across Karnataka & Kerala",
  },
  {
    icon: TrendingUp,
    value: "30%",
    label: "Yield Improvement",
    description: "Average increase in productivity",
  },
  {
    icon: Leaf,
    value: "5,000+",
    label: "Hectares Covered",
    description: "Arecanut plantations monitored",
  },
  {
    icon: Shield,
    value: "95%",
    label: "Disease Detection",
    description: "Accuracy in identifying issues",
  },
];

const Statistics = () => {
  return (
    <section className="py-20 bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 mb-4">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="font-display text-3xl md:text-4xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="font-semibold text-lg mb-1">{stat.label}</div>
              <div className="text-sm text-primary-foreground/70">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
