const express = require("express");

const placesControllers = require("../controllers/places-controllers");
const router = express.Router();

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.get("/:pid", placesControllers.getPlaceById);

router.post("/", placesControllers.postPlace);

router.patch("/:pid", placesControllers.updatePlace);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
