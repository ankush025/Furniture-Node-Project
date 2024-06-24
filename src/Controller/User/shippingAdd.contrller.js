const ShippingAddressService = require("../../Service/shippingAdd.service");
const shippingAddressService = new ShippingAddressService();

// Create Shipping Address
exports.createShippingAdd = async (req, res) => {
  const {
    productId,
    fullName,
    mobileNo,
    shippingAdd,
    pinCode,
    country,
    state,
    city
  } = req.body;

  try {
    const userId = req.user.id; // Assuming you have middleware to extract user ID from authentication
    const shippingAddressData = {
      productId,
      fullName,
      mobileNo,
      shippingAdd,
      pinCode,
      country,
      state,
      city
    };

    const newShippingAddress = await shippingAddressService.newShippingAdd(shippingAddressData, userId);
    res.json(newShippingAddress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get All Shipping Addresses
exports.getAllShippingAdd = async (req, res) => {
  try {
    const results = await shippingAddressService.getAllShippingAdd(req.query, req.user.id);
    if (!results || results.length === 0) {
      return res.json({ message: "User has no shipping addresses." });
    }
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Remove Shipping Address
exports.removeShippingAdd = async (req, res) => {
  try {
    const results = await shippingAddressService.removeShippingAdd(req.query, req.user.id);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
