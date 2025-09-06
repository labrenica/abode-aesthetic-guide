export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  image: string;
  description?: string;
  features?: string[];
  yearBuilt?: number;
  lotSize?: string;
}