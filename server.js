const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/places', placesRoutes) //route for places
app.use('/api/users', usersRoutes) //route for users

app.listen(PORT);