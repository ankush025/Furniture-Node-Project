const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const UserServic = require('../../Service/user.service');
const userService = new UserServic();



exports.registerUser = async (req, res) => {
    try {
      const {
        fullName,
        email,
        mobileNo,
        password,
        profileImage,
        DOB,
        gender, 
        country,
        state,
        city,
      } = req.body;
      // Checking Already Register or Not
      let user = await userService.findOneUser({ email: email, isDelete: false });
      // console.log(user);
  
      if (user) {
        return res.json({ message: "You are Already Registered....." });
      }
  
      // Image Store
      let image = "";
      if(req.file)
        image = req.file.path.replace(/\\/g,'/')
  
      // Encrypt Password
      let hashPassword = await bcrypt.hash(password, 10);
      // console.log(hashPassword);
  
      // Create New User
      user = await userService.createUser({
        fullName,
        email,
        mobileNo,
        password: hashPassword,
        profileImage: image ,
        DOB,
        gender,
        country,
        state,
        city,
      });
      // console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
  
  exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Checking User Exist Or Not
      let user = await userService.findOneUser({ email: email, isDelete: false });
      // console.log(user);
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      
      let matchedPassword = await bcrypt.compare(password , user.password);
      // console.log(matchedPassword);
  
      if (!matchedPassword) {
        return res.json({ message: "Password is Not Matched...." });
      }
  
      let token = JWT.sign({ userId: user._id }, process.env.SECRET_KEY);
      res.json({ token, message: "Login Success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
  
  exports.getProfile = async (req, res) => {
    try {
      let userProfile = req.user;
      res.json(userProfile);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  

  exports.getAllUser = async (req,res) => {
    try {
      const user = await userService.findAllUser({isDelete: false});
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
    
};


  
  exports.updateProfile = async (req, res) => {
    try {
      let user = req.user;
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      user = await userService.updateUser(
        user._id,
        { ...req.body } );
      res.json({user, message: "Update Success"});
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
  exports.changePassword = async (req,res) => {
      try {
          let user = req.user;
          const { oldPassword, newPassword, confirmPassword } = req.body;
  
          if(oldPassword === newPassword){
              res.json({message: "Your Password Allready Used...."});
          }
          if(newPassword !== confirmPassword){
              res.json({message: "newPassword An confirmPassword Doesn't Match...."});
          }
          let hashPassword = await bcrypt.hash(newPassword, 10);
  
          user = await userService.updateUser(
            user._id,
            { password: hashPassword }
          );
          res.json({user, message: "Update Success"});
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Internal Server Error" });
        } 
  }
  
  
  exports.deleteUser = async (req,res) => {
      try {
          let user = req.user;
          user = await userService.updateUser(
            user._id,
            { isDelete: true }
          );
          res.json({user, message: "Delete Success"});
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Internal Server Error" });
        }
  };