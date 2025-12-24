import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, MapPin, IndianRupee, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";

const marketPrices = [
  { mandi: "Shimoga", state: "Karnataka", price: 45200, change: 2.5, quality: "Chali", trend: "up" },
  { mandi: "Sirsi", state: "Karnataka", price: 44800, change: 1.8, quality: "Chali", trend: "up" },
  { mandi: "Mangalore", state: "Karnataka", price: 43500, change: -0.5, quality: "Chali", trend: "down" },
  { mandi: "Udupi", state: "Karnataka", price: 44200, change: 1.2, quality: "Chali", trend: "up" },
  { mandi: "Thrissur", state: "Kerala", price: 46800, change: 3.2, quality: "Chali", trend: "up" },
  { mandi: "Kannur", state: "Kerala", price: 45500, change: -1.0, quality: "Chali", trend: "down" },
  { mandi: "Kozhikode", state: "Kerala", price: 45900, change: 0.8, quality: "Chali", trend: "up" },
  { mandi: "Kasaragod", state: "Kerala", price: 44600, change: 2.0, quality: "Chali", trend: "up" },
];

const collectionHubs = [
  { name: "Shimoga Collection Center", distance: "5 km", address: "Near Bus Stand, Shimoga", timing: "8 AM - 6 PM" },
  { name: "CAMPCO Godown", distance: "8 km", address: "Industrial Area, Shimoga", timing: "9 AM - 5 PM" },
  { name: "Agricultural Market Yard", distance: "12 km", address: "Market Road, Bhadravati", timing: "6 AM - 4 PM" },
  { name: "Farmer Cooperative Society", distance: "3 km", address: "Main Road, Shimoga", timing: "7 AM - 7 PM" },
];

const priceAnalysis = {
  avgPrice: 45063,
  highestMandi: "Thrissur",
  highestPrice: 46800,
  lowestMandi: "Mangalore",
  lowestPrice: 43500,
  weeklyTrend: "upward",
  recommendation: "Current prices are favorable for selling. Thrissur and Shimoga mandis offering best rates.",
};

const MarketPrices = () => {
  return (
    <>
      <Helmet>
        <title>Market Prices | ArecaWise - Live Arecanut Mandi Prices</title>
        <meta name="description" content="Track real-time arecanut prices from Karnataka and Kerala mandis. Find best selling prices and nearest collection hubs." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
                Market Prices
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Live Arecanut Mandi Prices
              </h1>
              <p className="text-muted-foreground text-lg">
                Track real-time prices from major mandis in Karnataka and Kerala. Make informed selling decisions.
              </p>
            </div>

            {/* Price Analysis Summary */}
            <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8">
              <Card className="bg-gradient-hero text-primary-foreground">
                <CardContent className="p-6 text-center">
                  <IndianRupee className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-3xl font-bold">₹{priceAnalysis.avgPrice.toLocaleString()}</div>
                  <div className="text-sm text-primary-foreground/80">Average Price / Quintal</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-success mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">₹{priceAnalysis.highestPrice.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Highest ({priceAnalysis.highestMandi})</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingDown className="w-8 h-8 text-destructive mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">₹{priceAnalysis.lowestPrice.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Lowest ({priceAnalysis.lowestMandi})</div>
                </CardContent>
              </Card>
              <Card className="border-success/30 bg-success/5">
                <CardContent className="p-6 text-center">
                  <ArrowUpRight className="w-8 h-8 text-success mx-auto mb-2" />
                  <div className="text-2xl font-bold text-success">Upward</div>
                  <div className="text-sm text-muted-foreground">Weekly Trend</div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendation */}
            <Card className="max-w-5xl mx-auto mb-8 border-primary/30 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Market Recommendation</h3>
                    <p className="text-muted-foreground">{priceAnalysis.recommendation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Table */}
            <Card className="max-w-5xl mx-auto mb-12 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-primary" />
                  Today's Prices (Chali Quality)
                </CardTitle>
                <CardDescription>Last updated: {new Date().toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-4 font-medium text-muted-foreground">Mandi</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">State</th>
                        <th className="text-right p-4 font-medium text-muted-foreground">Price (₹/Quintal)</th>
                        <th className="text-right p-4 font-medium text-muted-foreground">Change</th>
                        <th className="text-center p-4 font-medium text-muted-foreground">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketPrices.map((item, index) => (
                        <tr key={item.mandi} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium text-foreground">{item.mandi}</span>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground">{item.state}</td>
                          <td className="p-4 text-right font-semibold text-foreground">
                            ₹{item.price.toLocaleString()}
                          </td>
                          <td className="p-4 text-right">
                            <span className={`flex items-center justify-end gap-1 ${item.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                              {item.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                              {Math.abs(item.change)}%
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            {item.trend === 'up' ? (
                              <Badge variant="outline" className="bg-success/10 text-success border-success/30">Rising</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">Falling</Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Collection Hubs */}
            <div className="max-w-5xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Nearby Collection Hubs
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {collectionHubs.map((hub) => (
                  <Card key={hub.name}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-foreground">{hub.name}</h3>
                        <Badge variant="secondary">{hub.distance}</Badge>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {hub.address}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {hub.timing}
                        </div>
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

export default MarketPrices;
