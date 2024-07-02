const FavoriteServieces = require("../../Service/favorite.service");
const favoriteService = new FavoriteServieces();

exports.addNewFavorite = async (req, res) => {
  try {
    let favorite = await favoriteService.getFavorite({
      product: req.body.product,
      user: req.user._id,
      isDelete: false,
    });
    if (favorite) {
      return res.status(400).json({ Message: "Favorite is alredy exist" });
    }
    favorite = await favoriteService.addNewFavorite({ ...req.body, user: req.user._id });
    res.status(201).json({ favorite, Message: "Favorite is Added..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Internal server Error" });
  }
};

exports.getAllFavorite = async (req, res) => {
  try {
    let favorite = await favoriteService.getAllFavorite(req.query , req.user._id);
    if(!favorite || favorite.length === 0){
      res.json({message: "User Have No favorite Items..."});
    }
    console.log(favorite);
    res.status(200).json(favorite);
  } catch (error) {
    console.log(error);
    // res.status(500).json({ Message: "Internal server Error" });
  }
}

exports.deleteFavorite = async (req, res) => {
  try {
    let favorite = await favoriteService.updateFavorite( req.query, req.user._id );
    res.status(202).json({ favorite, Message: "favorite is Deleted..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Message: "Internal server Error" });
  }
};