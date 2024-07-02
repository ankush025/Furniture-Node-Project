const express = require("express");

const adminRoutes = express.Router();


const productRoute = require('./product.routes');



adminRoutes.use("/product", productRoute);



module.exports = adminRoutes;