export const buildDateStr = ({ timezone_offset }) => {
  const localTime = moment();
  const localUTCOffset = localTime.utcOffset() / 60;
  const targetUTCOffset = timezone_offset / 3600;
  console.log('localUTCOffset ->' + localUTCOffset);
  console.log('targetUTCOffset ->' + targetUTCOffset);
  const totalOffset = (localUTCOffset - targetUTCOffset) * -1;
  const targetDate = localTime.utcOffset(totalOffset);
  return targetDate;
};
