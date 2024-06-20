const express = require("express");

const appRoute = express.Router();


const userRoute = require('./user.routes');



appRoute.use("/user", userRoute);



module.exports = appRoute;