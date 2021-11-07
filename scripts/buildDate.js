import { formatDay } from './formatDay.js';

const formatTime = time => {
  const [hour, min, sec, ...utc] = time.split(':');
  return {
    hour,
    min,
    sec,
    utc,
    // get amOrPm () {

    // }
  };
};

export const buildDate = ({ timezone_offset: targetUTCOffset }) => {
  // super();
  // const localTime = moment();
  const localUTCOffset = moment().utcOffset() / 60;
  targetUTCOffset /= 3600;
  const totalOffset = (localUTCOffset - targetUTCOffset) * -1;
  const targetDate = moment().utcOffset(totalOffset);
  // console.dir(targetDate);
  let [dayName, month, day, year, time] = targetDate.toString().split(' ');

  return {
    weather: {
      dayName: dayName,
      date: `${month || 'n/a'} ${formatDay(day) || 'n/a'}, ${year || 'n/a'}`,
      time: formatTime(time),
      utc: targetDate['_d'],
    },
    targetDate,
  };
};

/* export const buildDate = ({ timezone_offset }) => {
  const localTime = moment();
  const localUTCOffset = localTime.utcOffset() / 60;
  const targetUTCOffset = timezone_offset / 3600;
  // console.log('localUTCOffset ->' + localUTCOffset);
  // console.log('targetUTCOffset ->' + targetUTCOffset);
  const totalOffset = (localUTCOffset - targetUTCOffset) * -1;
  const targetDate = localTime.utcOffset(totalOffset);
  console.dir(targetDate);
  let [dayName, month, day, year, time, utc] = targetDate.toString().split(' ');
  day = formatDay(day);
  time = formatTime(time);
  console.log(time);
  return { dayName, date:{ dateComponents: [month, day, year], dayName: dayName, targetDate: {} };
};
 */
