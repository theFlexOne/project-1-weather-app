export const fetchUserLocationData = (options = {}) => {
  const success = position => {
    console.log(position.coords);
    let { latitude: lat, longitude: lon } = position.coords;
    return { lat, lon };
  };

  const error = error => {
    throw new Error(error);
  };

  return new Promise((success, error) => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  });
};

/* 
export const fetchUserLocationData = () => {
  console.log(navigator.geolocation);
  navigator.geolocation.getCurrentPosition(success, error);
};
*/

/*
var getPosition = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

getPosition()
  .then((position) => {
    console.log(position);
  })
  .catch((err) => {
    console.error(err.message);
  });
*/
