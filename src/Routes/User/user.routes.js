const express = require("express");
const userRoutes = express.Router();

const upload = require('../../Helper/imageUpload');


const {
        registerUser,
        loginUser,
        getProfile,
        updateProfile,
        changePassword,
        deleteUser
} = require("../../Controller/User/user.controller");


const verifyToken = require("../../Helper/verifyToken");




userRoutes.post("/register", upload.single('profileImage'), registerUser);

userRoutes.post("/login", loginUser);

userRoutes.get("/profile",verifyToken, getProfile);

userRoutes.put("/update",verifyToken, updateProfile);

userRoutes.put("/Change-Password",verifyToken, changePassword);

userRoutes.delete("/delete",verifyToken, deleteUser);


module.exports = userRoutes;