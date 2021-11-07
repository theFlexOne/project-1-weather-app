const findNumSuffix = num => {
  switch (num + '') {
    case '1': {
      return num + 'st';
    }
    case '2': {
      return num + 'nd';
    }
    case '3': {
      return num + 'rd';
    }
    default: {
      return num + 'th';
    }
  }
};

export const formatDay = day => {
  if (day.startsWith(0)) day = day.slice(1);
  day = findNumSuffix(day);
  return day;
};
