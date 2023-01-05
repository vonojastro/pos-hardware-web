import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTab from "../../../components/ListTab";
import ListTabDisplay from "../../../components/TransactionDisplay";
import TransactionForm from "../../../components/TransactionForm";
import { getTransactionList } from "../../../redux/actions/transactionsActions";
import dayjs from "dayjs";
import { BsCartPlus } from "react-icons/bs";
import _ from 'lodash'

import { getProductsAction } from "../../../redux/actions/productsAction";

import CircularProgress from '@mui/material/CircularProgress';


const CashierDashboard = () => {
  const [tab, setTab] = useState("");
  const [category, setCategory] = useState("hardware");
  const [hardwareQuery, setHardwareQuery] = useState('')
  const [cart, setCart] = useState([]);
  const [showQtyModal, setShowQtyModal] = useState(false)
  const [itemId, setItemId] = useState('')
  const [qtyValue, setQtyValue] = useState(1)
  const [priceValue, setPriceValue] = useState(0)
  const [outOfstock, setOutOfStock] = useState(false)
  const [productSearch, setProductSearch] = useState(false)
  const [isPaid, setIsPaid] = useState(true)
  const [profit, setProfit] = useState(20)

  const [name, setName] = useState([]);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState([]);

  const [isIn, setIsIn] = useState(true);

  const date = dayjs(new Date()).format("YYYY-MM-DD");
  const [dateSearch, setDateSearch] = useState(date);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionList());
    dispatch(getProductsAction());

    if (productSearch) {
      dispatch(getProductsAction())
    } else if (!productSearch) {
      dispatch(getProductsAction())
    }
  }, [dispatch, productSearch]);


  const productList = useSelector((state) => state.productList);
  const { products, loading } = productList;

  const filteredProducts = products?.filter(product =>
    product.productName.toLowerCase().includes(hardwareQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(hardwareQuery.toLowerCase())
  )

  const allProducts = Array.isArray(filteredProducts) ? filteredProducts : [];


  const handleAddCart = (id) => {

    const noStock = allProducts.find(item => item._id === id && item.stock === 0)

    if (noStock) {
      setOutOfStock(true)
    } else if (id) {
      setQtyValue(1)
      setPriceValue(0)
      setItemId(id)
      setShowQtyModal(true)
    }

  }

  const handleQtySubmit = (e) => {
    e.preventDefault()

    const item = allProducts.filter((item) => item._id === itemId)[0];

    const newCart = [...new Set([...cart, item])]
      .map(product => product._id === itemId ? ({ ...product, qty: qtyValue > product.stock ? setOutOfStock(true) : parseInt(qtyValue), retailPrice: priceValue ? priceValue : product.retailPrice }) : product)

    if (newCart) {
      const products = _.uniqBy(newCart, '_id')
      const productNames = products.map(item => item.productName)
      const productDesc = products.map(item => item.qty + " x " + item.unit + " - ₱ " + (item.qty * item.retailPrice).toLocaleString())
      const totalSales = products.reduce((a, v) => a = a + (v.retailPrice * v.qty), 0)
      const totalCapital = products.reduce((a, v) => a = a + (v.costPerUnit * v.qty), 0)
      const transactionProfit = totalSales - totalCapital
      
      // console.log(totalSales)
      setAmount(totalSales)
      setCart(products);
      setName(productNames)
      setShowQtyModal(false)
      setDescription(productDesc)
      setProfit(transactionProfit)

      dispatch(getProductsAction())
    }
  }



  const deleteCartItem = (id) => {
    const items = cart.filter(item => item._id !== id)

    if (items) {
      setCart(items)
    }

  }

  return (
    <div className="w-11/12 mx-auto z-0 relative">


      <div className={`w-5/12 rounded py-10 bg-white border border-gray-300 absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2
      flex justify-center items-center flex-col gap-5 ${showQtyModal || outOfstock ? '' : 'hidden'}
      `}>

        {outOfstock ? (
          <>
            <div>Out of Stock</div>
            <div className="flex gap-5">
              <button onClick={() => setShowQtyModal(false) || setOutOfStock(false)}>Cancel</button>
            </div>
          </>
        ) :
          (
            <>
              <div className="flex flex-col gap-3">
                Select Qty:  {'  '}
                <input type='number' className="border border-gray-400 px-2 py-1 w-[200px]" value={qtyValue} onChange={(e) => setQtyValue(e.target.value)} />
              </div>
              <div className="flex flex-col gap-3">             
                Enter Price:  {'  '}
                <input type='number' className="border border-gray-400 px-2 py-1 w-[200px]" value={priceValue} onChange={(e) => setPriceValue(e.target.value)} />
              </div>

              
              <div className="flex gap-5 mt-5">
                <button  className="border border-gray-500 rounded px-5 py-2 cursor-pointer" onClick={() => setShowQtyModal(false) || setOutOfStock(false)}>Cancel</button>
                <button className="border border-gray-500 rounded px-5 py-2 cursor-pointer" onClick={handleQtySubmit}>Confirm</button>
              </div>
            </>

          )
        }

      </div>


      <div className="grid grid-cols-3 h-screen content-start">
        <div className="col-span-1 flex flex-col justify-center items-center">
          <TransactionForm
            category={category}
            setCategory={setCategory}
            cart={cart}
            setCart={setCart}
            setHardwareQuery={setHardwareQuery}
            deleteCartItem={deleteCartItem}
            setProductSearch={setProductSearch}
            productSearch={productSearch}
            name={name}
            setName={setName}
            amount={amount}
            setAmount={setAmount}
            description={description}
            setDescription={setDescription}
            isIn={isIn}
            setIsIn={setIsIn}
            isPaid={isPaid}
            setIsPaid={setIsPaid}
            profit={profit}
            setProfit={setProfit}
          />
        </div>
        <div className="col-span-2 border m-3 ">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="bg-white w-full h-[600px]">

              {!productSearch ? (
                <>
                  <ListTab
                    setTab={setTab}
                    tab={tab}
                    dateSearch={dateSearch}
                    setDateSearch={setDateSearch}
                    date={date}
                  />
                  <ListTabDisplay tab={tab} dateSearch={dateSearch} />
                </>
              ) : (
                <>
                  <table className="w-full text-center gap-5">
                    <thead>
                      <tr className="border-b-[1px] bg-[#60A3D9] text-white">
                        <th className="py-3">Product Name</th>
                        <th>Brand</th>
                        <th>Description</th>
                        <th>Retail Price</th>
                        <th>Stock</th>
                        <th>Unit</th>
                        <th>Item Location</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {allProducts.map((product, index) => (
                        <tr className={`border-b-[1px] border-white ${product.stock === 0 ? 'bg-red-500 text-white !important' : ''} ${index % 2 && product.stock !== 0 && product.stock > 2 ? 'bg-gray-100' : product.stock <= 2 && product.stock !== 0 ? 'bg-yellow-200' : ''}`} key={index}>
                          <td className="py-1">
                            <strong>{product.productName}</strong>
                          </td>
                          <td>{product.brand ? product.brand : '-'}</td>
                          <td>{product.description ? product.description : '-'}</td>
                          <td>₱ {product.retailPrice}</td>

                          <td>{product.stock === 0 ? 'Out of Stock' : product.stock}</td>
                          <td>{product.unit ? product.unit : '-'}</td>
                          <td>{product.storageLocation ? product.storageLocation : '-'}</td>
                          <td>
                            <BsCartPlus
                              className="cursor-pointer"
                              onClick={() => handleAddCart(product._id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}


            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CashierDashboard;
