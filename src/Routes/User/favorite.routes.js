const express = require("express");
const favoriteRoutes = express.Router();
const verifyToken  = require("../../Helper/verifyToken");

const {
  addNewFavorite,
  deleteFavorite,
  getAllFavorite,
} = require("../../Controller/User/favorite.controller");

favoriteRoutes.post("/create", verifyToken, addNewFavorite);

favoriteRoutes.get("/getAll", verifyToken, getAllFavorite);

favoriteRoutes.delete("/delete", verifyToken, deleteFavorite);

module.exports = favoriteRoutes;
