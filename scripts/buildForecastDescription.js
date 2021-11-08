export const buildForecastDescription = data => {
  const current = data.weather.current;
  const daily = data.weather.daily;
  const today = daily[0];
  const sunrise = moment(today.sunrise);
  const sunset = moment(today.sunset);

  console.log(today, sunrise, sunset);

  const docFrag = document.createDocumentFragment();
  docFrag.innerHTML = `<div class="high-temp">High: ${Math.round(
    today.temp.max
  )}<span class="unit">°F</span></div>
  <div class="low-temp">Low: ${Math.round(
    today.temp.min
  )}<span class="unit">°F</span></div>
  <div class="rain">Rain: ${today.pop}%</div>
  <div class="wind">Wind: ${current.wind_speed} m/h</div>
  <div class="humidity">Humidity: ${current.humidity}%</div>
  <div class="visibility">Visibility: ${current.visibility / 100}%</div>
  <div class="sunrise">Sunrise: ${sunrise.hour()}:${
    (sunrise.hour() < 10 ? '0' : '') + sunrise.hour
  } AM
  </div>
  <div class="sunset">Sunset: ${
    sunset.getHours() > 12 ? sunset.getHours() - 12 : sunset.getHours()
  }:${(sunset.getMinutes() < 10 ? '0' : '') + sunset.getMinutes()} PM
  </div>`;
};

/* `
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
 */
