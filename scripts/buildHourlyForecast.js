export const buildHourlyForecast = ({ weather }) => {
  // debugger;
  const docFragOl = document.createDocumentFragment();
  console.dir(weather);
  const hourlyData = weather.hourly.slice(0, 6);
  // const docFrag = document.createDocumentFragment();
  const template = document.querySelector('#hourlyTemplate');
  console.log(template);
  hourlyData.forEach(hour => {
    const frag = template.content.cloneNode(true);
    const spanHour = frag.querySelector('.hour');
    const spanImg = frag.querySelector('img');
    const spanTemp = frag.querySelector('.temp');

    const hourText = moment(hour.dt * 1000).format('ha');
    const img = hour.weather[0].icon;
    spanHour.textContent = hourText;
    spanImg.src = `http://openweathermap.org/img/wn/${img}.png`;
    spanTemp.textContent = `${Math.round(hour.temp)}°F`;
    // div.append(spanHr, '---', spanTemp);
    docFragOl.appendChild(frag);
  });
  return docFragOl;
};
