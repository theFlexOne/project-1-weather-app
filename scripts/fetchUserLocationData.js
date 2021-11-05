const success = position => {
  console.log(position);
  let { latitude: lat, longitude: lon } = position.coords;
  return { lat, lon };
};

// const error = error => {
//   throw new Error(error);
// };

export const fetchUserLocationData = async () => {
  console.log(navigator.geolocation);
  const coords = navigator.geolocation.getCurrentPosition(success);
  console.log(coords);
};
