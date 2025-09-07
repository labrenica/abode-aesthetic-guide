import { Button } from "@/components/ui/button";
import { Search, Heart, User } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 h-16 w-full  bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-primary">EliteHomes</h1>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-foreground hover:text-primary transition-colors">Buy</a>
            <a href="/" className="text-foreground hover:text-primary transition-colors">Rent</a>
            <a href="/" className="text-foreground hover:text-primary transition-colors">Sell</a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button className="hidden sm:flex">Sign In</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;