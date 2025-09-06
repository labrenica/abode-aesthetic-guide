import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Share, MapPin, Bed, Bath, Square, Calendar, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import PropertyStats from "@/components/PropertyStats";
import AreaInfo from "@/components/AreaInfo";
import CommentsSection from "@/components/CommentsSection";
import { mockProperties } from "@/data/mockProperties";

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