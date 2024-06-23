const express = require("express");

const appRoute = express.Router();


const userRoute = require('./user.routes');
const favoriteRoute = require('./favorite.routes');
const cartRoute = require('./cart.routes')
const orderRoute = require('./order.routes')


appRoute.use("/user", userRoute);
appRoute.use("/favorite", favoriteRoute);
appRoute.use("/cart", cartRoute);
appRoute.use("/order", orderRoute)

module.exports = appRoute;