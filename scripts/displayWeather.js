export const displayWeather = (weatherData, location) => {
  const weatherCards = document.querySelector('main');
  const body = document.querySelector('body');
  const locationName = `
    <span class="city">${location[0]}</span>
    </br>
    <span class="state">${location[1] || ''}</span>
  `;
  // console.log('locationName -> ', { locationName });

  const today = weatherData.daily[0];
  const current = weatherData.current;

  const sunrise = new Date(today.sunrise * 1000);
  const sunset = new Date(today.sunset * 1000);

  // console.log("sunrise -> " + { sunrise }, "sunset -> " +  { sunset });

  const dateStr = buildDateStr();

  //* HTML *//
  const forecastOverview = `      
    <div class="location-and-date">
      <div class="location">${locationName}</div>
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

  const fiveDayForecast = getFiveDayForecast(weatherData);
  const hourlyForecast = getHourlyForecast(weatherData);

  const html = `
    <div class="card forecast-overview" id="forecastOverview">${forecastOverview}</div>
    <div class="card forecast-description" id="forecastDescription">${forecastDescription}</div>
    <div class="card five-day-forecast" id="hourlyForecast">${fiveDayForecast}</div>
    <div class="card hourly-forecast" id="hourlyForecast">${hourlyForecast}</div>
    <div class="card bookmarked-location" id="bookmarkedLocation">Bookmarked Location **COMING SOON**</div>
  `;

  // const html = (() => {})();

  if (Date.now() < sunset && Date.now() > sunrise)
    body.style.backgroundImage =
      'url(/Images/mosi-knife--PVgDgKXgZA-unsplash-edit1.jpg)';
  else body.style.backgroundImage = 'url(/Images/night-sky-cloudy-moon.jpg)';

  weatherCards.innerHTML = html;
};
