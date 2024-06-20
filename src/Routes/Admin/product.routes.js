const express = require("express");
const productRoutes = express.Router();

const upload = require('../../Helper/imageUpload');

const{
    createProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct 
} = require("../../Controller/Admin/product.controller")




// CRUD


// Create => POST Method
productRoutes.post('/create',upload.single('product_image'),createProduct);


// READ => GET Method (ALL Products)
productRoutes.get('/allproduct',getAllProduct );


// READ => GET Method (Single)
productRoutes.get('/:getproduct',getProduct);


// Update => PATCH Method
productRoutes.put('/update/:id',updateProduct);


// Delete => DELETE Method
productRoutes.delete('/delete/:id',deleteProduct);


module.exports = productRoutes;