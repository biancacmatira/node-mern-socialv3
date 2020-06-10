const axios = require("axios");
const HttpError = require("../models/http-error");

const getCoordsFromAdd = async (address) => {
  // axios is an async call
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.GOOGLE_APIKEY}`
  );
  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    throw HttpError("Could not find coordinates of the provided address", 422);
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
};

module.exports = getCoordsFromAdd;
