const fiveDayTemplate = document.querySelector('#fiveDayTemplate');
const fiveDayClone = fiveDayTemplate.content.cloneNode(true);

const parseDayName = date => new Date(date * 1000).toString().split(' ')[0];
const createSpan = () => document.createElement('SPAN');

export const buildFiveDayForecast = weatherData => {
  const fiveDays = weatherData.daily.slice(1, 6);
  const docFrag = document.createDocumentFragment();

  // const divs = [];
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
    const span4 = createSpan();

    div.className = 'day wrapper';
    span1.className = 'day-name';
    span1.textContent = parseDayName(date);
    img.src = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
    span2.textContent = `${Math.round(min)}`;
    span3.className = 'unitSys';
    span4.className = 'unitSys';
    span3.textContent = '&deg;F';
    span4.textContent = '&deg;F';

    span2.appendChild(span3);
    div.append(span1, img, span2);
    console.dir(div.childNodes);
    return docFrag.append(div);
  });
  return docFrag;
};
// const div = `
//   <div class="day wrapper">
//     <span class="day-name">${dayName}</span>
//     <img src="${iconURL}">
//     <span>
//       ${Math.round(min)}&deg;<span class="unitSys">F</span> - ${Math.round(
//   max
// )}&deg;<span class="unit">F</span>
//     </span>
//   </div>`;
// divs.push(div);
// return divs.join('');
