import { useEffect, useMemo, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { mockProperties } from "@/data/mockProperties";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react"; // optional icon

// If your properties have a different coords shape, adjust here.
type Coords = { lat: number; lng: number };
type HasCoords = { coords?: Coords };
type Prop = (typeof mockProperties)[number] & HasCoords;

// Haversine distance in miles (approx)
function distanceMiles(a: Coords, b: Coords) {
  const R = 3958.8; // Earth radius in miles
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) *
      Math.sin(dLng / 2) *
      Math.cos(lat1) *
      Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}

const SCROLL_CONTAINER =
  "flex gap-4 overflow-x-auto py-2 -mx-4 px-4 md:-mx-0 md:px-0 snap-x snap-mandatory";
const SCROLL_ITEM =
  "snap-start shrink-0 w-[280px] sm:w-[320px]";

const SeeMoreTile = () => (
  <div className={`${SCROLL_ITEM} flex items-center justify-center`}>
    <Link to="/listings" className="block">
      <Button
        variant="outline"
        size="lg"
        className="inline-flex items-center gap-1 hover:bg-primary hover:text-primary-foreground transition-smooth"
        aria-label="See more listings"
      >
        See more <ChevronRight className="h-4 w-4" />
      </Button>
    </Link>
  </div>
);


const PropertyGrid = () => {
  // 1) Featured (cap at 9)
  const featured = useMemo<Prop[]>(
    () => (mockProperties as Prop[]).slice(0, 9),
    []
  );

  // 2) Nearby properties (based on browser geolocation + coords on properties)
  const [userCoords, setUserCoords] = useState<Coords | null>(null);
  const [nearby, setNearby] = useState<Prop[]>([]);
  const [geoError, setGeoError] = useState<string | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setGeoError("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        setGeoError(err.message || "Unable to get your location.");
      },
      { enableHighAccuracy: false, timeout: 8000 }
    );
  }, []);

  useEffect(() => {
    if (!userCoords) return;
    // Only consider properties that have coords
    const withCoords = (mockProperties as Prop[]).filter(
      (p) => p.coords && typeof p.coords.lat === "number" && typeof p.coords.lng === "number"
    );
    const ranked = withCoords
      .map((p) => ({
        prop: p,
        dist: distanceMiles(userCoords, p.coords as Coords),
      }))
      .sort((a, b) => a.dist - b.dist)
      .map((x) => x.prop)
      .slice(0, 12);
    setNearby(ranked);
  }, [userCoords]);

  // 3) Recently viewed (IDs stored in localStorage by your details page)
  const [recent, setRecent] = useState<Prop[]>([]);

  useEffect(() => {
    try {
      // Try a couple of common keys; adjust to your app’s key if different.
      const raw =
        localStorage.getItem("recentlyViewed") ||
        localStorage.getItem("recentlyViewedProperties") ||
        "[]";
      const ids: string[] = JSON.parse(raw);
      // Deduplicate while preserving order
      const seen = new Set<string>();
      const dedupedIds = ids.filter((id) => (seen.has(id) ? false : (seen.add(id), true)));
      // Map to property objects
      const map = new Map<string, Prop>(
        (mockProperties as Prop[]).map((p) => [String((p as any).id), p])
      );
      const found = dedupedIds
        .map((id) => map.get(String(id)))
        .filter(Boolean) as Prop[];
      setRecent(found.slice(0, 12));
    } catch {
      setRecent([]);
    }
  }, []);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Featured */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our handpicked selection of exceptional homes in prime locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((property) => (
            <PropertyCard key={(property as any).id} property={property} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground transition-smooth"
          >
            View All Properties
          </Button>
        </div>

        {/* Nearby You (only render if we have results or we want to show a prompt) */}
        {(nearby.length > 0 || !userCoords) && (
          <div className="mt-16">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-2xl font-semibold">Nearby you</h3>
              {!userCoords && !geoError && (
                <span className="text-sm text-muted-foreground">
                  Enable location to personalize this row
                </span>
              )}
              {geoError && (
                <span className="text-sm text-muted-foreground">{geoError}</span>
              )}
            </div>
             <div className={SCROLL_CONTAINER}>
                {(nearby.length ? nearby : featured).map((p) => (
                  <div key={(p as any).id} className={SCROLL_ITEM}>
                    <PropertyCard property={p} />
                  </div>
                ))}
                {/* See more tile */}
                <SeeMoreTile />
              </div>
          </div>
        )}

        {/* Recently Viewed (only if we have any) */}
        {recent.length > 0 && (
          <div className="mt-12">
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-2xl font-semibold">Recently viewed</h3>
              <span className="text-sm text-muted-foreground">
                Based on your recent activity
              </span>
            </div>
            <div className={SCROLL_CONTAINER}>
                {recent.map((p) => (
                  <div key={(p as any).id} className={SCROLL_ITEM}>
                    <PropertyCard property={p} />
                  </div>
                ))}
                {/* See more tile */}
                <SeeMoreTile />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyGrid;
