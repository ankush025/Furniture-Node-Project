const favorite = require("../Models/favorite.model");

module.exports = class FavoriteServieces {
  // ADD NEW FAVORITE
  async addNewFavorite(body) {
    try {
      return await favorite.create(body);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // GET ALL FAVORITE
  async getAllFavorite(query, userID) {
    try {
      let favoriteItem =
        query.favoriteId && query.favoriteId !== ""
          ? [
              {
                $match: { _id: new mongoose.Types.ObjectId(query.favoriteId) },
              },
            ]
          : [];
      let loginUser =
        query.me && query.me === "true"
          ? [
              {
                $match: { user: userID },
              },
            ]
          : [];
      let pipeline = [
        {
          $match: { isDelete: false },
        },
        ...loginUser,
        ...favoriteItem,
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
            pipeline: [
              {
                $project: {
                  fullName: 1,
                  email: 1,
                  profileImage: 1,
                },
              },
            ],
          },
        },
        {
          $set: { user: { $first: "$user" } },
        },
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "product",
            pipeline: [
              {
                $project: {
                  title: 1,
                  price: 1,
                  product_image: 1,
                },
              },
            ],
          },
        },
        {
          $set: { "product": { $first: "$product" } },
        },
      ];
    //   console.log(pipeline);
      let result = await favorite.aggregate(pipeline);

      return result;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // UPDATE FAVORITE
  async updateFavorite(query, userID) {
    try {
      let updateFavorite = await favorite.findOneAndUpdate(
        {
          user: userID,
          isDelete: false,
        },
        {
          isDelete: true,
        },
        {
          new: true,
        }
      );
      return updateFavorite;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  // GET SPECIFIC FAVORITE
  async getFavorite(body) {
    try {
      return await favorite.findOne(body);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
};
