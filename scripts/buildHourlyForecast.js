const parseHourStr = hours => {
  let hourStr = '';
  if (hours > 12) hourStr += hours - 12 + ' PM';
  else hourStr += hours + (hours === 12 ? ' PM' : ' AM');
  return hourStr;
};

export const buildHourlyForecast = ({ weather }) => {
  const hourlyData = weather.hourly.slice(0, 6);
  const docFrag = document.createDocumentFragment();
  hourlyData.forEach(({ temp, dt }, i) => {
    const hours = parseHourStr(new Date(dt * 1000).getHours());
    const div = document.createElement('DIV');
    const span = document.createElement('SPAN');

    span.className = 'unitSys';
    span.textContent = '°F';
    div.append(`${hours} --- ${Math.round(temp)}`, span);
    docFrag.appendChild(div);
  });
  return docFrag;
};
