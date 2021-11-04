export const buildHourlyForecast = weatherData => {
  console.dir(weatherData.hourly);
  const hourlyData = weatherData.hourly.slice();
  const docFrag = document.createDocumentFragment();
  const divs = [];
  const parseHourStr = hours => {
    let hourStr = '';
    if (hours > 12) hourStr += hours - 12 + ' PM';
    else hourStr += hours + (hours === 12 ? ' PM' : ' AM');
    return hourStr;
  };
  hourlyData.forEach(({ temp, dt }, i) => {
    const hours = parseHourStr(new Date(dt * 1000).getHours());
    const div = document.createElement('DIV');
    const span = document.createElement('SPAN');
    const text = document.createTextNode(`${hours} --- ${Math.round(temp)}`);

    // console.dir(text);
    span.className = 'unitSys';
    span.textContent = 'F';
    div.append(text, span);
    divs.push(div.outerHTML);
  });
  return divs.join('');
};
