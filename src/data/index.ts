import apt1_1 from "images/Properties/apartment1-1.jpg";
import apt1_2 from "images/Properties/apartment1-2.jpg";
import apt1_3 from "images/Properties/apartment1-3.jpg";
import apt2_1 from "images/Properties/apartment2-1.jpg";
import apt2_2 from "images/Properties/apartment2-2.jpg";
import apt2_3 from "images/Properties/apartment2-3.jpg";
import apt3_1 from "images/Properties/apartment3-1.jpg";
import apt3_2 from "images/Properties/apartment3-2.jpg";
import apt3_3 from "images/Properties/apartment3-3.jpg";
import apt3_4 from "images/Properties/apartment3-4.jpg";
import apt4_1 from "images/Properties/apartment4-1.jpg";
import apt4_2 from "images/Properties/apartment4-2.jpg";
import apt4_3 from "images/Properties/apartment4-3.jpg";
import hou1_1 from "images/Properties/house1-1.jpg";
import hou1_2 from "images/Properties/house1-2.jpg";
import apt5_1 from "images/Properties/apartment5-1.jpg";
import apt5_2 from "images/Properties/apartment5-2.jpg";
import apt6_1 from "images/Properties/apartment6-1.jpg";
import apt6_2 from "images/Properties/apartment6-2.jpg";
import apt6_3 from "images/Properties/apartment6-3.jpg";
import apt6_4 from "images/Properties/apartment6-4.jpg";
import apt6_5 from "images/Properties/apartment6-5.jpg";
import hou2_1 from "images/Properties/house2-1.jpg";
import hou2_2 from "images/Properties/house2-2.jpg";
import apt7_1 from "images/Properties/apartment7-1.jpg";
import apt7_2 from "images/Properties/apartment7-2.jpg";
import apt7_3 from "images/Properties/apartment7-3.jpg";
import apt7_4 from "images/Properties/apartment7-4.jpg";
import apt7_5 from "images/Properties/apartment7-5.jpg";
import hou3_1 from "images/Properties/house3-1.jpg";
import hou3_2 from "images/Properties/house3-2.jpg";
import hou3_3 from "images/Properties/house3-3.jpg";

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
  id: number;
  city: string;
  bathrooms: number;
  rooms: number;
  area: number;
  parking: boolean;
  type: string;
  operations: string[];
  buyPrice: number;
  rentPrice: number;
  adminFee: number;
  images: string[];
  lat: number;
  lng: number;
  description: string;
  features: string[];
  contactNumber: string;
  email: string;
}

