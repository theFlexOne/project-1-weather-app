const body = document.querySelector('body');

export const renderBackgroundImg = (sunrise, sunset) => {
  if (Date.now() < sunset && Date.now() > sunrise)
    body.style.backgroundImage =
      'url(/Images/mosi-knife--PVgDgKXgZA-unsplash-edit1.jpg)';
  else body.style.backgroundImage = 'url(/Images/night-sky-cloudy-moon.jpg)';
};
