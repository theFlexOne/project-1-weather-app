import { OPEN_WEATHER_API_KEY, GOOGLE_API_KEY } from './api-keys.js'; // api-keys are kept hidden and ignored by git
// import { autocomplete } from './node_modules/@algolia/autocomplete-js';
import { displayWeather } from '';

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

  displayWeather(weatherData, location);

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

  //TODO make async/await
  const fetchInputLocationData = e => {
    const input = searchBox.value;
    const url = `${PLACES_API_ENDPOINT}input=${input}&fields=formatted_address,name,geometry,place_id&inputtype=textquery&key=${GOOGLE_API_KEY}`;
    e.preventDefault();
    searchForm.reset();
    if (input === '') return fetchUserLocationData();
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => {
        const lat = data.candidates[0].geometry.location.lat.toPrecision(4);
        const lon = data.candidates[0].geometry.location.lng.toPrecision(4);
        const locationName = data.candidates[0].formatted_address.split(' ');
        return fetchWeather(lat, lon, locationName);
      })
      .catch(error => console.error(error));
  };

  //TODO make async/await
  const fetchUserLocationName = (lat, lon) => {
    const url = `${GEOCODE_API_ENDPOINT}latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => {
        const addressComponents = data.results.find(result => {
          if (
            result.types[0] === 'locality' &&
            result.types[1] === 'political' &&
            result.types.length === 2
          ) {
            return true;
          }
        }).address_components;
        const locationName = [
          addressComponents[0].long_name,
          addressComponents[2].long_name,
        ];
        return fetchWeather(lat, lon, locationName);
      })
      .catch(console.error);
  };
  const fetchUserLocationData = () => {
    const success = position => {
      let { latitude: lat, longitude: lon } = position.coords;
      return fetchUserLocationName(lat, lon);
    };
    const error = error => console.error(error); // vs throw new Error()
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
            ${Math.round(min)}&deg;<span class="unit">F</span> - ${Math.round(
        max
      )}&deg;<span class="unit">F</span>
          </span>
        </div>`;
      divs.push(div);
    });
    return divs.join('');
  };

  const getHourlyForecast = weatherData => {
    console.dir(weatherData.hourly);
    const hourlyData = weatherData.hourly.slice(1, 13);
    const divs = [];
    const parseHourStr = hours => {
      let hourStr = '';
      if (hours > 12) hourStr += hours - 12 + ' PM';
      else hourStr += hours + (hours === 12 ? ' PM' : ' AM');
      return hourStr;
    };
    hourlyData.forEach(({ temp, dt }) => {
      const hours = parseHourStr(new Date(dt * 1000).getHours());
      const div = `<div>${hours} | ${Math.round(
        temp
      )}&deg;<span class="unit">F</span></div>`;
      divs.push(div);
    });
    return divs.join('');
  };

  //* **event listeners** *//
  searchForm.addEventListener('submit', fetchInputLocationData);
  userLocationButton.addEventListener('click', fetchUserLocationData);

  fetchUserLocationData();
};

document.addEventListener('DOMContentLoaded', initApp);
