const express = require('express');
const verifyToken = require("../../Helper/verifyToken");
const shippingAddress = express.Router();

const{
   createShippingAdd,
   getAllShippingAdd,
   removeShippingAdd
} = require('../../Controller/User/shippingAdd.contrller');


shippingAddress.post('/create', verifyToken, createShippingAdd);
shippingAddress.get('/show', verifyToken ,getAllShippingAdd);
shippingAddress.delete('/remove', verifyToken ,removeShippingAdd);


module.exports = shippingAddress;