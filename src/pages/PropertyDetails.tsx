import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Share, MapPin, Bed, Bath, Square, Calendar, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import PropertyStats from "@/components/PropertyStats";
import AreaInfo from "@/components/AreaInfo";
import CommentsSection from "@/components/CommentsSection";
import { Property } from "@/types/property";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern Glass House with Mountain Views",
    location: "Beverly Hills, CA",
    price: 2850000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    type: "Single Family",
    image: property1,
    description: "This stunning modern glass house offers breathtaking mountain views and contemporary design. Featuring floor-to-ceiling windows, an open-concept layout, and premium finishes throughout. The property includes a gourmet kitchen with top-of-the-line appliances, a master suite with panoramic views, and multiple outdoor entertaining spaces.",
    features: ["Swimming Pool", "Home Theater", "Wine Cellar", "3-Car Garage", "Smart Home Technology", "Solar Panels"],
    yearBuilt: 2019,
    lotSize: "0.75 acres"
  },
  {
    id: "2",
    title: "Luxury Penthouse with City Skyline",
    location: "Manhattan, NY",
    price: 4200000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2800,
    type: "Condo",
    image: property2,
    description: "Exceptional penthouse offering unparalleled city skyline views from every room. This luxurious residence features high-end finishes, a private elevator entrance, and a spacious terrace perfect for entertaining.",
    features: ["Private Elevator", "Terrace", "Doorman", "Gym Access", "Rooftop Pool", "Concierge Service"],
    yearBuilt: 2018,
    lotSize: "N/A"
  },
  {
    id: "3",
    title: "Mediterranean Villa with Pool",
    location: "Malibu, CA",
    price: 3650000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4100,
    type: "Villa",
    image: property3,
    description: "Exquisite Mediterranean villa set on a private hillside with ocean views. Features include a resort-style pool, outdoor kitchen, and beautifully landscaped gardens.",
    features: ["Ocean Views", "Infinity Pool", "Outdoor Kitchen", "Wine Tasting Room", "Guest House", "Private Beach Access"],
    yearBuilt: 2017,
    lotSize: "1.2 acres"
  }
];

const PropertyDetails = () => {
  const { id } = useParams();
  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </Link>
        </div>

        {/* Property Image */}
        <div className="relative mb-8 rounded-xl overflow-hidden">
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-96 md:h-[500px] object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="secondary" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon">
              <Share className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute bottom-4 left-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              ${property.price.toLocaleString()}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{property.title}</h1>
              
              <div className="flex items-center text-muted-foreground mb-6">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">{property.location}</span>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">{property.bedrooms} beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">{property.bathrooms} baths</span>
                </div>
                <div className="flex items-center">
                  <Square className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">{property.sqft} sqft</span>
                </div>
                <div className="flex items-center">
                  <Home className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">{property.type}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-muted-foreground">Year Built:</span>
                  <span className="ml-2 font-medium">{property.yearBuilt}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Lot Size:</span>
                  <span className="ml-2 font-medium">{property.lotSize}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.features?.map((feature, index) => (
                  <Badge key={index} variant="outline" className="justify-center py-2">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Property Statistics */}
            <PropertyStats property={property} />

            {/* Area Information */}
            <AreaInfo location={property.location} />

            {/* Comments Section */}
            <CommentsSection propertyId={property.id} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-bold mb-4">Contact Agent</h3>
              <div className="space-y-4">
                <Button className="w-full" size="lg">
                  Schedule Tour
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Contact Agent
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Get Pre-Approved
                </Button>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-bold mb-4">Monthly Payment</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Principal & Interest</span>
                  <span className="font-medium">$12,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Property Tax</span>
                  <span className="font-medium">$2,375</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Insurance</span>
                  <span className="font-medium">$583</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total Monthly</span>
                  <span>$15,805</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyDetails;