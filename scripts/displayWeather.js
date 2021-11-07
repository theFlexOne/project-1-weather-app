import { buildDate } from './buildDate.js';
import { buildFiveDayForecast } from './buildFiveDayForecast.js';
import { buildHourlyForecast } from './buildHourlyForecast.js';
import { renderBackgroundImg } from './renderBackgroundImg.js';
import { formatDay } from './formatDay.js';
import { buildForecastOverview } from './buildForecastOverview.js';
import { buildForecastDescription } from './buildForecastDescription.js';

const cardTemplates = document.querySelectorAll('template');

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
  console.log(location);
  // buildForecastOverview(data);
  const weatherCards = document.querySelector('main');

  const docFrag = document.createDocumentFragment();
  const cardClones = document.querySelector('main').cloneNode('false').children;
  const btmButtons = document.querySelector('#btmButtons');

  const weatherDisplay = new WeatherDisplayData(data, location);
  console.log(weatherDisplay);

  const overview = document.querySelector('.forecast-overview');
  overview.replaceChildren(buildForecastOverview(weatherDisplay));
  // description.innerHTML = forecastDescription;
  // fiveDay.innerHTML = '';
  // fiveDay.append(fiveDayForecast);
  // hours.innerHTML = '';
  // hours.append(hourlyForecast);

  // docFrag.append(...cardClones);
  // // return docFrag;
  // weatherCards.innerHTML = '';
  // weatherCards.appendChild(docFrag);
  renderBackgroundImg(sunrise, sunset);
};
