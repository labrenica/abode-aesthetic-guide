import { useEffect, useMemo, useState } from "react";
import type { ListingStatus, ListingType } from "../types/property";

export type FilterState = {
  city?: string;
  state?: string;
  priceMin?: number;
  priceMax?: number;
  bedsMin?: number;
  bathsMin?: number;
  type?: ListingType;
  status?: ListingStatus;
  text?: string;
};
type Props = {
  value: FilterState;
  onChange: (next: FilterState) => void;
};

export default function FilterBar({ value, onChange }: Props) {
  const [city, setCity] = useState(value.city ?? "");
  const [state, setState] = useState(value.state ?? "");
  const [priceMin, setPriceMin] = useState(value.priceMin?.toString() ?? "");
  const [priceMax, setPriceMax] = useState(value.priceMax?.toString() ?? "");
  const [bedsMin, setBedsMin] = useState(value.bedsMin?.toString() ?? "");
  const [bathsMin, setBathsMin] = useState(value.bathsMin?.toString() ?? "");
  const [type, setType] = useState(value.type ?? "");
  const [status, setStatus] = useState(value.status ?? "");
  const [text, setText] = useState(value.text ?? "");

  useEffect(() => {
    setCity(value.city ?? "");
    setState(value.state ?? "");
    setPriceMin(value.priceMin?.toString() ?? "");
    setPriceMax(value.priceMax?.toString() ?? "");
    setBedsMin(value.bedsMin?.toString() ?? "");
    setBathsMin(value.bathsMin?.toString() ?? "");
    setType(value.type ?? "");
    setStatus(value.status ?? "");
    setText(value.text ?? "");
  }, [value]);

  const next = useMemo<FilterState>(() => ({
    city: city || undefined,
    state: state || undefined,
    priceMin: priceMin ? Number(priceMin) : undefined,
    priceMax: priceMax ? Number(priceMax) : undefined,
    bedsMin: bedsMin ? Number(bedsMin) : undefined,
    bathsMin: bathsMin ? Number(bathsMin) : undefined,
    Type: (type || undefined) as ListingType | undefined,
    Status: (status || undefined) as ListingStatus | undefined,
    text: text || undefined,
  }), [city, state, priceMin, priceMax, bedsMin, bathsMin, type, status, text]);

  useEffect(() => onChange(next), [next, onChange]);

  return (
    <div className="flex flex-wrap gap-2 items-end border rounded-lg p-3 bg-white">
      <div className="flex flex-col">
        <label className="text-xs text-gray-500">Search</label>
        <input className="border rounded px-2 py-1" value={text} onChange={e => setText(e.target.value)} placeholder="Address, title…" />
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-500">City</label>
        <input className="border rounded px-2 py-1" value={city} onChange={e => setCity(e.target.value)} placeholder="Los Angeles" />
      </div>
      <div className="flex flex-col w-20">
        <label className="text-xs text-gray-500">State</label>
        <input className="border rounded px-2 py-1" value={state} onChange={e => setState(e.target.value)} placeholder="CA" />
      </div>
      <div className="flex flex-col w-28">
        <label className="text-xs text-gray-500">Min $</label>
        <input className="border rounded px-2 py-1" inputMode="numeric" value={priceMin} onChange={e => setPriceMin(e.target.value)} />
      </div>
      <div className="flex flex-col w-28">
        <label className="text-xs text-gray-500">Max $</label>
        <input className="border rounded px-2 py-1" inputMode="numeric" value={priceMax} onChange={e => setPriceMax(e.target.value)} />
      </div>
      <div className="flex flex-col w-20">
        <label className="text-xs text-gray-500">Beds ≥</label>
        <input className="border rounded px-2 py-1" inputMode="numeric" value={bedsMin} onChange={e => setBedsMin(e.target.value)} />
      </div>
      <div className="flex flex-col w-20">
        <label className="text-xs text-gray-500">Baths ≥</label>
        <input className="border rounded px-2 py-1" inputMode="numeric" value={bathsMin} onChange={e => setBathsMin(e.target.value)} />
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-500">Type</label>
        <select className="border rounded px-2 py-1" value={type} onChange={e => setType(e.target.value)}>
          <option value="">Any</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="townhome">Townhome</option>
          <option value="multi">Multi</option>
          <option value="land">Land</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-500">Status</label>
        <select className="border rounded px-2 py-1" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">Any</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>
      </div>
    </div>
  );
}
