import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import { toast } from "react-toastify";
import ProductModal from "../../components/AddProductModal";
import {
  addProductAction,
  deleteProductAction,
  getProductsAction,
  updateProductAction,
} from "../../redux/actions/productsAction";
import ProductDetailsModal from "../../components/ProductDetailsModal";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [showAdd, setShowAdd] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [addProduct, setAddProduct] = useState({
    productName: "",
    brand: "None",
    description: "None",
    supplier: "None",
    totalCost: "",
    costPerUnit: "",
    retailPrice: "",
    wholesalePrice: "",
    stock: "",
    unit: "",
    storageLocation: "",
  });

  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const filteredProducts = products?.filter(product => 
    product.productName.toLowerCase().includes(query.toLowerCase()) || 
    product.brand.toLowerCase().includes(query.toLowerCase()) || 
    product.supplier.toLowerCase().includes(query.toLowerCase())
  )
 
  const allProducts = Array.isArray(filteredProducts) ? filteredProducts : [];

  const product = useSelector((state) => state.product);
  const { success } = product;

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
        stock: "",
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


  const handleDetails = (id) => {
    setShowDetails(true);
    setShowAdd(false);
    setSelectedId(id);
  };

  const handleAdd = () => {
    setShowDetails(false);
    setShowAdd(true);
    setShowDetails(false);
    setAddProduct({
      productName: "",
      brand: "",
      description: "",
      supplier: "",
      totalCost: "",
      costPerUnit: "",
      retailPrice: "",
      wholesalePrice: "",
      stock: "",
      unit: "",
      storageLocation: "",
    });
  };

  const handleEdit = (id) => {
    setSelectedId(id);
    setShowDetails(false);
    setShowEdit(true);
    setShowAdd(false);
    const editProduct = allProducts.filter((item) => item._id === id);

    if (editProduct) {
      setAddProduct({
        productName: editProduct.map((item) => item.productName)[0],
        brand: editProduct.map((item) => item.brand)[0],
        description: editProduct.map((item) => item.description)[0],
        supplier: editProduct.map((item) => item.supplier)[0],
        totalCost: editProduct.map((item) => item.totalCost)[0],
        costPerUnit: editProduct.map((item) => item.costPerUnit)[0],
        retailPrice: editProduct.map((item) => item.retailPrice)[0],
        wholesalePrice: editProduct.map((item) => item.wholesalePrice)[0],
        stock: editProduct.map((item) => item.stock)[0],
        unit: editProduct.map((item) => item.unit)[0],
        storageLocation: editProduct.map((item) => item.storageLocation)[0],
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      if (dispatch(deleteProductAction(id))) {
        dispatch(getProductsAction());
      }
      dispatch(getProductsAction());
    }
    dispatch(getProductsAction());
  };

  const handleAddUpdate = (e) => {
    e.preventDefault();

    if (showAdd) {
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
          addProduct.stock,
          addProduct.unit,
          addProduct.storageLocation
        )
      );
    } else if (showEdit) {
      if(dispatch(updateProductAction({
        _id: selectedId,
        productName: addProduct.productName,
        brand: addProduct.brand,
        description: addProduct.description,
        supplier: addProduct.supplier,
        totalCost: addProduct.totalCost,
        costPerUnit: addProduct.costPerUnit,
        retailPrice: addProduct.retailPrice,
        wholesalePrice: addProduct.wholesalePrice,
        stock: addProduct.stock,
        unit: addProduct.unit,
        storageLocation: addProduct.storageLocation,
      }))) {
        dispatch(getProductsAction())
        setShowEdit(false)
      }
      dispatch(getProductsAction())
    }
    dispatch(getProductsAction())
  };

  return (
    <div className="w-11/12 mx-auto z-0 h-[700px] p-5 relative">
      <div className="flex justify-end gap-5 my-4 items-center">
       
          <input
            className="px-4 h-[40px] border border-gray-300 w-2/12"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Item"
          />
 
        <button
          className="h-[40px] px-3 border border-gray-300 my-3"
          onClick={handleAdd}
        >
          Add Product
        </button>
      </div>
      <div className="border border-gray-300 rounded w-full h-[600px] overflow-y-scroll">
        <table className="w-full text-center gap-5">
          <thead>
            <tr className="border-b-[1px]">
              <th>Item No.</th>
              <th className="py-3">Product Name</th>
              <th>Brand</th>
              <th>Description</th>
              <th>Retail Price</th>
              <th>Wholesale Price</th>
              <th>Stock</th>
              <th>Unit</th>
              <th>Item Location</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {allProducts.map((product, index) => (
              <tr className=" border-b-[1px]" key={index}>
                <td className="py-1">{index + 1}</td>
                <td>
                  <strong>{product.productName}</strong>
                </td>
                <td>{product.brand}</td>
                <td>{product.description}</td>
                <td>{product.retailPrice}</td>
                <td>{product.wholesalePrice}</td>
                <td>{product.stock}</td>
                <td>{product.unit}</td>
                <td>{product.storageLocation}</td>
                <td>
                  <TbListDetails
                    className="cursor-pointer"
                    onClick={() => handleDetails(product._id)}
                  />
                </td>
                <td>
                  <BiEdit
                    className="cursor-pointer"
                    onClick={() => handleEdit(product._id)}
                  />
                </td>
                <td>
                  <RiDeleteBinLine
                    className="cursor-pointer"
                    onClick={() => handleDelete(product._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd ? (
        <ProductModal
          handleChange={handleChange}
          addProduct={addProduct}
          setShowAdd={setShowAdd}
          handleAddUpdate={handleAddUpdate}
          showAdd={showAdd}
          setAddProduct={setAddProduct}
        />
      ) : showEdit ? (
        <ProductModal
          handleChange={handleChange}
          addProduct={addProduct}
          setShowEdit={setShowEdit}
          handleAddUpdate={handleAddUpdate}
          showEdit={showEdit}
        />
      ) : (
        ""
      )}

      {showDetails ? (
        <ProductDetailsModal
          allProducts={allProducts}
          selectedId={selectedId}
          setShowDetails={setShowDetails}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductList;
