import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import {
  addProductAction,
  getProductsAction,
} from "../../../redux/actions/productsAction";

const AdminDashboard = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [addProduct, setAddProduct] = useState({
    productName: "",
    brand: "",
    description: "",
    supplier: "",
    totalCost: "",
    costPerUnit: "",
    retailPrice: "",
    wholesalePrice: "",
    qty: "",
    unit: "",
    storageLocation: "",
  });

  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const allProducts = Array.isArray(products) ? products : [];

  const product = useSelector((state) => state.product);
  const { success } = product;
  console.log(success);

  useEffect(() => {
    dispatch(getProductsAction());
    if (success) {
      setShowAdd(false);
      setAddProduct({
        productName: "",
        brand: "",
        description: "",
        supplier: "",
        totalCost: "",
        costPerUnit: "",
        retailPrice: "",
        wholesalePrice: "",
        qty: "",
        unit: "",
        storageLocation: "",
      });
    }
  }, [dispatch, success, setShowAdd]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setAddProduct({
      ...addProduct,
      [name]: value,
    });
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    dispatch(getProductsAction());
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    dispatch(
      addProductAction(
        addProduct.productName,
        addProduct.brand,
        addProduct.description,
        addProduct.supplier,
        addProduct.totalCost,
        addProduct.costPerUnit,
        addProduct.retailPrice,
        addProduct.wholesalePrice,
        addProduct.qty,
        addProduct.unit,
        addProduct.storageLocation
      )
    );
  };
  return (
    <div className="w-11/12 mx-auto z-0 h-[700px] p-5 relative">
      <div className="flex justify-end gap-5 my-4 items-center">
        <form onSubmit={handleSubmitSearch} className="w-full">
          <input
            className="px-4 h-[40px] border border-gray-300 w-2/12"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Item"
          />
          <input type="submit" value="submit" />
        </form>
        <button
          className="h-[40px] px-3 border border-gray-300 my-3"
          onClick={() => setShowAdd(true)}
        >
          Add Product
        </button>
      </div>
      <div className="border border-gray-300 rounded w-full h-[600px] overflow-y-scroll">
        <table className="w-full text-center gap-5">
          <thead>
            <tr className="border-b-[1px]">
              <th className="py-3">Product Name</th>
              <th>Brand</th>
              <th>Description</th>
              <th>Retail Price</th>
              <th>Wholesale Price</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Item Location</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {allProducts.map((product, index) => (
              <tr className=" border-b-[1px]" key={index}>
                <td>{product.productName}</td>
                <td>{product.brand}</td>
                <td>{product.description}</td>
                <td>{product.retailPrice}</td>
                <td>{product.wholesalePrice}</td>
                <td>{product.qty}</td>
                <td>{product.unit}</td>
                <td>{product.storageLocation}</td>
                <td>
                  <button>Edit</button>
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd ? (
        <div className=" w-7/12 py-12 px-12 border border-gray-300 bg-white rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h3 className="text-[1.3rem] text-center font-bold pb-4 ">
            Add Product
          </h3>

          <form
            className="flex flex-col gap-5 grid grid-cols-2"
            onSubmit={handleAddProduct}
          >
            <input
              type="text"
              name="productName"
              onChange={handleChange}
              value={addProduct.productName}
              placeholder="Product Name"
              className="col-span-2 border border-gray-300 p-2"
            />
            <input
              type="text"
              name="brand"
              onChange={handleChange}
              value={addProduct.brand}
              placeholder="Brand"
              className="border border-gray-300 p-2"
            />
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={addProduct.description}
              placeholder="Description"
              className="border border-gray-300 p-2"
            />
            <input
              type="text"
              name="supplier"
              onChange={handleChange}
              value={addProduct.supplier}
              placeholder="Supplier"
              className="border border-gray-300 p-2"
            />
            <input
              type="number"
              name="totalCost"
              onChange={handleChange}
              value={addProduct.totalCost}
              placeholder="Total Cost"
              className="border border-gray-300 p-2"
            />
            <input
              type="number"
              name="costPerUnit"
              onChange={handleChange}
              value={addProduct.costPerUnit}
              placeholder="Cost Per Unit"
              className="border border-gray-300 p-2"
            />
            <input
              type="number"
              name="retailPrice"
              onChange={handleChange}
              value={addProduct.retailPrice}
              placeholder="Retail Price"
              className="border border-gray-300 p-2"
            />
            <input
              type="number"
              name="wholesalePrice"
              onChange={handleChange}
              value={addProduct.wholesalePrice}
              placeholder="Wholesale Price"
              className="border border-gray-300 p-2"
            />
            <input
              type="number"
              name="qty"
              onChange={handleChange}
              value={addProduct.qty}
              placeholder="Quantity"
              className="border border-gray-300 p-2"
            />
            <input
              type="text"
              name="unit"
              onChange={handleChange}
              value={addProduct.unit}
              placeholder="Unit"
              className="border border-gray-300 p-2"
            />
            <input
              type="text"
              name="storageLocation"
              onChange={handleChange}
              value={addProduct.storageLocation}
              placeholder="Storage Location"
              className="border border-gray-300 p-2"
            />
            <button
              className="border border-gray-300 py-3 bg-white hover:bg-green-500 hover:text-white ease-in-out duration-200"
              onClick={() => setShowAdd(false)}
            >
              Cancel
            </button>
            <input type='submit' value='Add' className="border border-gray-300 py-3 bg-white hover:bg-green-500 hover:text-white ease-in-out duration-200" />
            

          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminDashboard;
