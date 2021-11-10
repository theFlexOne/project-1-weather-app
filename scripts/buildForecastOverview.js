const docFrag = document
  .querySelector('#overviewTemplate')
  .content.cloneNode(true);

console.log({ docFrag });

const location = docFrag.querySelector('.location');
const dayName = docFrag.querySelector('.day-name');
const date = dayName.nextElementSibling;
const img = docFrag.querySelector('img');
const temp = docFrag.querySelector('.current-temp');
const units = temp.nextElementSibling;

export const buildForecastOverview = (data, num = 0) => {
  location.textContent = data.location[0] + data.location[1];
  dayName.textContent = data.date.weather.dayName;
  date.textContent = data.date.weather.date;
  const icon = data.weather.current.weather[0].icon;
  img.src = `http://openweathermap.org/img/wn/${icon}@4x.png`;
  temp.textContent = `${Math.round(data.weather.current.temp)}`;
  units.textContent = `°F`;

  return docFrag;
};
