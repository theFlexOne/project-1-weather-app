// import { autocomplete } from './node_modules/@algolia/autocomplete-js'; // <-- A future component
import { displayWeather } from './scripts/displayWeather.js';
import { fetchUserLocationData } from './scripts/fetchUserLocationData.js';
import { fetchUserLocationName } from './scripts/fetchUserLocationName.js';
import { fetchInputLocationData } from './scripts/fetchInputLocationData.js';
import { fetchWeather } from './scripts/fetchWeather.js';

const initApp = async () => {
  const userLocationButton = document.querySelector('#userLocationButton');
  const searchForm = document.querySelector('form');

  const compileUserForecast = async () => {
    // debugger;
    const { latitude: lat, longitude: lon } = (await fetchUserLocationData())
      .coords;

    // code is blocking, for now... Can be done asynchronously
    const placeName = await fetchUserLocationName(lat, lon);
    const weatherData = await fetchWeather(lat, lon);
    return displayWeather(weatherData, placeName);
  };

  const compileInputForecast = async e => {
    e.preventDefault();
    const { lat, lon, address } = await fetchInputLocationData();
    const weatherData = await fetchWeather(lat, lon);
    return displayWeather(weatherData, address);
  };

  compileUserForecast();

  // console.dir(searchForm);
  searchForm.addEventListener('submit', compileInputForecast);
  userLocationButton.addEventListener('click', compileUserForecast);
};

document.addEventListener('DOMContentLoaded', initApp);
