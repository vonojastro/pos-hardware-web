import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import ProductModal from "../../components/AddProductModal";
import {
  addProductAction,
  deleteProductAction,
  getProductsAction,
  updateProductAction,
} from "../../redux/actions/productsAction";
import ProductDetailsModal from "../../components/ProductDetailsModal";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'; 

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ProductList = () => {
  const [showAdd, setShowAdd] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [addProduct, setAddProduct] = useState({
    productName: "",
    brand: "None",
    description: "None",
    supplier: "None",
    costPerUnit: "",
    retailPrice: "",
    wholesalePrice: "",
    stock: "",
    unit: "",
    storageLocation: "",
  });

  const [open, setOpen] = useState(true);

  const [query, setQuery] = useState("");
  const [loadingBar, setLoadingBar] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { products, loading, success: addSuccess } = productList;


  const filteredProducts = products?.filter(product =>
    product.productName.toLowerCase().includes(query.toLowerCase()) ||
    product.brand.toLowerCase().includes(query.toLowerCase()) ||
    product.supplier.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  )

  const allProducts = Array.isArray(filteredProducts) ? filteredProducts : [];

  const product = useSelector((state) => state.product);
  const { success } = product;

  useEffect(() => {
    if (loading) {
      setLoadingBar(true)
    } else {
      setLoadingBar(false)
    }
  }, [setLoadingBar, loading])

  useEffect(() => {
    dispatch(getProductsAction());
    if (success) {
      setShowAdd(false);
      setAddProduct({
        productName: "",
        brand: "",
        description: "",
        supplier: "",
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

    if (id) {
      setSelectedId(id);
      setShowDetails(false);
      setShowEdit(true);
      setShowAdd(false);
    }
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
    dispatch(getProductsAction())
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
      if (dispatch(updateProductAction({
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

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingBar}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="grid grid-cols-3 w-full gap-5 my-4 items-center">

        <div className="col-span-2 flex justify-start items-center gap-5">
          <input
            className="px-4 h-[40px] border border-gray-300 w-3/12 rounded"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Item"
          />

          <button
            className="h-[40px] rounded px-3 border border-gray-300 my-3 hover:text-white hover:bg-blue-300 duration-300 ease-in-out"
            onClick={handleAdd}
          >
            Add Product
          </button>
        </div>


      </div>
      <div className="border border-gray-300 rounded w-full h-[600px] overflow-scroll">
   
        <table className="w-full text-center gap-5">
          
        {allProducts.length > 0 ? (
          <thead>
            <tr className="border-b-[1px] bg-[#60A3D9] text-white">
              <th>ID</th>
              <th className="py-3">Product</th>
              <th>Brand</th>
              <th>Description</th>
              <th>Retail</th>
              <th>Wholesale</th>
              <th>Stock</th>
              <th>Unit</th>
              <th>Location</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
) : ''
        }

        {allProducts.length > 0 ? allProducts?.map((product, index) => (

          <tbody>
              <tr className={`border-b-[1px] border-white ${product.stock === 0 ? 'bg-red-500 text-white' : ''} ${index % 2 && product.stock !== 0 && product.stock > 2 ? 'bg-gray-100' : product.stock <= 2 && product.stock !== 0 ? 'bg-yellow-200' : ''}`} key={index}>
                <td className="py-1">{index + 1}</td>
                <td>
                  <strong>{product.productName}</strong>
                </td>
                <td>{product.brand ? product.brand : '-'}</td>
                <td>{product.description ? product.description : '-'}</td>
                <td>₱ {product.retailPrice ? product.retailPrice.toLocaleString() : ''}</td>
                <td> {product.wholesalePrice ? "₱ " + product.wholesalePrice : '-'}</td>
                <td>{product.stock === 0 ? 'Out of Stock' : product.stock.toLocaleString()}</td>
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
       
          </tbody>
     )) : (
      <>
      <div className="flex justify-center items-center h-full text-xl">No Record Found</div>
      </>
    )}

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
