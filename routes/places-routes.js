const express = require('express');

const placesControllers = require('../controllers/places-controllers');
const router = express.Router();

router.get('/user/:uid', placesControllers.getPlacesByUserId );

router.get('/:pid', placesControllers.getPlaceById );

router.post('/', (req,res,next)=> {
    res.json({});
});

router.patch('/:pid', (req,res,next)=> {
    res.json({});
});

router.delete('/:pid', (req,res,next)=> {
    res.json({});
})

module.exports = router;