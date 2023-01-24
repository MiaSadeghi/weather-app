const axios = require("axios");

const geocode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=dfa6f64afdbd4bc6743c308823cffaa3&query=${encodeURIComponent(
    address,
  )}&limit=1`;
  let lat = 0;
  let lon = 0;
  let location = "";
  axios
    .get(url)
    .then((response) => response.data)
    .then((data) => {
      if (data.data.length > 0) {
        lat = data.data[0].latitude;
        lon = data.data[0].longitude;
        location = data.data[0].label;
        callback({ lat, lon, location });
      } else {
        callback("could not find location");
      }
    })
    .catch((e) => {
      if (e.response) {
        let errorMessage = e.response.data.error.message;
        const errorStatusCode = e.response.status;
        if (errorStatusCode === 422) {
          errorMessage = e.response.data.error.context.query.message;
        }
        callback("Error " + errorStatusCode + ": " + errorMessage);
      } else if (e.request) {
        callback("There was a problem connecting to the server.");
      } else {
        callback("Something went wrong.");
      }
    });
};

module.exports = geocode;
