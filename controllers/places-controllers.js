const HttpError = require("../models/http-error");
// const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const getCoordsFromAdd = require("../util/location");

const User = require("../models/user");
const Place = require("../models/place");
// let PLACES = require("../data").DUMMY_PLACES;

exports.getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  //   const places = PLACES.filter((place) => place.creator === userId);

  let userPlaces;
  try {
    // finds all, but filtering with userId
    // userPlaces = await Place.find({ creator: userId });
    userPlaces = await User.findById(userId).populate("places");
  } catch (err) {
    return next(new HttpError("Could not find places", 500));
  }

  if (!userPlaces || userPlaces.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id", 404)
    );
  }

  res.json({ message: "Your places", places: userPlaces });
};

exports.getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  //   const place = PLACES.find((p) => p._id === placeId);

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(new HttpError("Could not find the place", 500));
  }

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided id", 404)
    );
  }
  res.json({ place });
};

exports.postPlace = async (req, res, next) => {
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    // when using async, avoid throw, it wont work well with express
    // throw new HttpError(err.message, 422);
    return next(new HttpError("Invalid Input", 422));
  }

  // deconstructed from the form
  const { title, description, address, imageUrl, creator } = req.body;

  let coords;

  // handle error in async/await
  try {
    coords = await getCoordsFromAdd(address);
  } catch (err) {
    return next(err);
  }

  const newPlace = new Place({
    title,
    description,
    address,
    location: coords,
    imageUrl,
    //   "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
    creator,
  });

  //   PLACES.push(newPlace);

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    return next(new HttpError("Create place failed", 500));
  }

  if (!user) {
    return next(new HttpError("Could not find user for provided ID", 404));
  }

  try {
    //       await newPlace.save();
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newPlace.save({ session: sess }); // created unique place id
    user.places.push(newPlace); // establishing connection between 2 models
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError("Create place failed", 500));
  }

  res
    .status(201)
    .json({ place: newPlace, message: "A new place has been added" });
};

exports.updatePlace = async (req, res, next) => {
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return next(new HttpError("Invalid inout", 422));
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  //   const updatedPlace = PLACES.find((place) => place._id === placeId);
  //   const placeIndex = PLACES.findIndex((place) => place._id === placeId);

  let updatedPlace;
  try {
    updatedPlace = await Place.findById(placeId);
  } catch (err) {
    return next(new HttpError("Could not find the place", 500));
  }

  updatedPlace.title = title; // from req.body
  updatedPlace.description = description;

  //   // find index, replace/new value
  //   PLACES[placeIndex] = updatedPlace;

  try {
    await updatedPlace.save();
  } catch (err) {
    return next(new HttpError("Could not find the place", 500));
  }

  res.status(200).json({ place: updatedPlace, message: "Place updated" });
};

exports.deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  //   PLACES = PLACES.filter((place) => place._id !== placeId);

  let place;
  try {
    // place = await Place.findById(placeId);
    // populate with not just creator id => object using REF
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    return next(new HttpError("Could not delete place", 500));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    // access the place stored in the user and pull it (populate)
    // creator object - places
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError("Could not delete place", 500));
  }

  res.status(200).json({ message: "Place deleted" });
};
