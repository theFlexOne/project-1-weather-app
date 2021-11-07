const templateCard = document.querySelector('#overviewTemplate').content;
let location, dayName, date, img, temp;

console.log({ templateCard });

location = templateCard.querySelector('.location');
dayName = templateCard.querySelector('.day-name');
date = dayName.nextElementSibling;
img = templateCard.querySelector('img');
temp = templateCard.querySelector('.temp');

console.log(location, dayName, date, img, temp);

export const buildForecastOverview = (data, num = 0) => {
  location.textContent = data.location[0] + data.location[1];
  dayName.textContent = data.weather.dayName;
  date.textContent = data.weather.date;
  const icon = data.weather.current.weather[0].icon;
  img.src = `http://openweathermap.org/img/wn/${icon.icon}@4x.png`;
  temp.textContent = data.weather.current.temp;

  console.log(templateCard);
  return templateCard;
};

//* HTML *//
/*   const forecastOverview = `      
  <div class="location-and-date">
    <div class="location">${locationName.join(' ')}</div>
    <div class="date">
    <span class="day-name">${dayName}</span>        
    <span>${monthDayYear}</span>        
    </div>
  </div>
  <div class="weather">
    <div class="image-wrapper">  
      <img
        src="http://openweathermap.org/img/wn/${
          current.weather[0].icon
        }@4x.png">
    </div>
    <div class="temp">
      ${Math.round(current.temp)}<span class="unit">°F</span>
    </div>
  </div>
`; */
