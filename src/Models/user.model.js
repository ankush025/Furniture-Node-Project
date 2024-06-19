const mongoose = require('mongoose');

const userSchema =mongoose.Schema(
    {
        fullName:{
            type: String,
        },
        email: {
            type :String,
            unique: true,
        },
        mobileNo:{
            type: String,
        },
        password:{
            type: String,
        },
        DOB:{
            type: Date,
        },
        profileImage:{
            type: String,
        },
        gender:{
            type: String,
            enum : ["Male", "Female"],
        },
        country:{
            type: String,
        },
        state:{
            type: String,
        },
        city: {
            type: String,
        },
        isDelete:{
            type: Boolean,
            default: false,
        },
    },
    {
        versionKey: false,
        timestamps : true,
    }
);

module.exports = mongoose.model("users",userSchema);