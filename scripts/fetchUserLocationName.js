import { GOOGLE_API_KEY } from '../api-keys.js';

const nameIndex = item => {
  return item.types.includes('locality') && item.types.includes('political');
};

export const fetchUserLocationName = async (lat, lon) => {
  // debugger;
  const GEOCODE_API_ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json`;
  const query = `?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`;
  const url = GEOCODE_API_ENDPOINT + query;
  try {
    const addressData = (await (await fetch(url)).json()).results;
    const placeName = addressData.find(nameIndex).formatted_address;
    return placeName;
  } catch (err) {
    throw new Error(err);
  }
};
