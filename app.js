// import { autocomplete } from './node_modules/@algolia/autocomplete-js'; // <-- A future component
import { compileInputForecast } from './scripts/compileInputForecast.js';
import { compileUserForecast } from './scripts/compileUserForecast.js';

const userLocationButton = document.querySelector('#userLocationButton');
const searchForm = document.querySelector('form');

const init = async () => {
  searchForm.addEventListener('submit', compileInputForecast);
  userLocationButton.addEventListener('click', compileUserForecast);

  return compileUserForecast();
};
document.addEventListener('DOMContentLoaded', init);
