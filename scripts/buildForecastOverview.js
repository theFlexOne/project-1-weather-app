export const buildForecastOverview = data => {
  console.log(data);
  const docFrag = document
    .querySelector('#overviewTemplate')
    .content.cloneNode(true);

  const location = docFrag.querySelector('.location');
  const dayName = docFrag.querySelector('.day-name');
  console.log({ dayName });
  const date = dayName.nextElementSibling;
  console.log({ date });
  const img = docFrag.querySelector('img');
  const temp = docFrag.querySelector('.current-temp');
  const units = temp.nextElementSibling;

  const icon = data.weather.current.weather[0].icon;

  location.textContent = data.location;
  dayName.textContent = data.date.format('ddd');
  date.textContent = data.date.format('MMMM Do');
  img.src = `http://openweathermap.org/img/wn/${icon}@4x.png`;
  temp.textContent = `${Math.round(data.weather.current.temp)}`;
  units.textContent = `°F`;

  return docFrag;
};
