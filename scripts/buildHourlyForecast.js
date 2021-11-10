export const buildHourlyForecast = ({ weather }) => {
  console.dir(weather);
  const hourlyData = weather.hourly.slice(0, 6);
  const docFrag = document.createDocumentFragment();
  hourlyData.forEach(({ temp, dt }) => {
    const hours = moment().format('ha');
    const div = document.createElement('DIV');
    const spanHr = document.createElement('SPAN');
    const spanTemp = document.createElement('SPAN');

    spanHr.className = 'hour';
    spanHr.textContent = moment().format('ha');
    spanTemp.className = 'temp';
    spanTemp.textContent = `${Math.round(temp)}°F`;
    div.append(spanHr, '---', spanTemp);
    docFrag.appendChild(div);
  });
  return docFrag;
};

/*
<div class="hours-wrapper" id="hoursWrapper">
  <div>2 PM --- 51<span class="unitSys">°F</span></div>
  <div>3 PM --- 51<span class="unitSys">°F</span></div>
  <div>4 PM --- 50<span class="unitSys">°F</span></div>
  <div>5 PM --- 49<span class="unitSys">°F</span></div>
  <div>6 PM --- 47<span class="unitSys">°F</span></div>
  <div>7 PM --- 45<span class="unitSys">°F</span></div>
</div>
*/
