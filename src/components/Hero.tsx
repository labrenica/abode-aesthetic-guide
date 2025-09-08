import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import heroProperty from "@/assets/hero-property.jpg";

// add these
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";





const Hero = () => {
  
  const navigate = useNavigate();
  
  const [q, setQ] = useState("");

  const isEmpty = q.trim() === "";
  
  const onSubmit = (e: FormEvent) => {
  
    e.preventDefault();
  
    const query = q.trim();
    if (!query) return;            
    const params = new URLSearchParams();
    params.set("text", query);
    navigate(`/listings?${params.toString()}`);
  };

const goQuick = (text: string) => {
    const params = new URLSearchParams();
    if (text) params.set("text", text);
    navigate(`/listings?${params.toString()}`);
  };
  
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
            <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                </span>
                <Input
                  placeholder= "Enter location, neighborhood, or ZIP code"
                  className="pl-10 h-12 border-0 bg-background"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  autoComplete="off"
                  inputMode="search"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8 bg-hero-gradient hover:opacity-90 transition-smooth">
                <Search className="mr-2 h-5 w-5" />
                Search Homes
              </Button>
            </form>
            
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <button className="text-primary hover:underline" onClick={() => goQuick("Downtown")}>
                Popular: Downtown
              </button>
              <button className="text-primary hover:underline" onClick={() => goQuick("Luxury Condos")}>
                Luxury Condos
              </button>
              <button className="text-primary hover:underline" onClick={() => goQuick("Family Homes")}>
                Family Homes
              </button>
              <button className="text-primary hover:underline" onClick={() => goQuick("Waterfront")}>
                Waterfront
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;