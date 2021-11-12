import { buildFiveDayForecast } from './buildFiveDayForecast.js';
import { buildHourlyForecast } from './buildHourlyForecast.js';
import { buildForecastOverview } from './buildForecastOverview.js';
import { buildForecastDescription } from './buildForecastDescription.js';
import { renderBackgroundImg } from './renderBackgroundImg.js';

class WeatherDisplayData {
  constructor(data, location) {
    this.date = moment.unix(data.current.dt);
    this.location = location;
    this.weather = data;
  }
}

export const displayWeather = (data, location) => {
  const weatherDisplayData = new WeatherDisplayData(data, location);

  console.dir(weatherDisplayData);

  const overview = document.querySelector('.forecast-overview');
  const description = document.querySelector('.forecast-description');
  const fiveDay = document.querySelector('.five-day-forecast');
  const hourly = document.querySelector('.hourly-forecast ol');

  overview.replaceChildren(buildForecastOverview(weatherDisplayData));
  description.replaceChildren(buildForecastDescription(weatherDisplayData));
  fiveDay.replaceChildren(buildFiveDayForecast(weatherDisplayData));
  hourly.replaceChildren(buildHourlyForecast(weatherDisplayData));

  renderBackgroundImg(weatherDisplayData);
};
