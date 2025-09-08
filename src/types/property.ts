export type ListingStatus = "active" | "pending" | "sold";
export type ListingType = "house" | "condo" | "townhome" | "apartment" | "land" | "other";

export interface Property {
  id: string;
  title: string;
  // New: slug for SEO/URLs
  slug?: string;

  // Break down location
  address: string;
  city: string;
  state: string;
  zip: string;
  

  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;

  type: ListingType;
  status?: ListingStatus;

  image?: string;      // keep for backwards compatibility
  images?: string[];    // gallery

  description?: string;
  features?: string[];
  yearBuilt?: number;
  lotSize?: string;

  daysOnMarket?: number;
  coords?: { lat: number; lng: number };
  hoa?: number;
  taxes?: number;
  updatedAt?: string;
}
