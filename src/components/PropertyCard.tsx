import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
}

const PropertyCard = ({ property, onFavorite }: PropertyCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-property-card hover:shadow-property-card-hover transition-smooth bg-card">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-smooth"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-background/80 hover:bg-background text-foreground"
          onClick={() => onFavorite?.(property.id)}
        >
          <Heart className="h-4 w-4" />
        </Button>
        <div className="absolute bottom-3 left-3">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            ${property.price.toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{property.title}</h3>
        
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} baths</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.sqft} sqft</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{property.type}</span>
          <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-smooth">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;