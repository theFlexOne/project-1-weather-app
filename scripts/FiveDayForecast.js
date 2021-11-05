// import { HTMLTags } from './HTMLTags.js';

export class FiveDayForecast extends HTMLElement {
  constructor(weatherData) {
    super();
    const fiveDays = weatherData.daily.slice(1, 6);
    this.attachShadow({ mode: 'open' });
    // const docFrag = document.createDocumentFragment();
    console.log(HTMLTags);
    // const div = document.createElement('div');

    div.className = 'day wrapper';
    const dayOfTheWeek = div.appendChild();
  }
}
