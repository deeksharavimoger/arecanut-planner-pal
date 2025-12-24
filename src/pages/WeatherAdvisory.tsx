import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, ArrowUp, ArrowDown } from "lucide-react";
import { Helmet } from "react-helmet-async";

const weatherData = {
  current: {
    location: "Shimoga, Karnataka",
    temp: 28,
    condition: "Partly Cloudy",
    humidity: 72,
    windSpeed: 12,
    rainfall: 0,
  },
  forecast: [
    { day: "Today", high: 30, low: 22, condition: "Partly Cloudy", humidity: 72, rainfall: 0 },
    { day: "Tomorrow", high: 28, low: 21, condition: "Light Rain", humidity: 85, rainfall: 5 },
    { day: "Day After", high: 27, low: 20, condition: "Heavy Rain", humidity: 90, rainfall: 25 },
  ],
  advisories: [
    {
      type: "warning",
      title: "Heavy Rainfall Expected",
      description: "Rainfall expected in next 48 hours. Take preventive measures for Koleroga.",
      action: "Apply Bordeaux mixture preventively",
    },
    {
      type: "info",
      title: "Optimal Spray Time",
      description: "Morning hours (6-9 AM) ideal for pesticide application today.",
      action: "Schedule spraying before 9 AM",
    },
    {
      type: "success",
      title: "Good Irrigation Weather",
      description: "Low rainfall expected today. Good time for scheduled irrigation.",
      action: "Complete pending irrigation tasks",
    },
  ],
  growingConditions: {
    overall: "Moderate",
    details: [
      { factor: "Temperature", status: "Optimal", value: "25-30°C range ideal" },
      { factor: "Humidity", status: "High", value: "Watch for fungal diseases" },
      { factor: "Soil Moisture", status: "Adequate", value: "No irrigation needed today" },
      { factor: "Wind", status: "Low", value: "Good for spraying operations" },
    ],
  },
};

const getConditionIcon = (condition: string) => {
  if (condition.includes("Rain")) return <CloudRain className="w-8 h-8 text-sky" />;
  if (condition.includes("Cloud")) return <Cloud className="w-8 h-8 text-muted-foreground" />;
  return <Sun className="w-8 h-8 text-accent" />;
};

const getAdvisoryStyle = (type: string) => {
  switch (type) {
    case "warning": return "border-warning/30 bg-warning/5";
    case "success": return "border-success/30 bg-success/5";
    default: return "border-sky/30 bg-sky/5";
  }
};

const WeatherAdvisory = () => {
  return (
    <>
      <Helmet>
        <title>Weather Advisory | ArecaWise - Arecanut Weather Forecast</title>
        <meta name="description" content="3-day weather forecast for arecanut farmers. Get growing condition advisories and climate-based recommendations for your plantation." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-sky/10 text-sky text-sm font-medium mb-4">
                Weather Advisory
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Climate-Based Growing Advisories
              </h1>
              <p className="text-muted-foreground text-lg">
                Real-time weather data and expert recommendations to optimize your arecanut cultivation.
              </p>
            </div>

            {/* Current Weather */}
            <Card className="max-w-4xl mx-auto mb-8">
              <CardHeader className="bg-gradient-hero text-primary-foreground">
                <div className="flex items-center justify-between">
                  <div>
                    <CardDescription className="text-primary-foreground/70">Current Weather</CardDescription>
                    <CardTitle className="text-2xl">{weatherData.current.location}</CardTitle>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold">{weatherData.current.temp}°C</div>
                    <div className="text-primary-foreground/80">{weatherData.current.condition}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-muted/50">
                    <Droplets className="w-6 h-6 text-sky mx-auto mb-2" />
                    <div className="font-bold text-lg">{weatherData.current.humidity}%</div>
                    <div className="text-sm text-muted-foreground">Humidity</div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <Wind className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                    <div className="font-bold text-lg">{weatherData.current.windSpeed} km/h</div>
                    <div className="text-sm text-muted-foreground">Wind Speed</div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <CloudRain className="w-6 h-6 text-sky mx-auto mb-2" />
                    <div className="font-bold text-lg">{weatherData.current.rainfall} mm</div>
                    <div className="text-sm text-muted-foreground">Rainfall</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3-Day Forecast */}
            <div className="max-w-4xl mx-auto mb-8">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">3-Day Forecast</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {weatherData.forecast.map((day, index) => (
                  <Card key={day.day} className="overflow-hidden">
                    <CardContent className="p-6 text-center">
                      <div className="font-semibold text-foreground mb-3">{day.day}</div>
                      <div className="mb-3">{getConditionIcon(day.condition)}</div>
                      <div className="text-sm text-muted-foreground mb-2">{day.condition}</div>
                      <div className="flex items-center justify-center gap-4 mb-3">
                        <span className="flex items-center gap-1 text-destructive">
                          <ArrowUp className="w-4 h-4" />
                          {day.high}°
                        </span>
                        <span className="flex items-center gap-1 text-sky">
                          <ArrowDown className="w-4 h-4" />
                          {day.low}°
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded bg-muted/50">
                          <Droplets className="w-3 h-3 mx-auto mb-1 text-sky" />
                          {day.humidity}%
                        </div>
                        <div className="p-2 rounded bg-muted/50">
                          <CloudRain className="w-3 h-3 mx-auto mb-1 text-sky" />
                          {day.rainfall}mm
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Advisories */}
            <div className="max-w-4xl mx-auto mb-8">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Farming Advisories</h2>
              <div className="space-y-4">
                {weatherData.advisories.map((advisory, index) => (
                  <Card key={index} className={`border ${getAdvisoryStyle(advisory.type)}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          advisory.type === 'warning' ? 'bg-warning/20' : 
                          advisory.type === 'success' ? 'bg-success/20' : 'bg-sky/20'
                        }`}>
                          <Cloud className={`w-5 h-5 ${
                            advisory.type === 'warning' ? 'text-warning' : 
                            advisory.type === 'success' ? 'text-success' : 'text-sky'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{advisory.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{advisory.description}</p>
                          <p className="text-sm font-medium text-primary">
                            Recommended: {advisory.action}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Growing Conditions */}
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Thermometer className="w-5 h-5 text-primary" />
                      Growing Conditions
                    </CardTitle>
                    <CardDescription>Current conditions for arecanut cultivation</CardDescription>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-accent/20 text-accent-foreground font-medium text-sm">
                    {weatherData.growingConditions.overall}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {weatherData.growingConditions.details.map((condition) => (
                    <div key={condition.factor} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                      <div>
                        <div className="font-medium text-foreground">{condition.factor}</div>
                        <div className="text-sm text-muted-foreground">{condition.value}</div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        condition.status === 'Optimal' ? 'bg-success/20 text-success' :
                        condition.status === 'High' ? 'bg-warning/20 text-warning' :
                        'bg-primary/20 text-primary'
                      }`}>
                        {condition.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default WeatherAdvisory;
