// services/shippingAddressService.js

const ShippingAdd = require('../Models/shippingAdd.model');
const mongoose = require("mongoose");

module.exports = class ShippingAddressService {
    
    // Create New Shipping Address
    async newShippingAdd(shippingAddressData, userID){
        try {
            return await ShippingAdd.create({
                user: userID,
                products: [shippingAddressData],
            });
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    // Get All Shipping Addresses
    async getAllShippingAdd(query, userID) {
        try {
            let orderItem =
                query.orderId && query.orderId !== ""
                ? [
                    {
                        $match: { _id: new mongoose.Types.ObjectId(query.orderId) },
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
                ...orderItem,
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

            let shippingAdd = await ShippingAdd.aggregate(pipeline);
            
            return shippingAdd;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    // Remove Shipping Address
    async removeShippingAdd(query, userID) {
        try {
            let removeShipping = await ShippingAdd.findOneAndUpdate(
                {
                    user: userID,
                    isDelete: false,
                },
                {
                    isDelete: true
                },
                {
                    new: true,
                }
            );
            return removeShipping;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }
};
