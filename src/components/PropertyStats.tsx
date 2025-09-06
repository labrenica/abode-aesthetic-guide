import { TrendingUp, Calendar, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Property } from "@/types/property";

interface PropertyStatsProps {
  property: Property;
}

const PropertyStats = ({ property }: PropertyStatsProps) => {
  // Mock data for property statistics
  const stats = {
    priceHistory: [
      { date: "2024-01", price: property.price },
      { date: "2023-01", price: property.price * 0.95 },
      { date: "2022-01", price: property.price * 0.88 },
    ],
    daysOnMarket: 45,
    viewsThisWeek: 234,
    pricePerSqft: Math.round(property.price / property.sqft),
    appreciation: 12.5,
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Property Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Price/Sqft</p>
                <p className="text-2xl font-bold">${stats.pricePerSqft}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Days on Market</p>
                <p className="text-2xl font-bold">{stats.daysOnMarket}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Views This Week</p>
                <p className="text-2xl font-bold">{stats.viewsThisWeek}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">5-Year Appreciation</p>
                <p className="text-2xl font-bold text-green-600">+{stats.appreciation}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Price History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.priceHistory.map((entry, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <span className="text-muted-foreground">{entry.date}</span>
                <span className="font-medium">${entry.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyStats;