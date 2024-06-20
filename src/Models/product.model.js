const mongoose = require("mongoose");



const productSchema = mongoose.Schema({
    title : {
        type: String,
    },
    price : {
        type : Number
    },
    quantity : {
        type: Number
    },
    rating : {
        type: Number
    },
    product_image : {
        type: String
    },
    warranty : {
        type: String
    },
    brand : {
        type: String,
        enum: ["WoodenStreet", "HomeTown", "Nilkamal" , "Royaloak"]
    },
    isDelete:{
        type: Boolean,
        default: false,
    }
},{
    versionKey: false
});




module.exports = mongoose.model('products',productSchema);