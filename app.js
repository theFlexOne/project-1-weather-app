import { OPEN_WEATHER_API_KEY, GOOGLE_API_KEY } from './api-keys.js'; // api-keys are kept hidden and ignored by git
// import { autocomplete } from './node_modules/@algolia/autocomplete-js';
import { displayWeather } from './scripts/displayWeather.js';
import { fetchUserLocationData } from './scripts/fetchUserLocationData.js';
import { fetchUserLocationName } from './scripts/fetchUserLocationName.js';
import { fetchInputLocationData } from './scripts/fetchInputLocationData.js';
import { fetchWeather } from './scripts/fetchWeather.js';

const initApp = async () => {
  const userLocationButton = document.querySelector('#userLocationButton');
  const searchForm = document.querySelector('form');

  const { latitude: lat, longitude: lon } = (await fetchUserLocationData())
    .coords;

  // code is blocking, for now... Can be done asynchronously
  const placeName = await fetchUserLocationName(lat, lon);
  const weatherData = await fetchWeather(lat, lon);

  displayWeather(weatherData, placeName);

  // console.dir(searchForm);
  searchForm.addEventListener('submit', fetchInputLocationData);
  userLocationButton.addEventListener('click', fetchUserLocationData);
};

document.addEventListener('DOMContentLoaded', initApp);
