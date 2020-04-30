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
    area: 51.5,
    parking: true,
    type: "AP",
    operations: ["BY", "RT"],
    buyPrice: 750000,
    rentPrice: 2500,
    images: [
      "https://i.postimg.cc/qMMTq6zb/apartment1-1.jpg",
      "https://i.postimg.cc/RZWxQr1w/apartment1-2.jpg",
      "https://i.postimg.cc/FsWQLFS9/apartment1-3.jpg",
    ],
    lat: 40.72631,
    lng: -73.99575,
  },
];
