export const fetchWeather = async (lat, lon, placeName) => {
  const OPEN_WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall`;
  const query = `
    ?lat=${lat}'
    &lon=${lon}&
    units=${units || 'imperial'}
    &lang=en
    &appid=${OPEN_WEATHER_API_KEY}
  `;
  const url = OPEN_WEATHER_API_ENDPOINT + query;
  try {
    const weatherData = await (await fetch(url)).json();
    return weatherData;
  } catch (e) {
    throw new Error(e.message);
  }
};
