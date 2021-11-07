import { displayWeather } from './displayWeather.js';
import { fetchUserLocationData } from './fetchUserLocationData.js';
import { fetchUserLocationName } from './fetchUserLocationName.js';
import { fetchWeather } from './fetchWeather.js';

export const compileUserForecast = async () => {
  // debugger;
  const { latitude: lat, longitude: lon } = (await fetchUserLocationData())
    .coords;

  // code is blocking, for now... Can be done asynchronously
  const placeName = await fetchUserLocationName(lat, lon);
  const weatherData = await fetchWeather(lat, lon);
  return displayWeather(weatherData, placeName);
};
