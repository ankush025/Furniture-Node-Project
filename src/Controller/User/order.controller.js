const OrderServices = require("../../Service/order.service");
const orderServices = new OrderServices();

const CartServices = require("../../Service/cart.service");
const cartServices = new CartServices();


exports.createNewOrder = async(req,res)=>{
    try {
        let userCarts = await cartServices.getAllCarts(req.query , req.user._id);
        // console.log(userCarts);
        if(userCarts.carts.length === 0){
            return res.json({message: "User Have No Cart Items...."});
        }
        // console.log(userCarts);
        let orderItems = userCarts.carts.map((item) => ({
            quantity: item.products.quantity,
            price: item.products.productId.price,
            productId: item.products.productId._id,
        }));
        // console.log(orderItems);
        let totalAmount = orderItems.reduce(
            (total, item) => (total += item.quantity * item.price),
            0
        );
        // console.log("Total: ", totalAmount);
        let newOrder = await orderServices.newOrder(
            { products: orderItems, totalAmount },
            req.user._id
        );
        userCarts = await cartServices.updateCart({ isDelete: true}, req.user._id);
        // console.log(userCarts);
        res.status(201).json(newOrder);
    } catch (err) {
        console.log(err);
        res.json({message: "Internal Server Error"});
    }
}



exports.getAllOrder = async (req, res) => {
    try {
      let results = await orderServices.getAllOrder(req.query, req.user._id);
      if(!results || results.length === 0){
        res.json({message: "User Have No Cart Items..."});
      }
      res.status(201).json(results);
    } catch (error) {
      console.log(error);
      res.json({ message: "Internam Server Error" });
    }
  };

  exports.removeOrder = async (req, res) => {
    try {
      let results = await orderServices.removeOrder(req.query, req.user._id);
      res.status(201).json(results);
    } catch (error) {
      console.log(error);
      res.json({ message: "Interanal Server Error" });
    }
  };