export const properties: IProperty[] = [
  {
    id: 1,
    city: "NY",
    bathrooms: 2,
    rooms: 2,
    area: 51,
    parking: true,
    type: "AP",
    operations: ["BY", "RT"],
    buyPrice: 550000,
    rentPrice: 2500,
    adminFee: 65,
    images: [apt1_1, apt1_2, apt1_3],
    lat: 40.72631,
    lng: -73.99575,
    description:
      "Great Apartment in a cool nice neighborhood, near of main avenues, subway stations and downtown of city, it has two bathrooms, three rooms, a parking lot, and a balcon with an amazing view, it is available for sale or for rent.",
    features: [
      "conditioned air",
      "balcon",
      "Kids playground",
      "shared BBQ",
      "terrace",
    ],
    contactNumber: "958-58695",
    email: "fake@gmail.com",
  },
  {
    id: 2,
    city: "NY",
    bathrooms: 2,
    rooms: 4,
    area: 71,
    parking: true,
    type: "AP",
    operations: ["BY"],
    buyPrice: 1500000,
    rentPrice: 0,
    adminFee: 110,
    images: [apt2_1, apt2_2, apt2_3],
    lat: 40.75472,
    lng: -73.98351,
    description:
      "Great Apartment in a cool nice neighborhood, near of main avenues, subway stations and downtown of city, it has two bathrooms, three rooms, a parking lot, and a balcon with an amazing view.",
    features: [
      "conditioned air",
      "balcon",
      "shared pool",
      "sauna",
      "shared BBQ",
      "Tenis court",
      "Kids playground",
      "terrace",
    ],
    contactNumber: "958-58695",
    email: "fake@gmail.com",
  },
  {
    id: 3,
    city: "NY",
    bathrooms: 2,
    rooms: 3,
    area: 80,
    parking: true,
    type: "AP",
    operations: ["BY"],
    buyPrice: 2100000,
    rentPrice: 0,
    adminFee: 120,
    images: [apt3_1, apt3_2, apt3_3, apt3_4],
    lat: 40.7994,
    lng: -73.9534,
    description:
      "Great Apartment in a cool nice neighborhood, near of main avenues, subway stations and downtown of city, it has two bathrooms, three rooms, a parking lot, and a balcon with an amazing view.",
    features: [
      "conditioned air",
      "balcon",
      "shared pool",
      "sauna",
      "shared BBQ",
      "Tenis court",
      "Kids playground",
      "terrace",
    ],
    contactNumber: "958-58695",
    email: "fake@gmail.com",
  },
  {
    id: 4,
    city: "NY",
    bathrooms: 1,
    rooms: 1,
    area: 40,
    parking: true,
    type: "AP",
    operations: ["BY"],
    buyPrice: 250000,
    rentPrice: 700,
    adminFee: 30,
    images: [apt4_1, apt4_2, apt4_3],
    lat: 40.6414,
    lng: -73.9421,
    description:
      "Great Apartment in a cool nice neighborhood, near of main avenues, subway stations and downtown of city, it has one bathroom, one room, a parking lot, and a balcon with an amazing view.",
    features: ["conditioned air", "balcon", "sauna", "terrace"],
    contactNumber: "958-58695",
    email: "fake@gmail.com",
  },
  {
    id: 5,
    city: "NY",
    bathrooms: 2,
    rooms: 5,
    area: 140,
    parking: true,
    type: "HS",
    operations: ["BY"],
    buyPrice: 2050000,
    rentPrice: 2700,
    adminFee: 0,
    images: [hou1_1, hou1_2],
    lat: 40.7369,
    lng: -73.6962,
    description:
      "Great Family House in a cool nice neighborhood, near of main avenues, subway stations and downtown of city, it has a garden, a lot of space and its very warm.",
    features: ["garden", "BBQ"],
    contactNumber: "958-58695",
    email: "fake@gmail.com",
  },
  {
    id: 6,
    city: "SF",
    bathrooms: 1,
    rooms: 2,
    area: 46,
    parking: true,
    type: "AP",
    operations: ["BY"],
    buyPrice: 850000,
    rentPrice: 1600,
    adminFee: 65,
    images: [apt5_1, apt5_2],
    lat: 37.7556,
    lng: -122.4204,
    description:
      "Great Apartment in a cool nice neighborhood, near of main avenues, subway stations and downtown of city, it has one bathroom, two rooms, a parking lot, and a balcon with an amazing view.",
    features: ["garden", "balcon"],
    contactNumber: "958-58695",
    email: "fake@gmail.com",
  },
  {
    id: 7,
    city: "SF",
    bathrooms: 2,
    rooms: 3,
    area: 68,
    parking: true,
    type: "AP",
    operations: ["BY"],
    buyPrice: 110000,
    rentPrice: 1900,
    adminFee: 80,
    images: [apt6_1, apt6_2, apt6_3, apt6_4, apt6_5],
    lat: 37.7902,
    lng: -122.3922,
    description:
      "Great Apartment in a cool nice neighborhood, near of main avenues, subway stations and downtown of city, it has one bathroom, two rooms, a parking lot, and a balcon with an amazing view.",
    features: ["garden", "balcon"],
    contactNumber: "958-58695",
    email: "fake@gmail.com",
  },
  {
    id: 8,
    city: "SF",
    bathrooms: 2,
    rooms: 4,
    area: 120,
    parking: true,
    type: "HS",
    operations: ["BY"],
    buyPrice: 2250000,
    rentPrice: 2900,
    adminFee: 0,
    images: [hou2_1, hou2_2],
    lat: 37.7877,
    lng: -122.4292,
    description:
      "Great Family House in a cool nice neighborhood, near of main avenues, subway stations and downtown of city, it has a garden, a lot of space and its very warm.",
    features: ["garden", "BBQ"],
    contactNumber: "958-58695",
    email: "fake@gmail.com",
  },
  {
    id: 9,
    city: "MI",
    bathrooms: 2,
    rooms: 3,
    area: 71,
    parking: true,
    type: "AP",
    operations: ["BY"],
    buyPrice: 920000,
    rentPrice: 1300,
    adminFee: 40,
    images: [apt7_1, apt7_2, apt7_3, apt7_4, apt7_5],
    lat: 25.892,
    lng: -80.1508,
    description:
      "Great Apartment in a cool nice neighborhood, near of main avenues, subway stations and downtown of city, it has one bathroom, two rooms, a parking lot, and a balcon with an amazing view.",
    features: ["garden", "balcon"],
    contactNumber: "958-58695",
    email: "fake@gmail.com",
  },
  {
    id: 10,
    city: "MI",
    bathrooms: 2,
    rooms: 3,
    area: 100,
    parking: true,
    type: "HS",
    operations: ["BY"],
    buyPrice: 1500000,
    rentPrice: 1800,
    adminFee: 0,
    images: [hou3_1, hou3_2, hou3_3],
    lat: 25.9146,
    lng: -80.1957,
    description:
      "Great Family House in a cool nice neighborhood, near of main avenues, subway stations and downtown of city, it has a garden, a lot of space and its very warm.",
    features: ["garden", "BBQ"],
    contactNumber: "958-58695",
    email: "fake@gmail.com",
  },
];
