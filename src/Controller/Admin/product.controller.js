const { query } = require("express");
const ProductService = require("../../Service/product.service");
const productService = new ProductService();

exports.createProduct = async (req, res) => {
  let product = await productService.getProduct({
    title: req.body.title,
    isDelete: false,
  });
  if (product) return res.json({ meassage: "Product is already exists..." });

  // Image Store
  let image = "";
  if (req.file) image = req.file.path.replace(/\\/g, "/");

  product = await productService.addProduct({
    ...req.body,
    product_image: image,
  });
  res.status(201).json({ product, message: "New Product is Added...!!!" });
};

exports.getAllProduct = async (req, res) => {
  const products = await productService.getAllProduct({ isDelete: false });
  res.status(200).json(products);
};

exports.getProduct = async (req, res) => {
  const id = req.query.brand;
  // const item = await ProductModel.findOne({brand: id});
  const item = await productService.getAllProduct({ brand: id },{ isDelete: false});
  if (!item) {
    return res.json({ message: "Product is Not Found...!!!" });
  }
  res.status(200).json(item);
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  let product = await productService.getProduct(id);
  // console.log(product);
  if (!product) {
    return res.json({ meassage: "Product is Not Found...!!!" });
  }
  // product = await ProductModel.findOneAndUpdate({_id:id},{$set : {...req.body}},{new:true});
  product = await productService.updatedProduct(id, { ...req.body });
  console.log(product);
  res.status(200).json({ product, message: "Product is Updated..." });
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  let product = await productService.getProduct(id);
  // console.log(product);
  if (!product) {
    return res.json({ message: "Product is Not Found...!!!" });
  }
  // product = await ProductModel.findOneAndDelete({_id:id});
  product = await productService.updatedProduct(
    id,
    { isDelete: true }
  );
  console.log(product);
  res.status(200).json({ message: "Product is Deleted...." });
};
