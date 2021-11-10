export const fetchUserLocationData = (options = {}) => {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      const success = position => {
        console.log(position);
        resolve(position);
      };
      const error = err => {
        reject(new Error(err));
      };
      navigator.geolocation.getCurrentPosition(success, error);
    });
  } else {
    return console.warn(
      'navigator.geolocation is not available on this device and/or browser.'
    );
  }
};
