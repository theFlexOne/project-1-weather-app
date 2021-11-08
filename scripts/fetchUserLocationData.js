export const fetchUserLocationData = (options = {}) => {
  if (!navigator.geolocation) {
    console.warn("User's location is unavailable");
  } else {
    const success = position => {
      console.log(position.coords);
      let { latitude: lat, longitude: lon } = position.coords;
      return { lat, lon };
    };
  }
  const error = error => {
    throw new Error(error);
  };

  //TODO - FIX THIS
  return new Promise((resolve, reject) => {
    const success = position => {
      console.log(position.coords);
      let { latitude: lat, longitude: lon } = position.coords;
      return { lat, lon };
    };
    const error = error => {
      throw new Error(error);
    };

    try {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } catch (err) {
      throw new Error(err);
    }
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
