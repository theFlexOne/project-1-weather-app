export const buildForecastDescription = ({ weather }) => {
  const current = weather.current;
  const daily = weather.daily;
  const today = daily[0];
  const sunrise = moment(today.sunrise * 1000);
  const sunset = moment(today.sunset * 1000);

  const docFrag = document
    .querySelector('#descriptionTemplate')
    .cloneNode(true).content;

  docFrag.querySelector('.high-temp').textContent = Math.round(today.temp.max);
  docFrag.querySelector('.low-temp').textContent = Math.round(today.temp.min);
  docFrag.querySelector('.rainChance').textContent = today.pop;
  docFrag.querySelector('.wind').textContent = current.wind_speed + 'm/h';
  docFrag.querySelector('.humidity').textContent = current.humidity;
  docFrag.querySelector('.visibility').textContent =
    current.visibility / 100 + '%';
  docFrag.querySelector('.sunrise').textContent =
    sunrise.hour() +
    ':' +
    (sunrise.minutes() < 10 ? '0' : '') +
    sunrise.minutes() +
    ' AM';
  docFrag.querySelector('.sunset').textContent =
    sunset.hours() > 12
      ? sunset.hours() - 12
      : sunset.hours() + ':' + sunset.minutes() < 10
      ? '0'
      : '' + sunset.minutes() + ' PM';

  return docFrag;
};
