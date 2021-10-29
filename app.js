import { OPEN_WEATHER_API_KEY, GOOGLE_API_KEY } from "./api-keys.js";

const initApp = () => {
  const PLACES_API_ENDPOINT =
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?";
  const OPEN_WEATHER_API_ENDPOINT =
    "https://api.openweathermap.org/data/2.5/onecall?";
  const GEOCODE_API_ENDPOINT =
    "https://maps.googleapis.com/maps/api/geocode/json?";

  const searchForm = document.querySelector("header form");
  const searchBox = document.querySelector("#searchBox");
  const userLocationButton = document.querySelector("#userLocationButton");

  const displayWeather = (weatherData, location) => {
    console.dir(weatherData);
    // console.log({ location });
    const locationName = `
      <span class="city">${location[0]}</span>
      </br>
      <span class="state">${location[1] || ""}</span>
      `;
    const weatherCards = document.querySelector("main");
    
    const today = weatherData.daily[0];
    const current = weatherData.current;
    
    const sunrise = new Date(today.sunrise * 1000);
    const sunset = new Date(today.sunset * 1000);

    const fiveDayForecast = (() => {
      const fiveDays = weatherData.daily.slice(1, 6);
      const divs = [];
      fiveDays.forEach(day => {
        const div = `<div class="day">${day.pop}, ${day.temp.min}, ${day.temp.max}</div>`;
        divs.push(div);
      })
      return divs.join('');
    })();

    const hourlyForecast = (() => {
      const twelveHours = weatherData.hourly.slice(0, 12)
      const divs = [];
      twelveHours.forEach((hour) => {
        const div = `<div>${hour.temp}</div>`
        divs.push(div)
      })
      return divs.join('')
    })()

    const dateStrObject = (() => {
      // let weekday, month, dayNum, year;
      const [weekday, month, dayNum, year] = new Date()
        .toDateString()
        .split(" ");
      // console.log(weekday, month, dayNum, year);
      return {
        weekday,
        month,
        dayNum,
        year,
      };
    })();

    const html = `
    <div class="card overview">
      <div class="location-and-date">
        <div class="location">${locationName}</div>
        <div class="date">
          <span class="weekday">${dateStrObject.weekday}</span>        
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
          ${Math.round(current.temp)}<span class="units">&degF</span>
        </div>
      </div>
    </div>  
    <div class="card description">
      <div class="wrapper">
        <div class="high-temp">High: ${today.temp.max}&deg;F</div>
        <div class="low-temp">Low: ${today.temp.min}&deg;F</div>
        <div class="rain">Rain: ${today.pop}%</div>
        <div class="wind">Wind: ${current.wind_speed}m/h</div>
        <div class="humidity">Humidity: ${current.humidity}%</div>
        <div class="visibility">Visibility: ${current.visibility}m</div>
        <div class="sunrise">Sunrise ${sunrise.getHours()}:${sunrise.getMinutes()} AM</div>
        <div class="sunset">Sunset ${
          sunset.getHours() > 12 ? sunset.getHours() - 12 : sunset.getHours()
        }:${sunset.getMinutes()} PM
        </div>
      </div>
    </div>
    <div class="card five-day">${fiveDayForecast}</div>
    <div class="card hourly">${hourlyForecast}</div>
    <div class="card other">Other</div>
    `;
    weatherCards.innerHTML = html;
  };

  const fetchWeather = (lat, lon, locationName = "name") => {
    const units = "imperial";
    const url = `${OPEN_WEATHER_API_ENDPOINT}lat=${lat}&lon=${lon}&units=${units}&lang=en&appid=${OPEN_WEATHER_API_KEY}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((weatherData) => displayWeather(weatherData, locationName))
      .catch(console.error);
  };

  const fetchInputLocationData = (e) => {
    const input = searchBox.value;
    const url = `${PLACES_API_ENDPOINT}input=${input}&fields=formatted_address,name,geometry,place_id&inputtype=textquery&key=${GOOGLE_API_KEY}`;
    e.preventDefault();
    searchForm.reset();
    // console.log(input);
    // debugger;
    if (input === "") return fetchUserLocationData();
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        const lat = data.candidates[0].geometry.location.lat.toPrecision(4);
        const lon = data.candidates[0].geometry.location.lng.toPrecision(4);
        const locationName = data.candidates[0].formatted_address.split(" ");
        console.log(locationName);
        // console.log(locationName);
        return fetchWeather(lat, lon, locationName);
      })
      .catch((error) => console.error(error));
  };

  const fetchUserLocationName = (lat, lon) => {
    const url = `${GEOCODE_API_ENDPOINT}latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        const addressComponents = data.results.find((result) => {
          if (
            result.types[0] === "locality" &&
            result.types[1] === "political" &&
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
    const success = (position) => {
      let { latitude: lat, longitude: lon } = position.coords;
      return fetchUserLocationName(lat, lon);
    };
    const error = (error) => console.error(error);
    navigator.geolocation.getCurrentPosition(success, error);
  };

  // const displayRdmMovieQuotes = () => {
  //   const movieQuote = document.querySelector('#movieQuote');
  //   movieQuote.innerHTML = getRdmMovieQuote();
  // }

  //*event listeners:

  searchForm.addEventListener("submit", fetchInputLocationData);
  userLocationButton.addEventListener("click", fetchUserLocationData);

  fetchUserLocationData();
  // displayRdmMovieQuotes();
  // searchBox.focus();
};

// document.addEventListener('DOMContentLoaded', initApp);
initApp();
