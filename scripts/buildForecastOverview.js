const templateCard = document
  .querySelector('#overviewTemplate')
  .content.cloneNode(true);

const location = templateCard.querySelector('.location');
const dayName = templateCard.querySelector('.day-name');
const date = dayName.nextElementSibling;
const img = templateCard.querySelector('img');
const temp = templateCard.querySelector('.temp');
const units = temp.nextElementSibling;

console.log({ location }, { dayName }, { date }, { img }, { temp });
export const buildForecastOverview = (data, num = 0) => {
  location.textContent = data.location[0] + data.location[1];
  dayName.textContent = data.date.weather.dayName;
  date.textContent = data.date.weather.date;
  const icon = data.weather.current.weather[0].icon;
  img.src = `http://openweathermap.org/img/wn/${icon}@4x.png`;
  temp.textContent = `${Math.round(data.weather.current.temp)}`;
  units.textContent = `°F`;

  return templateCard;
};
