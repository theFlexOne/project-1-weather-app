export const buildFiveDayForecast = weatherData => {
  const fiveDays = weatherData.daily.slice(1, 6);
  const divs = [];
  fiveDays.forEach(day => {
    const {
      pop: rain,
      temp: { min },
      temp: { max },
      dt: date,
    } = day;
    const dayOfTheWeek = new Date(date * 1000).toString().split(' ')[0];
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
