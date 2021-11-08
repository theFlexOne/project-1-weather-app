import { formatDay } from './formatDay.js';

const formatTime = time => {
  const [hour, min, sec, ...utc] = time.split(':');
  return {
    hour,
    min,
    sec,
    utc,
  };
};

export const buildDate = ({ timezone_offset: targetUTCOffset }) => {
  const localUTCOffset = moment().utcOffset() / 60;
  targetUTCOffset /= 3600;
  const totalOffset = (localUTCOffset - targetUTCOffset) * -1;
  const targetDate = moment().utcOffset(totalOffset);
  let [dayName, month, day, year, time] = targetDate.toString().split(' ');

  return {
    weather: {
      dayName: dayName,
      date: `${month || 'n/a'} ${formatDay(day) || 'n/a'}, ${year || 'n/a'}`,
      time: formatTime(time),
      full: targetDate.toString(),
    },
    targetDate,
  };
};
