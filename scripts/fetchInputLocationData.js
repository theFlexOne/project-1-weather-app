export const fetchInputLocationData = async (e, searchInput = 'boston') => {
  e.preventDefault();
  const PLACES_API_ENDPOINT =
    'https://maps.googleapis.com/maps/api/place/findplacefromtext/json'; // cors issue with this endpoint. bypass cors with a browser extension or some other method
  searchInput = document.querySelector('#searchBox');
  const query = `
    ?input=${searchInput}
    &fields=
      formatted_address,
      name,
      geometry,
      place_id
    &inputtype=textquery
    &key=AIzaSyADrFtaYwJruW8fmm656rWb8Br1kZD46Xk
  `;
  const url = PLACES_API_ENDPOINT + query;
  const placesData = await (await fetch(url)).json();
  const candidate = placesData.candidates[0];
  console.log(candidate);
  const { lat, lng: lon } = candidate.geometry.location;
  const place_id = candidate.place_id;
  return { place_id, lat, lon };
};
