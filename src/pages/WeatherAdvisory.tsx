import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, ArrowUp, ArrowDown, RefreshCw, MapPin } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface WeatherData {
  location: string;
  state: string;
  current: {
    temp: number;
    humidity: number;
    condition: string;
    windSpeed: number;
    rainfall: number;
  };
  forecast: Array<{
    day: string;
    date: string;
    high: number;
    low: number;
    condition: string;
    humidity: number;
    rainfall: number;
  }>;
  advisories: Array<{
    type: "warning" | "info" | "success";
    title: string;
    description: string;
    action: string;
  }>;
  growingConditions: {
    overall: string;
    details: Array<{
      factor: string;
      status: string;
      value: string;
    }>;
  };
  lastUpdated: string;
}

const locations = [
  "Shimoga", "Sirsi", "Mangalore", "Udupi",
  "Thrissur", "Kannur", "Kozhikode", "Kasaragod"
];

const getConditionIcon = (condition: string) => {
  if (condition.includes("Rain") || condition.includes("Shower") || condition.includes("Drizzle")) 
    return <CloudRain className="w-8 h-8 text-sky" />;
  if (condition.includes("Cloud") || condition.includes("Fog")) 
    return <Cloud className="w-8 h-8 text-muted-foreground" />;
  if (condition.includes("Thunder")) 
    return <CloudRain className="w-8 h-8 text-warning" />;
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
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState("Shimoga");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWeather = async (location: string, isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("weather", {
        body: { location },
      });

      if (error) throw error;
      setWeatherData(data);
    } catch (error: any) {
      console.error("Weather fetch error:", error);
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedLocation);
  }, [selectedLocation]);

  // Auto-refresh every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchWeather(selectedLocation, true);
    }, 600000);
    return () => clearInterval(interval);
  }, [selectedLocation]);

  return (
    <>
      <Helmet>
        <title>Live Weather Advisory | ArecaWise - Real-Time Arecanut Weather</title>
        <meta name="description" content="Real-time weather forecast for arecanut farmers. Get live growing condition advisories and climate-based recommendations." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky/10 text-sky text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Live Weather
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Real-Time Climate Advisories
              </h1>
              <p className="text-muted-foreground text-lg">
                Live weather data and expert recommendations to optimize your arecanut cultivation.
              </p>
            </div>

            {/* Location Selector */}
            <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-medium">Select Location:</span>
              </div>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => fetchWeather(selectedLocation, true)}
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>

            {loading ? (
              <div className="max-w-4xl mx-auto text-center py-20">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading weather data...</p>
              </div>
            ) : weatherData ? (
              <>
                {/* Current Weather */}
                <Card className="max-w-4xl mx-auto mb-8">
                  <CardHeader className="bg-gradient-hero text-primary-foreground">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardDescription className="text-primary-foreground/70">Current Weather</CardDescription>
                        <CardTitle className="text-2xl">{weatherData.location}, {weatherData.state}</CardTitle>
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
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Last updated: {new Date(weatherData.lastUpdated).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>

                {/* 3-Day Forecast */}
                <div className="max-w-4xl mx-auto mb-8">
                  <h2 className="font-display text-xl font-bold text-foreground mb-4">3-Day Forecast</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {weatherData.forecast.map((day) => (
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
                {weatherData.advisories.length > 0 && (
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
                )}

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
                      <span className={`px-3 py-1 rounded-full font-medium text-sm ${
                        weatherData.growingConditions.overall === "Excellent" ? "bg-success/20 text-success" :
                        weatherData.growingConditions.overall === "Good" ? "bg-primary/20 text-primary" :
                        weatherData.growingConditions.overall === "Moderate" ? "bg-accent/20 text-accent-foreground" :
                        "bg-destructive/20 text-destructive"
                      }`}>
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
                            condition.status === 'High' || condition.status === 'Low' ? 'bg-warning/20 text-warning' :
                            condition.status === 'Poor' ? 'bg-destructive/20 text-destructive' :
                            'bg-primary/20 text-primary'
                          }`}>
                            {condition.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="max-w-4xl mx-auto text-center py-20">
                <Cloud className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Unable to load weather data</p>
                <Button className="mt-4" onClick={() => fetchWeather(selectedLocation)}>
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default WeatherAdvisory;
