const createSpan = () => document.createElement('SPAN');

export const buildFiveDayForecast = ({ weather }) => {
  const fiveDays = weather.daily.slice(1, 6);
  const docFrag = document.createDocumentFragment();
  fiveDays.forEach(day => {
    const dayName = moment(day.dt * 1000).format('ddd');

    const {
      pop: rain,
      temp: { min },
      temp: { max },
    } = day;

    const div = document.createElement('DIV');
    const span1 = createSpan();
    const img = document.createElement('IMG');
    const span2 = createSpan();
    const span3 = createSpan();
    const span4 = createSpan();

    div.className = 'day wrapper';
    span1.className = 'day-name';
    span1.textContent = dayName;
    img.src = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
    span2.className = 'min-max';
    span3.textContent = Math.round(min) + '°F';
    span3.className = 'unitSys';
    span4.textContent = Math.round(max) + '°F';
    span4.className = 'unitSys';

    span2.appendChild(span3);
    div.append(span1, img, span2);
    return docFrag.append(div);
  });
  return docFrag;
};
