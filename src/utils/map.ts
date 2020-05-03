import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";

export const myIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [24, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, 0],
  shadowUrl: markerIconShadow,
  shadowSize: [16, 16],
  shadowAnchor: [16, 16],
});
