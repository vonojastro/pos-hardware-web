import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BiEdit } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TbListDetails } from 'react-icons/tb';
import { toast } from "react-toastify";
import ProductModal from "../../../components/AddProductModal";
import {
  addProductAction,
  deleteProductAction,
  getProductsAction,
} from "../../../redux/actions/productsAction";
import ProductDetailsModal from "../../../components/ProductDetailsModal";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [showAdd, setShowAdd] = useState(null);
  const [showDetails, setShowDetails] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [selectedId, setSelectedId] = useState('')
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
  const navigate = useNavigate()

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const allProducts = Array.isArray(products) ? products : [];

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

  const handleDetails = (id) => {
    setShowDetails(true)
    setShowAdd(false)
    setSelectedId(id)
  }
  const handleAdd = () => {
    setShowDetails(false)
    setShowAdd(true)
    setShowDetails(false)
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

  const handleEdit = (id) => {
    setSelectedId(id)
    setShowDetails(false)
    setShowEdit(true)
    setShowAdd(false)
    const editProduct = allProducts.filter(item => item._id === id)

    if (editProduct) {
      setAddProduct({
        productName: editProduct.map(item => item.productName),
        brand: editProduct.map(item => item.brand),
        description: editProduct.map(item => item.description),
        supplier: editProduct.map(item => item.supplier),
        totalCost: editProduct.map(item => item.totalCost),
        costPerUnit: editProduct.map(item => item.costPerUnit),
        retailPrice: editProduct.map(item => item.retailPrice),
        wholesalePrice: editProduct.map(item => item.wholesalePrice),
        qty: editProduct.map(item => item.qty),
        unit: editProduct.map(item => item.unit),
        storageLocation: editProduct.map(item => item.storageLocation),
      })
    }


  }

  const handleDelete = (id) => {
    setSelectedId(id)
    navigate('/admin')
    if(dispatch(deleteProductAction(selectedId))) {
    
    }

  }
          
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
                <td>{index + 1}</td>
                <td><strong>{product.productName}</strong></td>
                <td>{product.brand}</td>
                <td>{product.description}</td>
                <td>{product.retailPrice}</td>
                <td>{product.wholesalePrice}</td>
                <td>{product.qty}</td>
                <td>{product.unit}</td>
                <td>{product.storageLocation}</td>
                <td>
                  <TbListDetails className='cursor-pointer' onClick={() => handleDetails(product._id)} />
                </td>
                <td>
                  <BiEdit className="cursor-pointer" onClick={() => handleEdit(product._id)} />
                </td>
                <td>
                  <RiDeleteBinLine className="cursor-pointer" onClick={() => handleDelete(product._id)} />
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
          handleAddProduct={handleAddProduct}
          showAdd={showAdd}
          setAddProduct={setAddProduct}
        />
      ) :
        showEdit ? (
          <ProductModal
            handleChange={handleChange}
            addProduct={addProduct}
            setShowEdit={setShowEdit}
            handleAddProduct={handleAddProduct}
            showEdit={showEdit}
          />
        ) :
          (
            ""
          )}

      {showDetails ? (
        <ProductDetailsModal allProducts={allProducts} selectedId={selectedId} setShowDetails={setShowDetails} />
      ) : (
        ""
      )}


    </div>
  );
};

export default AdminDashboard;
