export const buildDateStr = () => {
  let [weekday, ...date] = new Date().toDateString().split(' ');
  date = date.join(',');
  // console.log(weekday, date);
  return {
    weekday,
    date,
  };
};
