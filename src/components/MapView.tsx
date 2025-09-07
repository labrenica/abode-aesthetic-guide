import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import type { Property as Listing } from "../types/property";

type Props = {
  listings: Listing[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
};

const containerStyle: React.CSSProperties = { width: "100%", height: "100%" };

export default function MapView({ listings, selectedId, onSelect }: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  const defaultCenter = useMemo(() => {
    // center on the first listing with coords, else LA
    const withCoords = listings.find(l => (l as any).coords && (l as any).coords.lat);
    return withCoords?.coords ?? { lat: 34.0522, lng: -118.2437 };
  }, [listings]);

  if (!isLoaded) return <div className="w-full h-full flex items-center justify-center">Loading map…</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} zoom={11} center={defaultCenter}>
      {listings.map(l => {
        const c = (l as any).coords;
        if (!c?.lat || !c?.lng) return null;
        const isSelected = l.id === selectedId;
        return (
          <Marker
            key={l.id}
            position={{ lat: c.lat, lng: c.lng }}
            onClick={() => onSelect?.(l.id)}
            // Slightly different icon size if selected
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: isSelected ? 10 : 6,
              fillColor: isSelected ? "#1d4ed8" : "#111827",
              fillOpacity: 1,
              strokeWeight: 0,
            }}
          />
        );
      })}
    </GoogleMap>
  );
}
