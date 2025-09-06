import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
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
  },
  {
    id: "4",
    title: "Contemporary Townhouse",
    location: "San Francisco, CA",
    price: 1950000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2200,
    type: "Townhouse",
    image: property1,
  },
  {
    id: "5",
    title: "Waterfront Luxury Condo",
    location: "Miami, FL",
    price: 2750000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    type: "Condo",
    image: property2,
  },
  {
    id: "6",
    title: "Designer Estate Home",
    location: "Austin, TX",
    price: 3200000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3600,
    type: "Single Family",
    image: property3,
  },
];

const PropertyGrid = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our handpicked selection of exceptional homes in prime locations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-smooth">
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;