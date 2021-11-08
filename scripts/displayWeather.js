import { buildDate } from './buildDate.js';
import { buildFiveDayForecast } from './buildFiveDayForecast.js';
import { buildHourlyForecast } from './buildHourlyForecast.js';
import { renderBackgroundImg } from './renderBackgroundImg.js';
import { formatDay } from './formatDay.js';
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
  const cards = document.querySelectorAll('main > section');
  const [
    overview,
    description,
    fiveDay,
    {
      children: [, hourly],
    },
  ] = [...cards];

  overview.replaceChildren(buildForecastOverview(weatherDisplayData));
  description.replaceChildren(buildForecastDescription(weatherDisplayData));
  fiveDay.replaceChildren(buildFiveDayForecast(weatherDisplayData));
  hourly.replaceChildren(buildHourlyForecast(weatherDisplayData));

  renderBackgroundImg(weatherDisplayData);
};
