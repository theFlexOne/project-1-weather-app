import { displayWeather } from './displayWeather.js';
import { fetchUserLocationData } from './fetchUserLocationData.js';
import { fetchUserLocationName } from './fetchUserLocationName.js';
import { fetchWeather } from './fetchWeather.js';

export const compileUserForecast = async () => {
  // debugger;
  const { latitude: lat, longitude: lon } = (await fetchUserLocationData())
    .coords;
  debugger;
  // code is blocking, for now... Can be done asynchronously
  try {
    const address = await fetchUserLocationName(lat, lon);
    const weatherData = await fetchWeather(lat, lon);
    // console.log(weatherData, address);
  } catch (err) {
    throw new Error(err);
  }
  return displayWeather(weatherData, address);
};
