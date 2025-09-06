import { Star, GraduationCap, Car, ShoppingBag, Hospital, Coffee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AreaInfoProps {
  location: string;
}

const AreaInfo = ({ location }: AreaInfoProps) => {
  // Mock data based on location
  const getAreaData = (location: string) => {
    const baseData = {
      neighborhoodScore: 85,
      walkScore: 78,
      transitScore: 65,
      schools: [
        { name: "Roosevelt Elementary", rating: 9, distance: "0.3 miles", type: "Elementary" },
        { name: "Lincoln Middle School", rating: 8, distance: "0.7 miles", type: "Middle School" },
        { name: "Washington High School", rating: 9, distance: "1.2 miles", type: "High School" },
      ],
      amenities: [
        { name: "Whole Foods Market", type: "Grocery", distance: "0.4 miles" },
        { name: "Central Park", type: "Recreation", distance: "0.6 miles" },
        { name: "City Medical Center", type: "Healthcare", distance: "1.1 miles" },
        { name: "Downtown Shopping District", type: "Shopping", distance: "1.5 miles" },
      ],
      traffic: {
        rushHourDelay: "12 minutes",
        averageCommute: "25 minutes",
        congestionLevel: "Moderate"
      }
    };

    if (location.includes("Beverly Hills")) {
      return {
        ...baseData,
        neighborhoodScore: 95,
        walkScore: 65,
        transitScore: 55,
      };
    } else if (location.includes("Manhattan")) {
      return {
        ...baseData,
        neighborhoodScore: 92,
        walkScore: 95,
        transitScore: 90,
        traffic: {
          rushHourDelay: "18 minutes",
          averageCommute: "32 minutes",
          congestionLevel: "Heavy"
        }
      };
    } else if (location.includes("Malibu")) {
      return {
        ...baseData,
        neighborhoodScore: 88,
        walkScore: 45,
        transitScore: 25,
        traffic: {
          rushHourDelay: "8 minutes",
          averageCommute: "35 minutes",
          congestionLevel: "Light"
        }
      };
    }

    return baseData;
  };

  const areaData = getAreaData(location);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "Grocery": return <ShoppingBag className="h-4 w-4" />;
      case "Recreation": return <Coffee className="h-4 w-4" />;
      case "Healthcare": return <Hospital className="h-4 w-4" />;
      case "Shopping": return <ShoppingBag className="h-4 w-4" />;
      default: return <Coffee className="h-4 w-4" />;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Neighborhood & Area Info</h2>
      
      {/* Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              <span className="text-sm text-muted-foreground">Neighborhood Score</span>
            </div>
            <div className={`text-3xl font-bold ${getScoreColor(areaData.neighborhoodScore)}`}>
              {areaData.neighborhoodScore}/100
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Coffee className="h-6 w-6 text-blue-500 mr-2" />
              <span className="text-sm text-muted-foreground">Walk Score</span>
            </div>
            <div className={`text-3xl font-bold ${getScoreColor(areaData.walkScore)}`}>
              {areaData.walkScore}/100
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Car className="h-6 w-6 text-green-500 mr-2" />
              <span className="text-sm text-muted-foreground">Transit Score</span>
            </div>
            <div className={`text-3xl font-bold ${getScoreColor(areaData.transitScore)}`}>
              {areaData.transitScore}/100
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Nearby Schools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {areaData.schools.map((school, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                  <div>
                    <h4 className="font-medium">{school.name}</h4>
                    <p className="text-sm text-muted-foreground">{school.type} • {school.distance}</p>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    {school.rating}/10
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Car className="h-5 w-5 mr-2" />
              Traffic & Commute
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rush Hour Delay</span>
                <span className="font-medium">{areaData.traffic.rushHourDelay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Average Commute</span>
                <span className="font-medium">{areaData.traffic.averageCommute}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Congestion Level</span>
                <Badge variant={areaData.traffic.congestionLevel === "Light" ? "secondary" : 
                              areaData.traffic.congestionLevel === "Moderate" ? "default" : "destructive"}>
                  {areaData.traffic.congestionLevel}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amenities - Full Width */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Nearby Amenities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {areaData.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                  <div className="flex items-center">
                    {getIcon(amenity.type)}
                    <div className="ml-3">
                      <h4 className="font-medium">{amenity.name}</h4>
                      <p className="text-sm text-muted-foreground">{amenity.type}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{amenity.distance}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AreaInfo;