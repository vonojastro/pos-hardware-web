import Product from "../model/productModel.js";
import asyncHandler from "express-async-handler";



// @desc Fetch products
// @route GET /api/products
// @access private
const getProducts = asyncHandler(async (req, res) => {

  const products = await Product.find({});
  // const filtered = products.filter(product => product.productName.toLowerCase().includes(query.toLowerCase()))
  res.json(products);
});


// @desc add product
// @route POST /api/products
// @access private
const addProducts = asyncHandler(async (req, res) => {

  const {
    productName,
    brand,
    description,
    supplier,
    totalCost,
    costPerUnit,
    retailPrice,
    wholesalePrice,
    qty,
    unit,
    storageLocation,
  } = req.body

  const product = await Product.create({
    productName,
    brand,
    description,
    supplier,
    totalCost,
    costPerUnit,
    retailPrice,
    wholesalePrice,
    qty,
    unit,
    storageLocation,
  })

  if (product) {
    res.status(201).json({
      _id: product._id,
      productName: product.productName,
      brand: product.brand,
      description: product.description,
      supplier: product.supplier,
      totalCost: product.totalCost,
      costPerUnit: product.costPerUnit,
      retailPrice: product.retailPrice,
      wholesalePrice: product.wholesalePrice,
      qty: product.qty,
      unit: product.unit,
      storageLocation: product.storageLocation,
    });
  } else {
    res.status(400)
    throw new Error('Invalid Product')
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  
  if(product) {
  res.json(product)
  } else {
      res.status(400);
      throw new Error("Something went wrong");
    }
  });

const deleteProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id)
  
  if(product) {
  await product.remove()
  res.json({message: "Product Removed"})
  } else {
      res.status(400);
      throw new Error("Something went wrong");
    }
  });
  
  


export { getProducts, addProducts, deleteProduct, getProductById };