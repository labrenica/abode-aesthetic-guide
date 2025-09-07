import type { Property as Listing, ListingStatus, ListingType } from "../types/property";
import { mockProperties } from "../data/mockProperties";

let cache: Listing[] | null = null;

const TYPE_MAP: Record<string, ListingType> = {
  "single family": "house",
  "single-family": "house",
  "sfh": "house",
  "house": "house",

  "condo": "condo",
  "condominium": "condo",

  "townhome": "townhome",
  "townhouse": "townhome",

  "multi": "multi",
  "multi-family": "multi",
  "multifamily": "multi",
  "duplex": "multi",
  "triplex": "multi",
  "fourplex": "multi",

  "land": "land",
  "lot": "land",
};

function normalizeType(v: unknown): ListingType {
  if (!v) return "other";
  const k = String(v).trim().toLowerCase();
  return TYPE_MAP[k] ?? "other";
}

function loadAll(): Listing[] {
  if (cache) return cache;
  cache = mockProperties.map(p => ({ ...p, type: normalizeType(p.type) }));
  return cache;
}

export async function getListings(): Promise<Listing[]> {
  return loadAll();
}

export async function getListingById(id: string): Promise<Listing | undefined> {
  return loadAll().find(l => l.id === id);
}

// Simple filter used on the Listings page
export async function searchListings(filters: {
  city?: string;
  state?: string;
  priceMin?: number;
  priceMax?: number;
  bedsMin?: number;
  bathsMin?: number;
  type?: ListingType;
  status?: ListingStatus;
  text?: string;
} = {}) {
  const all = loadAll();
  const f = filters;
  const norm = (s?: string) => (s ?? "").toLowerCase();

  return all.filter(l => {
    const city = (l as any).city ?? "";
    const state = (l as any).state ?? "";
    if (f.city && norm(city) !== norm(f.city)) return false;
    if (f.state && norm(state) !== norm(f.state)) return false;

    if (f.type && l.type !== f.type) return false;
    if (f.status && (l as any).status && (l as any).status !== f.status) return false;

    if (typeof f.priceMin === "number" && l.price < f.priceMin) return false;
    if (typeof f.priceMax === "number" && l.price > f.priceMax) return false;

    if (typeof f.bedsMin === "number" && l.bedrooms < f.bedsMin) return false;
    if (typeof f.bathsMin === "number" && l.bathrooms < f.bathsMin) return false;

    if (f.text) {
      const address = ("address" in l)
        ? `${(l as any).address} ${city} ${state}`
        : (l as any).location ?? "";
      const hay = `${l.title} ${address} ${l.description ?? ""}`.toLowerCase();
      if (!hay.includes(f.text.toLowerCase())) return false;
    }

    return true;
  });
}
