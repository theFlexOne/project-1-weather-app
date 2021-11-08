// import { autocomplete } from './node_modules/@algolia/autocomplete-js'; // <-- A future component
import { compileInputForecast } from './scripts/compileInputForecast.js';
import { compileUserForecast } from './scripts/compileUserForecast.js';

const init = async () => {
  // debugger;
  const userLocationButton = document.querySelector('#userLocationButton');
  const searchForm = document.querySelector('form');

  compileUserForecast();

  searchForm.addEventListener('submit', compileInputForecast);
  userLocationButton.addEventListener('click', compileUserForecast);
};

document.addEventListener('DOMContentLoaded', init);
