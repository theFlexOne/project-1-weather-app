import { OPEN_WEATHER_API_KEY, GOOGLE_API_KEY } from './api-keys.js'; // api-keys are kept hidden and ignored by git

const initApp = () => {
  const PLACES_API_ENDPOINT =
    'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?'; // cors issue with this endpoint. bypass cors with a browser extension or some other method
  const OPEN_WEATHER_API_ENDPOINT =
    'https://api.openweathermap.org/data/2.5/onecall?';
  const GEOCODE_API_ENDPOINT =
    'https://maps.googleapis.com/maps/api/geocode/json?';

  const searchForm = document.querySelector('header form');
  const searchBox = document.querySelector('#searchBox');
  const userLocationButton = document.querySelector('#userLocationButton');
  const weatherCards = document.querySelector('main');
  const body = document.querySelector('body');

  const displayWeather = (weatherData, location) => {
    // console.dir(weatherData);
    console.log('location -> ', { location });
    const locationName = `
      <span class="city">${location[0]}</span>
      </br>
      <span class="state">${location[1] || ''}</span>
    `;
    console.log('locationName -> ', { locationName });

    const today = weatherData.daily[0];
    const current = weatherData.current;

    const sunrise = new Date(today.sunrise * 1000);
    const sunset = new Date(today.sunset * 1000);

    // console.log("sunrise -> " + { sunrise }, "sunset -> " +  { sunset });

    const dateStr = buildDateStr();

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
      <!-- <div class="wrapper"> -->
        <div class="high-temp">High: ${
          today.temp.max
        }&deg;<span class="unit">F</span></div>
        <div class="low-temp">Low: ${
          today.temp.min
        }&deg;<span class="unit">F</span></div>
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
      <!-- </div> -->
    `;

    const fiveDayForecast = getFiveDayForecast(weatherData);

    const hourlyForecast = (() => {
      const twelveHours = weatherData.hourly.slice(1, 13);
      const divs = [];
      const parseHours = hours => {
        let hoursString = '';
        if (hours > 12) hoursString += hours - 12 + ' PM';
        else hoursString += hours + (hours === 12 ? ' PM' : ' AM');
        return hoursString;
      };
      twelveHours.forEach(({ temp, dt }) => {
        const hours = new Date(dt * 1000).getHours();
        const div = `<span>${parseHours(
          hours
        )} | ${temp}&deg;<span class="unit">F</span></span>`;
        divs.push(div);
      });
      return divs.join('');
    })();

    const html = `
      <div class="card overview">${forecastOverview}</div>  
      <div class="card description">${forecastDescription}</div>
      <div class="card five-day">${fiveDayForecast}</div>
      <div class="card hourly">${hourlyForecast}</div>
      <div class="card other">Other</div>
    `;

    if (Date.now() < sunset && Date.now() > sunrise)
      body.style.backgroundImage =
        'url(/Images/mosi-knife--PVgDgKXgZA-unsplash-edit1.jpg)';
    else body.style.backgroundImage = 'url(/Images/night-sky-cloudy-moon.jpg)';

    weatherCards.innerHTML = html;
  };

  const fetchWeather = (lat, lon, locationName = 'name') => {
    const units = 'imperial';
    const url = `${OPEN_WEATHER_API_ENDPOINT}lat=${lat}&lon=${lon}&units=${units}&lang=en&appid=${OPEN_WEATHER_API_KEY}`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(weatherData => displayWeather(weatherData, locationName))
      .catch(console.error);
  };

  const fetchInputLocationData = e => {
    const input = searchBox.value;
    const url = `${PLACES_API_ENDPOINT}input=${input}&fields=formatted_address,name,geometry,place_id&inputtype=textquery&key=${GOOGLE_API_KEY}`;
    e.preventDefault();
    searchForm.reset();
    // console.log(input);
    // debugger;
    if (input === '') return fetchUserLocationData();
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => {
        // console.log(data);
        const lat = data.candidates[0].geometry.location.lat.toPrecision(4);
        const lon = data.candidates[0].geometry.location.lng.toPrecision(4);
        const locationName = data.candidates[0].formatted_address.split(' ');
        // console.log(locationName);
        return fetchWeather(lat, lon, locationName);
      })
      .catch(error => console.error(error));
  };

  const fetchUserLocationName = (lat, lon) => {
    const url = `${GEOCODE_API_ENDPOINT}latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => {
        // console.log(data);
        const addressComponents = data.results.find(result => {
          if (
            result.types[0] === 'locality' &&
            result.types[1] === 'political' &&
            result.types.length === 2
          ) {
            return true;
          }
        }).address_components;
        // console.log(addressComponents);
        const locationName = [
          addressComponents[0].long_name,
          addressComponents[2].long_name,
        ];
        return fetchWeather(lat, lon, locationName);
      })
      .catch(console.error);
  };
  const fetchUserLocationData = () => {
    // debugger
    const success = position => {
      let { latitude: lat, longitude: lon } = position.coords;
      return fetchUserLocationName(lat, lon);
    };
    const error = error => console.error(error);
    navigator.geolocation.getCurrentPosition(success, error);
  };

  // const displayRdmMovieQuotes = () => {
  //   const movieQuote = document.querySelector('#movieQuote');
  //   movieQuote.innerHTML = getRdmMovieQuote();
  // }

  const buildDateStr = () => {
    let [weekday, ...date] = new Date().toDateString().split(' ');
    date = date.join(',');
    console.log(weekday, date);
    return {
      weekday,
      date,
    };
  };

  const getFiveDayForecast = weatherData => {
    const fiveDays = weatherData.daily.slice(1, 6);
    const divs = [];
    fiveDays.forEach(day => {
      // console.log(day);
      const {
        pop: rain,
        temp: { min },
        temp: { max },
        dt: date,
      } = day;
      const dayOfTheWeek = new Date(date * 1000).toString().split(' ')[0];
      // dayOfTheWeek = parseDayOfTheWeek(dayOfTheWeek);
      // console.log(dayOfTheWeek);
      const iconURL = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
      const div = `
        <div class="day">
          <span class="day-of-the-week">${dayOfTheWeek}</span>
          <img src="${iconURL}">
          <span>
            ${min}&deg;<span class="unit">F</span> - ${max}&deg;<span class="unit">F</span>
          </span>
        </div>`;
      divs.push(div);
    });
    return divs.join('');
  };

  //*event listeners:

  searchForm.addEventListener('submit', fetchInputLocationData);
  userLocationButton.addEventListener('click', fetchUserLocationData);

  fetchUserLocationData();
  // displayRdmMovieQuotes();
  // searchBox.focus();
};

document.addEventListener('DOMContentLoaded', initApp);
// initApp();
