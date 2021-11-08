import { displayWeather } from './displayWeather.js';
import { fetchInputLocationData } from './fetchInputLocationData.js';
import { fetchWeather } from './fetchWeather.js';

export const compileInputForecast = async e => {
  e.preventDefault();
  const { lat, lon, address } = await fetchInputLocationData();
  const weatherData = await fetchWeather(lat, lon);

  return displayWeather(weatherData, address);
};
