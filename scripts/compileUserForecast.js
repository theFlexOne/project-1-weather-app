import { displayWeather } from './displayWeather.js';
import { fetchUserLocationData } from './fetchUserLocationData.js';
import { fetchUserLocationName } from './fetchUserLocationName.js';
import { fetchWeather } from './fetchWeather.js';

export const compileUserForecast = async () => {
  let address, weatherData;
  try {
    const { latitude: lat, longitude: lon } = (await fetchUserLocationData())
      .coords;
    address = await fetchUserLocationName(lat, lon);
    weatherData = await fetchWeather(lat, lon);
    return displayWeather(weatherData, address);
  } catch (err) {
    throw new Error(err);
  }
  // return displayWeather(weatherData, address);
};
