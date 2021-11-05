import { OPEN_WEATHER_API_KEY } from '../api-keys.js';

export const fetchWeather = async (lat, lon, units = 'imperial') => {
  const OPEN_WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall`;
  const query = `?lat=${lat}&lon=${lon}&units=${units}&lang=en&appid=${OPEN_WEATHER_API_KEY}`;
  const url = OPEN_WEATHER_API_ENDPOINT + query;
  try {
    return await (await fetch(url)).json();
  } catch (e) {
    throw new Error(e.message);
  }
};
