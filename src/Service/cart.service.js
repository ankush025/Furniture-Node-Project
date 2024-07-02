const { query } = require("express");
const { getAllCarts } = require("../Controller/User/cart.controller");
const Cart = require("../Models/cart.model");
const { default: mongoose } = require("mongoose");

module.exports = class CartServices {
  // Create Cart

  async addNewCart(body, userID) {
    try {
      let userCarts = await Cart.findOne({ user: userID, isDelete: false });
      if (!userCarts) {
        return await Cart.create({
          user: userID,
          products: [
            {
              productId: body.productId,
              quantity: body.quantity || 1,
            },
          ],
        });
      } else {
        let findproductIndex = userCarts.products.findIndex(
          (item) => String(item.productId) === body.productId
        );
        if (findproductIndex !== -1) {
          userCarts.products[findproductIndex].quantity += body.quantity || 1;
        } else {
          userCarts.products.push({
            productId: body.productId,
            quantity: body.quantity || 1,
          });
        }
        return await userCarts.save();
      }
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }

  // Get All Carts

  async getAllCarts(query, userID) {
    try {
      let cartItem =
        query.cartId && query.cartId !== ""
          ? [
              {
                $match: { _id: new mongoose.Types.ObjectId(query.cartId) },
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
        ...cartItem,
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
            pipeline: [
              {
                $project: {
                  firstName: 1,
                  lastName: 1,
                  email: 1,
                },
              },
            ],
          },
        },
        {
          $set: { user: { $first: "$user" } },
        },
        {
          $unwind: "$products",
        },
        {
          $lookup: {
            from: "products",
            localField: "products.productId",
            foreignField: "_id",
            as: "products.productId",
            pipeline: [
              {
                $project: {
                  title: 1,
                  price: 1,
                },
              },
            ],
          },
        },
        {
          $set: { "products.productId": { $first: "$products.productId" } },
        },
      ];

      let carts = await Cart.aggregate(pipeline);

      let totalAmount = carts
        .map((item) => ({
          quantity: item.products.quantity,
          price: item.products.productId.price,
        }))
        .reduce((total, item) => (total += item.quantity * item.price), 0);
        let discountAmount = (totalAmount * 0.05);
        let GST = (totalAmount * 0.18);
        totalAmount = totalAmount - (discountAmount + GST);
      // console.log(totalAmount);
      return { carts , GST: GST ,discount: discountAmount, totalAmount };
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }

  // Update Cart

  async updateCart(body, userID) {
    try {
      let userCarts = await Cart.findOne({ user: userID });
      console.log(userCarts);
      let findproductIndex = userCarts.products.findIndex(
        (item) => String(item.productId) === body.productId
      );
      if (findproductIndex !== -1) {
        userCarts.products[findproductIndex].quantity = body.quantity || 1;
      } else {
        userCarts.products.push({
          productId: body.productId,
          quantity: body.quantity || 1,
        });
      }
      return await userCarts.save();
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }

  // Remove Cart
  async removeCart(query, userID) {
    try {
      let removeCart = await Cart.findOneAndUpdate(
        {
          user: userID,
        },
        {
          $pull: {
            products: {
              productId: new mongoose.Types.ObjectId(query.productId),
            },
          },
        },
        {
          new: true,
        }
      );
      return removeCart;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
};