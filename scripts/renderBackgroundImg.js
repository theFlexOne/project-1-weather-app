const body = document.querySelector('body');

export const renderBackgroundImg = ({
  weather: {
    daily: [today],
  },
}) => {
  if (Date.now() < today.sunset && Date.now() > today.sunrise)
    body.style.backgroundImage =
      'url(/Images/mosi-knife--PVgDgKXgZA-unsplash-edit1.jpg)';
  else body.style.backgroundImage = 'url(/Images/night-sky-cloudy-moon.jpg)';
};
