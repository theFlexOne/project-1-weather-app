import getRdmMovieQuote from '/data/movie-quotes.js'

const initApp = () => {
  //*variable declarations:
  const GOOGLE_API_KEY = "AIzaSyB1aR-6UfP_eAUogWTty_XcqAWnDl-_1Aw";
  const OPEN_WEATHER_API_KEY = "6fbfff15f75b941ce268d9ce6b344f79"

  const searchForm = document.querySelector('#searchForm');
  const searchBox = document.querySelector('#searchBox');
  const userLocationButton = document.querySelector('#userLocationButton');

  
  //*function declarations:

  const displayWeather = (weatherData, locationName) => {
    // console.log({ weatherData });
    const weatherCards = document.querySelector("#weatherCards");
    const today = weatherData.daily[0],
      current = weatherData.current,
      date = new Date(current.dt * 1000).toDateString(),
      sunrise = new Date(today.sunrise * 1000),
      sunset = new Date(today.sunset * 1000);
    const html = `
    <div class="card card-overview">
      <h1 class="card-title location">${locationName}</h1>
      <h3 class="card-text date">${date}</h5>
      <div class="image-temp-row">
        <img
          src="http://openweathermap.org/img/wn/${
            current.weather[0].icon
          }@4x.png"
          class="card-img"
          alt="Weather description"
          title="${current.weather[0].description}"
        />
        <span>
          ${Math.round(
            current.temp
          )}°<span class="degree-units-system">F</span>
        </span>
      </div>
      <div class="card-body">
        <h3 class="card-title card-text">${current.weather[0].main}</h3>
        <p class="card-text high-low-temp">
          High ${Math.round(today.temp.max)}&deg;F Low ${Math.round(
      today.temp.min
    )}&deg;F
        </p>
      </div>
    </div>
    <div class="card card-info">
      <div class="card-body">
        <p class="card-text high-low-feels">
          Feels like high: ${today.feels_like.day}&deg;F
        </p>
        <p class="card-text">Precipitation ${today.pop * 100}%</p>
        <p class="card-text">Wind ${today.wind_speed}m/s, ${
      today.wind_deg
    }&deg;</p>
        <p class="card-text">
          Sunrise ${sunrise.getHours()}:${sunrise.getMinutes()} AM
        </p>
        <p class="card-text">
          Sunset ${
            sunset.getHours() > 12 ? sunset.getHours() - 12 : sunset.getHours()
          }:${sunset.getMinutes()} PM
        </p>
      </div>
    </div>
    <div class="card card-three-day">3 Day Forcast</div>
    <div class="card card-five-day">5 Day Forcast</div>
    <div class="card card-other">Other</div>
    `;
    weatherCards.innerHTML = html;
  };
  
  const fetchWeather = (lat, lon, locationName) => {
    const units = "imperial";
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&lang=en&appid=${OPEN_WEATHER_API_KEY}`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(weatherData => displayWeather(weatherData, locationName))
      .catch(console.error);
  };

  const fetchInputLocationData = (e) => {
    const input = searchBox.value;
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&fields=geometry,name,formatted_address&inputtype=textquery&key=${GOOGLE_API_KEY}`;
    e.preventDefault();
    searchForm.reset();
    console.log(input);
    // debugger;
    if (input === "") return fetchUserLocationData();
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => {
        console.log(data.candidates[0]);
        const lat = data.candidates[0].geometry.location.lat.toPrecision(4);
        const lon = data.candidates[0].geometry.location.lng.toPrecision(4);
        const locationName = data.candidates[0].formatted_address;
        return fetchWeather(lat, lon, locationName);
      })
      .catch(console.error);
  };

  const fetchUserLocationName = (lat, lon) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=44.805331745443546,-95.53558784405938&key=${GOOGLE_API_KEY}`
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => {
        console.log(data);
        let locationName = "";
        const addressComponents = data.results.find(result => {
          if (result.types[0] === "locality" && 
              result.types[1] === "political" && 
              result.types.length === 2) {
            return true;
          }
        }).address_components;
        locationName = locationName.concat(addressComponents[0].long_name + ", " + addressComponents[2].short_name);
        console.log(addressComponents);
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

  const displayRdmMovieQuotes = () => {
    const movieQuote = document.querySelector('#movieQuote');
    movieQuote.innerHTML = getRdmMovieQuote();
  }

  //*event listeners:

  searchForm.addEventListener('submit', fetchInputLocationData);
  userLocationButton.addEventListener('click',fetchUserLocationData);


  fetchUserLocationData();
  displayRdmMovieQuotes();
  // searchBox.focus();


}

// document.addEventListener('DOMContentLoaded', initApp);
initApp();