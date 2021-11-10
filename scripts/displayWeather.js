import { buildDate } from './buildDate.js';
import { buildFiveDayForecast } from './buildFiveDayForecast.js';
import { buildHourlyForecast } from './buildHourlyForecast.js';
import { renderBackgroundImg } from './renderBackgroundImg.js';
import { buildForecastOverview } from './buildForecastOverview.js';
import { buildForecastDescription } from './buildForecastDescription.js';

class WeatherDisplayData {
  constructor(data, location) {
    let locationName = location.split(', ');
    locationName = [
      locationName[0],
      ...locationName[1].split(' '),
      locationName[2],
    ];
    this.date = buildDate(data);
    this.location = locationName;
    this.weather = data;
  }
}

export const displayWeather = (data, location) => {
  const weatherDisplayData = new WeatherDisplayData(data, location);

  const overview = document.querySelector('.forecast-overview');
  const description = document.querySelector('.forecast-description');
  const fiveDay = document.querySelector('.five-day-forecast');
  const hourly = document.querySelector('.hourly-forecast ol');

  console.log(overview, description, fiveDay, hourly);

  overview.replaceChildren(buildForecastOverview(weatherDisplayData));
  description.replaceChildren(buildForecastDescription(weatherDisplayData));
  fiveDay.replaceChildren(buildFiveDayForecast(weatherDisplayData));
  hourly.replaceChildren(buildHourlyForecast(weatherDisplayData));

  renderBackgroundImg(weatherDisplayData);
};
