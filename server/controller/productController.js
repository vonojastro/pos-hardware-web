import Product from "../model/productModel.js";
import asyncHandler from "express-async-handler";



// @desc Fetch products
// @route GET /api/products
// @access private
const getProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({});
    res.json(products);
  });
  

// @desc add products
// @route POST /api/products
// @access private
const addProducts = asyncHandler(async (req, res) => {

    // res.json(products);
  });
  

  export { getProducts, addProducts };