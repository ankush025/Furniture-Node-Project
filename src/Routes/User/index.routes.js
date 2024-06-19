const express = require("express");

const appRoutes = express.Router();


const userRoute = require('./user.routes');



appRoutes.use("/user", userRoute);



module.exports = appRoutes;