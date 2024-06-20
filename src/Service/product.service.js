const Product = require("../Models/product.model");

module.exports = class ProductService {
  // Add New Product
  async addProduct(body) {
    try {
      return await Product.create(body);
    } catch (error) {
      return error.message;
    } 
  }

  // Get Product
  async getProduct(body) {
    try {
      return await Product.findOne(body);
    } catch (error) {
      return error.message;
    }
  }

  // Get All Product
  async getAllProduct(body) {
    try {
      return await Product.find(body);
    } catch (error) {
      return error.message;
    }
  }

  // Update Product
  async updatedProduct(id, body) {
    try {
      return await Product.findByIdAndUpdate(id, { $set: body }, { new: true });
    } catch (error) {
      return error.message;
    }
  }
};