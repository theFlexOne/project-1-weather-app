export const buildForecastDescription = ({ weather, date }) => {
  const current = weather.current;
  const daily = weather.daily;
  const today = daily[0];
  const sunrise = moment(today.sunrise * 1000).format('h:mm a');
  const sunset = moment(today.sunset * 1000).format('h:mm a');

  const docFrag = document
    .querySelector('#descriptionTemplate')
    .cloneNode(true).content;

  docFrag.querySelector('.high-temp').textContent =
    'High - ' + Math.round(today.temp.max) + '°F';
  docFrag.querySelector('.low-temp').textContent =
    'Low - ' + Math.round(today.temp.min) + '°F';
  docFrag.querySelector('.rainChance').textContent =
    'Rain - ' + today.pop + '%';
  docFrag.querySelector('.wind').textContent =
    'Wind - ' + current.wind_speed + 'm/h';
  docFrag.querySelector('.humidity').textContent =
    'Humidity - ' + current.humidity;
  docFrag.querySelector('.visibility').textContent =
    'Visibility - ' + current.visibility / 100 + '%';
  docFrag.querySelector('.sunrise').textContent = 'Sunrise - ' + sunrise;
  docFrag.querySelector('.sunset').textContent = 'Sunset - ' + sunset;

  return docFrag;
};
