import { OPEN_WEATHER_API_KEY, GOOGLE_API_KEY } from './api-keys.js'; // api-keys are kept hidden and ignored by git
// import { autocomplete } from './node_modules/@algolia/autocomplete-js';
import { displayWeather } from './scripts/displayWeather.js';
import { fetchUserLocationData } from './scripts/fetchUserLocationData.js';
import { fetchInputLocationData } from './scripts/fetchInputLocationData.js';
import { fetchWeather } from './scripts/fetchWeather.js';

const userLocationButton = document.querySelector('#userLocationButton');
const searchForm = document.querySelector('form');

const initApp = async () => {
  const coords = await fetchUserLocationData();
  console.log(coords);

  /* const fetchInputLocationData = async e => {
    e.preventDefault();
    const PLACES_API_ENDPOINT =
      'https://maps.googleapis.com/maps/api/place/findplacefromtext/json'; // cors issue with this endpoint. bypass cors with a browser extension or some other method
    const searchInput = document.querySelector('#searchBox');
    const query = `
      ?input=${searchInput}
      &fields=
        formatted_address,
        name,
        geometry,
        place_id
      &inputtype=textquery
      &key=AIzaSyADrFtaYwJruW8fmm656rWb8Br1kZD46Xk`;
  }; */

  /*   const fetchWeather = async (lat, lon, placeName) => {
    const OPEN_WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall`;
    const query = `?lat=${lat}'
    &lon=${lon}&
    units=${units || 'imperial'}
    &lang=en
    &appid=${OPEN_WEATHER_API_KEY}`;
    const url = OPEN_WEATHER_API_ENDPOINT + query;
    let weatherData;
    try {
      weatherData = await (await fetch(url)).json();
    } catch (e) {
      throw new Error(e.message);
    }
    return weatherData;
  };
 */

  const fetchUserLocationName = async (lat, lon) => {
    const GEOCODE_API_ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json`;
    const query = `?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`;
    const url = GEOCODE_API_ENDPOINT + query;
    const addressData = await (await fetch(url)).json();
    return addressData;
  };

  // const url = GEOCODE_API_ENDPOINT + query;
  // const locationName = await (await fetch(url)).json();
  // console.dir(locationName);

  /*   const fetchInputLocationData = e => {
    const input = searchBox.value;
    const url = `${PLACES_API_ENDPOINT}input=${input}&fields=formatted_address,name,geometry,place_id&inputtype=textquery&key=${GOOGLE_API_KEY}`;
    e.preventDefault();
    searchForm.reset();
    if (input === '') return fetchUserLocationData();
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => {
        const lat = data.candidates[0].geometry.location.lat.toPrecision(4);
        const lon = data.candidates[0].geometry.location.lng.toPrecision(4);
        const locationName = data.candidates[0].formatted_address.split(' ');
        return fetchWeather(lat, lon, locationName);
      })
      .catch(error => console.error(error));
  };
 */
  /* --> END <-- */
  console.dir(searchForm);
  searchForm.addEventListener('submit', fetchInputLocationData);
  userLocationButton.addEventListener('click', fetchUserLocationData);
};

//*     --> *event listeners* <--     *//

//*     --> *initialize app* <--     *//
document.addEventListener('DOMContentLoaded', initApp);
/* 
  const fetchWeather = (lat, lon, locationName = 'name') => {
  const units = 'imperial';
  const url = `${OPEN_WEATHER_API_ENDPOINT}lat=${lat}&lon=${lon}&units=${units}&lang=en&appid=${OPEN_WEATHER_API_KEY}`;
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(weatherData => displayWeather(weatherData, locationName))
    .catch(console.error);
};

      .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
    .then(data => {
      const addressComponents = data.results.find(result => {
        if (
          result.types[0] === 'locality' &&
          result.types[1] === 'political' &&
          result.types.length === 2
        ) {
          return true;
        }
      }).address_components;
      const locationName = [
        addressComponents[0].long_name,
        addressComponents[2].long_name,
      ];
      return fetchWeather(lat, lon, locationName);
    })
    .catch(console.error);


  const displayRdmMovieQuotes = () => {
  const movieQuote = document.querySelector('#movieQuote');
  movieQuote.innerHTML = getRdmMovieQuote();
}



*/
