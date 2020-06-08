const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require("uuid");

let PLACES = require("../data").DUMMY_PLACES;

exports.getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = PLACES.filter((place) => place.creator === userId);

  if (places.length === 0) {
    throw new HttpError("Could not find places for the provided user id", 404);
  }
  res.json({ message: "Your places", places: places });
};

exports.getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = PLACES.find((p) => p.id === placeId);

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided id", 404)
    );
  }
  res.json({ place });
};

exports.postPlace = (req, res, next) => {
  // deconstructed from the form
  const { title, description, coordinates, address, creator } = req.body;
  const newPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  PLACES.push(newPlace);
  res
    .status(201)
    .json({ place: newPlace, message: "A new place has been added" });
};

// update/patch
exports.updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = PLACES.find((place) => place.id === placeId);
  const placeIndex = PLACES.findIndex((place) => place.id === placeId);

  updatedPlace.title = title; // from req.body
  updatedPlace.description = description;

  // find index, replace/new value
  PLACES[placeIndex] = updatedPlace;
  res.status(200).json({ place: updatedPlace, message: "Place updated" });
};

exports.deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  PLACES = PLACES.filter((place) => place.id !== placeId);

  res.status(200).json({ place: PLACES, message: "Place deleted" });
};
