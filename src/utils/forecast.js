const axios = require("axios");

const forecast = ({ lat, lon }, callback) => {
  const weatherAPI = `http://api.weatherstack.com/current?access_key=192ca691578ddf48ae6123be2f443197&query=${lat},${lon}`;

  axios
    .get(weatherAPI)
    .then((response) => {
      const apiResponse = response.data;
      if (apiResponse.error) {
        callback(
          "error code " +
            apiResponse.error.code +
            ": " +
            apiResponse.error.info,
        );
      } else {
        callback(apiResponse);
      }
    })
    .catch((e) => {
      if (e.request) {
        callback("Unable to connect to weather service.");
      } else {
        callback("Something went wrong.");
      }
    });
};

module.exports = forecast;
