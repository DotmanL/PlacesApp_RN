import axios from "axios";
import { GOOGLE_API_KEY } from "@env";

export function getMapPreview(latitude: number, longitude: number) {
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:S%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;

  return mapPreviewUrl;
}

export async function getAddress(latitude: number, longitude: number) {
  const reverseGeocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
  const response = await axios.get(reverseGeocodingUrl);
  if (!response) {
    throw new Error("Failed to get address");
  }
  const data = response.data;
  const address = data.results[0].formatted_address;
  return address;
}
