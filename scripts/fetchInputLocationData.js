import { GOOGLE_API_KEY } from '../api-keys.js'; // <-- api-keys.js is ignored by git

export const fetchInputLocationData = async () => {
  const PLACES_API_ENDPOINT =
    'https://maps.googleapis.com/maps/api/place/findplacefromtext/json'; // cors issue with this endpoint. bypass cors with a browser extension or some other method
  const searchInput = document.querySelector('#searchBox').value || 'london';
  const query = `?input=${searchInput}&fields=formatted_address,name,geometry,place_id&inputtype=textquery&key=${GOOGLE_API_KEY}`;
  const url = PLACES_API_ENDPOINT + query;
  const places = await (await fetch(url)).json();
  const place = places.candidates[0];
  const { lat, lng: lon } = place.geometry.location;
  const address = place.formatted_address;
  const place_id = place.place_id;
  return { lat, lon, address };
};
