import { buildDateStr } from './buildDateStr.js';
import { buildFiveDayForecast } from './buildFiveDayForecast.js';
import { buildHourlyForecast } from './buildHourlyForecast.js';
import { renderBackgroundImg } from './renderBackgroundImg.js';

export const displayWeather = (weatherData, location) => {
  const weatherCards = document.querySelector('main');

  const today = weatherData.daily[0];
  const current = weatherData.current;

  const sunrise = new Date(today.sunrise * 1000);
  const sunset = new Date(today.sunset * 1000);

  const locationName = location.split(', ');

  const dateStr = buildDateStr(weatherData);
  console.log(dateStr);

  //* HTML *//
  const forecastOverview = `      
    <div class="location-and-date">
      <div class="location">${locationName.join(' ')}</div>
      <div class="date">
      <span class="weekday">${dateStr.weekday}</span>        
      <span>${dateStr.date}</span>        
      </div>
    </div>
    <div class="weather">
      <div class="image-wrapper">  
        <img
          src="http://openweathermap.org/img/wn/${
            current.weather[0].icon
          }@4x.png">
      </div>
      <div class="temp">
        ${Math.round(current.temp)}<span class="unit">°F</span>
      </div>
    </div>
`;

  const forecastDescription = `
      <div class="high-temp">High: ${Math.round(
        today.temp.max
      )}<span class="unit">°F</span></div>
      <div class="low-temp">Low: ${Math.round(
        today.temp.min
      )}<span class="unit">°F</span></div>
      <div class="rain">Rain: ${today.pop}%</div>
      <div class="wind">Wind: ${current.wind_speed} m/h</div>
      <div class="humidity">Humidity: ${current.humidity}%</div>
      <div class="visibility">Visibility: ${current.visibility / 100}%</div>
      <div class="sunrise">Sunrise: ${sunrise.getHours()}:${
    (sunrise.getMinutes() < 10 ? '0' : '') + sunrise.getMinutes()
  } AM
      </div>
      <div class="sunset">Sunset: ${
        sunset.getHours() > 12 ? sunset.getHours() - 12 : sunset.getHours()
      }:${(sunset.getMinutes() < 10 ? '0' : '') + sunset.getMinutes()} PM
      </div>
  `;

  const docFrag = document.createDocumentFragment();
  const cardClones = document.querySelector('main').cloneNode('false').children;
  const btmButtons = document.querySelector('#btmButtons');

  const fiveDayForecast = buildFiveDayForecast(weatherData);
  const hourlyForecast = buildHourlyForecast(weatherData);
  // console.log('fiveDayForecast = ', fiveDayForecast.children);
  // console.log('hourlyForecast = ', hourlyForecast.children);

  const htmlFrag = (() => {
    // console.log(cardClones);

    const [
      overview,
      description,
      fiveDay,
      {
        children: [, hours],
      },
      bookmarked,
    ] = [...cardClones];

    console.log({ hours });

    overview.innerHTML = forecastOverview;
    description.innerHTML = forecastDescription;
    fiveDay.innerHTML = '';
    fiveDay.append(fiveDayForecast);
    hours.innerHTML = '';
    hours.append(hourlyForecast);

    docFrag.append(...cardClones);
    return docFrag;
  })();

  weatherCards.innerHTML = '';
  weatherCards.appendChild(htmlFrag);
  renderBackgroundImg(sunrise, sunset);
};
