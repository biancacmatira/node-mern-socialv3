const HttpError = require('../models/http-error');

const PLACES = require('../data').DUMMY_PLACES;

exports.getPlacesByUserId = (req,res,next) => {
    const userId = req.params.uid;
    const places = PLACES.filter(place => place.creator === userId);

    if(places.length === 0){
        throw new HttpError('Could not find places for the provided user id', 404);
    }
    res.json({message: 'Your places', places: places});
};

exports.getPlaceById = (req,res,next)=> {
    const placeId = req.params.pid;
    const place = PLACES.find(p => p.id === placeId);

    if(!place){
        return next( new HttpError('Could not find a place for the provided id' ,404) );
    }
    res.json({place});
};