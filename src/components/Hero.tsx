import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import heroProperty from "@/assets/hero-property.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroProperty} 
          alt="Luxury property" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your
            <span className="block bg-hero-gradient bg-clip-text text-transparent">
              Dream Home
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Discover exceptional properties with our curated collection of homes, 
            designed for those who appreciate elegance and comfort.
          </p>
          
          {/* Search Form */}
          <div className="bg-card/90 backdrop-blur-sm p-6 rounded-2xl shadow-property-card">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Enter location, neighborhood, or ZIP code"
                  className="pl-10 h-12 border-0 bg-background"
                />
              </div>
              <Button size="lg" className="h-12 px-8 bg-hero-gradient hover:opacity-90 transition-smooth">
                <Search className="mr-2 h-5 w-5" />
                Search Homes
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <button className="text-primary hover:underline">Popular: Downtown</button>
              <button className="text-primary hover:underline">Luxury Condos</button>
              <button className="text-primary hover:underline">Family Homes</button>
              <button className="text-primary hover:underline">Waterfront</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;