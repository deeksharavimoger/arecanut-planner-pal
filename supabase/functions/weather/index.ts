import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Karnataka & Kerala cities with approximate coordinates
const LOCATIONS: Record<string, { lat: number; lon: number; state: string }> = {
  "Shimoga": { lat: 13.9299, lon: 75.5681, state: "Karnataka" },
  "Sirsi": { lat: 14.6177, lon: 74.8347, state: "Karnataka" },
  "Mangalore": { lat: 12.9141, lon: 74.8560, state: "Karnataka" },
  "Udupi": { lat: 13.3409, lon: 74.7421, state: "Karnataka" },
  "Thrissur": { lat: 10.5276, lon: 76.2144, state: "Kerala" },
  "Kannur": { lat: 11.8745, lon: 75.3704, state: "Kerala" },
  "Kozhikode": { lat: 11.2588, lon: 75.7804, state: "Kerala" },
  "Kasaragod": { lat: 12.4996, lon: 74.9869, state: "Kerala" },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { location } = await req.json();
    const selectedLocation = location || "Shimoga";
    const coords = LOCATIONS[selectedLocation] || LOCATIONS["Shimoga"];

    console.log(`Fetching weather for ${selectedLocation}: ${coords.lat}, ${coords.lon}`);

    // Using Open-Meteo API (free, no API key required)
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,relative_humidity_2m_mean&timezone=Asia/Kolkata&forecast_days=3`;

    const response = await fetch(weatherUrl);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Weather data received:", JSON.stringify(data).substring(0, 200));

    // Map weather codes to conditions
    const getCondition = (code: number): string => {
      if (code === 0) return "Clear Sky";
      if (code <= 3) return "Partly Cloudy";
      if (code <= 49) return "Foggy";
      if (code <= 59) return "Drizzle";
      if (code <= 69) return "Light Rain";
      if (code <= 79) return "Heavy Rain";
      if (code <= 82) return "Rain Showers";
      if (code <= 86) return "Snow";
      if (code >= 95) return "Thunderstorm";
      return "Cloudy";
    };

    // Generate farming advisories based on weather
    const generateAdvisories = (current: any, daily: any) => {
      const advisories = [];
      
      // Check for rain
      const rainExpected = daily.precipitation_sum.slice(0, 3).some((p: number) => p > 10);
      if (rainExpected) {
        advisories.push({
          type: "warning",
          title: "Heavy Rainfall Expected",
          description: "Significant rainfall predicted in the next 48 hours. Take preventive measures for Koleroga.",
          action: "Apply Bordeaux mixture preventively before rain",
        });
      }

      // Check humidity
      if (current.relative_humidity_2m > 80) {
        advisories.push({
          type: "warning",
          title: "High Humidity Alert",
          description: "Current humidity is above 80%. Increased risk of fungal diseases.",
          action: "Monitor crown for fungal growth and ensure good drainage",
        });
      } else if (current.relative_humidity_2m < 60) {
        advisories.push({
          type: "info",
          title: "Low Humidity - Good for Spraying",
          description: "Morning hours ideal for pesticide application today.",
          action: "Schedule spraying before 9 AM for best results",
        });
      }

      // Check temperature
      if (current.temperature_2m > 35) {
        advisories.push({
          type: "warning",
          title: "High Temperature Alert",
          description: "Temperature exceeds 35°C. Palms may experience heat stress.",
          action: "Ensure adequate irrigation and mulching",
        });
      }

      // Check wind
      if (current.wind_speed_10m < 10) {
        advisories.push({
          type: "success",
          title: "Ideal Spraying Conditions",
          description: "Low wind speed is perfect for pesticide and fungicide spraying.",
          action: "Complete any pending spray operations today",
        });
      }

      // Check for no rain
      if (daily.precipitation_sum[0] === 0 && daily.precipitation_sum[1] === 0) {
        advisories.push({
          type: "info",
          title: "Good Irrigation Weather",
          description: "No rainfall expected. Good time for scheduled irrigation.",
          action: "Complete pending irrigation tasks",
        });
      }

      return advisories.slice(0, 4); // Return max 4 advisories
    };

    // Generate growing conditions
    const getGrowingConditions = (current: any) => {
      const conditions = [];
      
      // Temperature
      const temp = current.temperature_2m;
      conditions.push({
        factor: "Temperature",
        status: temp >= 25 && temp <= 32 ? "Optimal" : temp < 20 || temp > 38 ? "Poor" : "Moderate",
        value: `${temp}°C (Ideal: 25-32°C)`,
      });

      // Humidity
      const humidity = current.relative_humidity_2m;
      conditions.push({
        factor: "Humidity",
        status: humidity >= 70 && humidity <= 85 ? "Optimal" : humidity > 90 ? "High" : humidity < 50 ? "Low" : "Moderate",
        value: `${humidity}% (Watch for ${humidity > 85 ? "fungal diseases" : "water stress"})`,
      });

      // Rainfall
      conditions.push({
        factor: "Rainfall",
        status: current.precipitation > 0 ? "Active" : "None",
        value: current.precipitation > 0 ? `${current.precipitation}mm currently` : "No rainfall now",
      });

      // Wind
      const wind = current.wind_speed_10m;
      conditions.push({
        factor: "Wind",
        status: wind < 15 ? "Low" : wind < 30 ? "Moderate" : "High",
        value: `${wind} km/h - ${wind < 15 ? "Good for spraying" : "Avoid spraying"}`,
      });

      return conditions;
    };

    // Calculate overall condition
    const getOverallCondition = (current: any): string => {
      const temp = current.temperature_2m;
      const humidity = current.relative_humidity_2m;
      const rain = current.precipitation;
      
      let score = 0;
      if (temp >= 25 && temp <= 32) score += 2;
      else if (temp >= 20 && temp <= 38) score += 1;
      
      if (humidity >= 65 && humidity <= 85) score += 2;
      else if (humidity >= 50 && humidity <= 90) score += 1;
      
      if (rain === 0) score += 1;
      
      if (score >= 4) return "Excellent";
      if (score >= 3) return "Good";
      if (score >= 2) return "Moderate";
      return "Poor";
    };

    const weatherResponse = {
      location: selectedLocation,
      state: coords.state,
      current: {
        temp: Math.round(data.current.temperature_2m),
        humidity: data.current.relative_humidity_2m,
        condition: getCondition(data.current.weather_code),
        windSpeed: Math.round(data.current.wind_speed_10m),
        rainfall: data.current.precipitation || 0,
      },
      forecast: data.daily.time.slice(0, 3).map((date: string, i: number) => ({
        day: i === 0 ? "Today" : i === 1 ? "Tomorrow" : "Day After",
        date,
        high: Math.round(data.daily.temperature_2m_max[i]),
        low: Math.round(data.daily.temperature_2m_min[i]),
        condition: getCondition(data.daily.weather_code[i]),
        humidity: data.daily.relative_humidity_2m_mean[i],
        rainfall: Math.round(data.daily.precipitation_sum[i]),
      })),
      advisories: generateAdvisories(data.current, data.daily),
      growingConditions: {
        overall: getOverallCondition(data.current),
        details: getGrowingConditions(data.current),
      },
      lastUpdated: new Date().toISOString(),
    };

    return new Response(JSON.stringify(weatherResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Weather function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Failed to fetch weather" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
