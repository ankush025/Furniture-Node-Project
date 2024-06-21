const express = require("express");

const appRoute = express.Router();


const userRoute = require('./user.routes');
const favoriteRoute = require('./favorite.routes');


appRoute.use("/user", userRoute);
appRoute.use("/favorite", favoriteRoute);


module.exports = appRoute;