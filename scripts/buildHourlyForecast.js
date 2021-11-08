const parseHourStr = hours => {
  let hourStr = '';
  if (hours > 12) hourStr += hours - 12 + ' PM';
  else hourStr += hours + (hours === 12 ? ' PM' : ' AM');
  return hourStr;
};

export const buildHourlyForecast = ({ weather }) => {
  console.dir(weather);
  const hourlyData = weather.hourly.slice(0, 6);
  const docFrag = document.createDocumentFragment();
  hourlyData.forEach(({ temp, dt }, i) => {
    const hours = parseHourStr(new Date(dt * 1000).getHours());
    const div = document.createElement('DIV');
    const spanHr = document.createElement('SPAN');
    const spanTemp = document.createElement('SPAN');

    spanHr.className = 'hour';
    spanHr.textContent = `${Math.round(temp)}°F`;
    spanHr.className = 'temp';
    spanHr.textContent = `${Math.round(temp)}°F`;
    div.append(`${hours} --- ${Math.round(temp)}`, span);
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
