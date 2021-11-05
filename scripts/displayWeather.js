import { buildDateStr } from './buildDateStr.js';
import { buildFiveDayForecast } from './buildFiveDayForecast.js';
import { buildHourlyForecast } from './buildHourlyForecast.js';
import { renderBackgroundImg } from './renderBackgroundImg.js';

export const displayWeather = (weatherData, location) => {
  const weatherCards = document.querySelector('main');
  const body = document.querySelector('body');

  const today = weatherData.daily[0];
  const current = weatherData.current;

  const sunrise = new Date(today.sunrise * 1000);
  const sunset = new Date(today.sunset * 1000);

  const locationName = location.split(', ');

  const dateStr = buildDateStr();

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
        ${Math.round(current.temp)}<span class="unit">&deg;F</span>
      </div>
    </div>
`;

  const forecastDescription = `
      <div class="high-temp">High: ${Math.round(
        today.temp.max
      )}&deg;<span class="unit">F</span></div>
      <div class="low-temp">Low: ${Math.round(
        today.temp.min
      )}&deg;<span class="unit">F</span></div>
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

  const fiveDayForecast = buildFiveDayForecast(weatherData);
  const hourlyForecast = buildHourlyForecast(weatherData);
  // console.log('fiveDayForecast = ', fiveDayForecast.children);
  // console.log('hourlyForecast = ', hourlyForecast.children);

  const htmlFrag = (() => {
    const docFrag = document.createDocumentFragment();
    const cardClones = document
      .querySelector('main')
      .cloneNode('false').children;
    console.log(cardClones);

    const [overview, description, fiveDay, hourly, bookmarked] = [
      ...cardClones,
    ];
    // console.log(overview, description, fiveDay, hourly, bookmarked);
    overview.innerHTML = forecastOverview;
    description.innerHTML = forecastDescription;
    fiveDay.append(fiveDayForecast);
    hourly.append(hourlyForecast);
    console.log([overview, description, fiveDay, hourly, bookmarked]);

    docFrag.append(...cardClones);
    console.log(docFrag);
    // console.log(cardClones);
    // return cardClones;
    return docFrag;
  })();

  console.log(htmlFrag);

  /* 
  const html = `
    <div class="card forecast-overview" id="forecastOverview">${forecastOverview}</div>
    <div class="card forecast-description" id="forecastDescription">${forecastDescription}</div>
    <div class="card five-day-forecast" id="hourlyForecast">${fiveDayForecast}</div>
    <div class="card hourly-forecast" id="hourlyForecast">${hourlyForecast}</div>
    <div class="card bookmarked-location" id="bookmarkedLocation">Bookmarked Location **COMING SOON**</div>
  `:
  */
  weatherCards.innerHTML = '';
  weatherCards.appendChild(htmlFrag);
};
