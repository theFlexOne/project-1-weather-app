export const getHourlyForecast = weatherData => {
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
