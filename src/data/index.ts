import apt1_1 from "images/Properties/apartment1-1.jpg";
import apt1_2 from "images/Properties/apartment1-2.jpg";
import apt1_3 from "images/Properties/apartment1-3.jpg";
import apt2_1 from "images/Properties/apartment2-1.jpg";
import apt2_2 from "images/Properties/apartment2-2.jpg";
import apt2_3 from "images/Properties/apartment2-3.jpg";

export interface ICity {
  value: string;
  label: string;
  lat: number;
  lng: number;
}

export const cities = [
  { value: "NY", label: "New York", lat: 40.7103, lng: -74.0067 },
  { value: "SF", label: "San Francisco", lat: 37.7774, lng: -122.42 },
  { value: "MI", label: "Miami", lat: 25.8249, lng: -80.2448 },
];

export const types = [
  { value: "HS", label: "House" },
  { value: "AP", label: "Apartment" },
];

export const operations = [
  { value: "BY", label: "Buy" },
  { value: "RT", label: "Rent" },
];

export interface IProperty {
  city: string;
  bathrooms: number;
  rooms: number;
  area: number;
  parking: boolean;
  type: string;
  operations: string[];
  buyPrice: number;
  rentPrice: number;
  images: string[];
  lat: number;
  lng: number;
}

export const properties: IProperty[] = [
  {
    city: "NY",
    bathrooms: 2,
    rooms: 3,
    area: 51,
    parking: true,
    type: "AP",
    operations: ["BY", "RT"],
    buyPrice: 750000,
    rentPrice: 2500,
    images: [apt1_1, apt1_2, apt1_3],
    lat: 40.72631,
    lng: -73.99575,
  },
  {
    city: "NY",
    bathrooms: 2,
    rooms: 4,
    area: 71,
    parking: true,
    type: "AP",
    operations: ["BY"],
    buyPrice: 1300000,
    rentPrice: 0,
    images: [apt2_1, apt2_2, apt2_3],
    lat: 40.75472,
    lng: -73.98351,
  },
];
