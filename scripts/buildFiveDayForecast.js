const parseDayName = date => new Date(date * 1000).toString().split(' ')[0];
const createSpan = () => document.createElement('SPAN');

export const buildFiveDayForecast = ({ weather }) => {
  const fiveDays = weather.daily.slice(1, 6);
  const docFrag = document.createDocumentFragment();
  fiveDays.forEach(day => {
    const {
      pop: rain,
      temp: { min },
      temp: { max },
      dt: date,
    } = day;

    const div = document.createElement('DIV');
    const span1 = createSpan();
    const img = document.createElement('IMG');
    const span2 = createSpan();
    const span3 = createSpan();

    div.className = 'day wrapper';
    span1.className = 'day-name';
    span1.textContent = parseDayName(date);
    img.src = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
    span2.textContent = Math.round(min);
    span3.className = 'unitSys';
    span3.innerText = '°F';

    span2.appendChild(span3);
    div.append(span1, img, span2);
    return docFrag.append(div);
  });
  return docFrag;
};
