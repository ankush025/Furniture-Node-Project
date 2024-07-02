const User = require("../Models/user.model");

module.exports = class UserService {
    // Create user
    async createUser(body) {
      try {
        return await User.create(body);
      } catch (error) {
        return error.message;
      }
    }
   
    // Get One User
    async findOneUser(body) {
      try {
        return await User.findOne(body);
      } catch (error) {
        return error.message;
      }
    }
  
  
    // Get All User
    async findAllUser(body) {
      try {
        return await User.find(body);
      } catch (error) {
        return error.message;
      }
    }
  
    // Update User
    async updateUser(id, body) {
      try {
        return await User.findByIdAndUpdate(
          id,
          {
            $set: body,
          },
          {
            new: true,
          }
        );
      } catch (error) {
        return error.message;
      }
    }
  };