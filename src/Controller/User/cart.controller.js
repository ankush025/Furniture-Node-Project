const CartServices = require("../../Service/cart.service");
const cartService = new CartServices();

exports.addNewCart = async (req, res) => {
  try {
    let results = await cartService.addNewCart(req.body, req.user._id);
    res.status(201).json(results);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error " });
  }
};

exports.getAllCarts = async (req, res) => {
  try {
    let results = await cartService.getAllCarts(req.query, req.user._id);
    if(!results || results.length === 0){
      return res.json({message: "User Have No Cart Items..."});
    }
    res.status(201).json(results);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
  }
};

exports.updateCart = async (req, res) => {
  try {
    let results = await cartService.updateCart(req.body, req.user._id);
    res.status(201).json(results);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error" });
  }
};

exports.removeCart = async (req, res) => {
  try {
    let results = await cartService.removeCart(req.query, req.user._id);
    res.status(201).json(results);
  } catch (error) {
    console.log(error);
    res.json({ message: "Interanal Server Error" });
  }
};