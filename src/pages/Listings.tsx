import { useEffect, useMemo, useState } from "react";
import { searchListings } from "../lib/api";
import type { Property as Listing } from "../types/property";
import MapView from "../components/MapView";
import FilterBar, { type FilterState } from "../components/FilterBar";
import { Link } from "react-router-dom";

export default function Listings() {
  const [filters, setFilters] = useState<FilterState>({});
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    searchListings(filters)
      .then(ds => {
        setListings(ds as Listing[]);
        // keep selection visible if still in results
        if (selectedId && !ds.find(d => d.id === selectedId)) setSelectedId(null);
      })
      .catch(e => setErr(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, [filters]); // eslint-disable-line

  const onCardHover = (id?: string) => setSelectedId(id ?? null);

  const rightPane = useMemo(() => (
    <div className="h-full overflow-y-auto p-3 space-y-3">
      {loading && <div>Loading listings…</div>}
      {err && <div className="text-red-600">Error: {err}</div>}
      {!loading && !err && listings.length === 0 && <div>No results.</div>}
      {listings.map(l => (
        <Link
          to={`/property/${l.id}`}
          key={l.id}
          onMouseEnter={() => onCardHover(l.id)}
          onMouseLeave={() => onCardHover(undefined)}
          className={`block border rounded-lg overflow-hidden hover:shadow transition ${
            selectedId === l.id ? "ring-2 ring-blue-500" : ""
          }`}
        >
          <img
            src={(l as any).images?.[0] ?? (l as any).image}
            alt={l.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-3">
            <div className="font-medium">{l.title}</div>
            <div className="text-sm text-gray-600">
              {"address" in l
                ? `${(l as any).address}, ${(l as any).city}, ${(l as any).state} ${(l as any).zip}`
                : (l as any).location}
            </div>
            <div className="mt-1 font-semibold">${l.price.toLocaleString()}</div>
            <div className="text-sm">
              {l.bedrooms} bd · {l.bathrooms} ba · {l.sqft.toLocaleString()} sqft
            </div>
          </div>
        </Link>
      ))}
    </div>
  ), [listings, loading, err, selectedId]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]"> {/* adjust header height if needed */}
      <div className="p-3 border-b bg-white sticky top-0 z-10">
        <FilterBar value={filters} onChange={setFilters} />
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Map (left) */}
        <div className="w-1/2 border-r">
          <div className="h-full">
            <MapView listings={listings} selectedId={selectedId} onSelect={setSelectedId} />
          </div>
        </div>

        {/* Results (right) */}
        <div className="w-1/2">
          {rightPane}
        </div>
      </div>
    </div>
  );
}
