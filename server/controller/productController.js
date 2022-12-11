import Product from "../model/productModel.js";
import asyncHandler from "express-async-handler";



// @desc Fetch products
// @route GET /api/products
// @access private
const getProducts = asyncHandler(async (req, res) => {
const {query} = req.body
console.log(query)
  const products = await Product.find({});
  const filtered = products.filter(product => product.productName.toLowerCase().includes(query.toLowerCase()))
  res.json(filtered);
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


export { getProducts, addProducts };