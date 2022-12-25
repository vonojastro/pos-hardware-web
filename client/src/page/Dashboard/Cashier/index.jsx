import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTab from "../../../components/ListTab";
import ListTabDisplay from "../../../components/CashierDisplay";
import TransactionForm from "../../../components/TransactionForm";
import { getTransactionList } from "../../../redux/actions/transactionsActions";
import dayjs from "dayjs";
import { BsCartPlus } from "react-icons/bs";
import _ from 'lodash'

import { getProductsAction } from "../../../redux/actions/productsAction";
import { toast } from "react-toastify";

const CashierDashboard = () => {
  const [tab, setTab] = useState("");
  const [category, setCategory] = useState("");
  const [hardwareQuery, setHardwareQuery] = useState('')
  const [cart, setCart] = useState([]);
  const [showQtyModal, setShowQtyModal] = useState(false)
  const [itemId, setItemId] = useState(null)
  const [qtyValue, setQtyValue] = useState(0)
  const [priceValue, setPriceValue] = useState(0)
  const [outOfstock, setOutOfStock] = useState(false)
  const [productSearch, setProductSearch] = useState(false)

  const [name, setName] = useState([]);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState([]);

  const [isIn, setIsIn] = useState(true);
  const [fee, setFee] = useState(0);



  const date = dayjs(new Date()).format("YYYY-MM-DD");
  const [dateSearch, setDateSearch] = useState(date);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionList());
    dispatch(getProductsAction());

    if(productSearch) {
      dispatch(getProductsAction())
    } else if(!productSearch) {
      dispatch(getProductsAction())
    }
  }, [dispatch, productSearch]);



  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const filteredProducts = products?.filter(product =>
    product.productName.toLowerCase().includes(hardwareQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(hardwareQuery.toLowerCase())
  )

  const allProducts = Array.isArray(filteredProducts) ? filteredProducts : [];
  console.log(allProducts)

  const handleAddCart = (id) => {

    if (id) {
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
      const productDesc = products.map(item => item.qty + " x " + item.unit + " (" + item.retailPrice + ")")
      const sum = products.reduce((a, v) => a = a + (v.retailPrice * v.qty), 0)
   
      setAmount(sum)
      setCart(products);
      setName(productNames)
      setShowQtyModal(false)
      setDescription(productDesc)
      setFee(0)

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


      <form onSubmit={handleQtySubmit} className={`w-6/12 py-5 bg-white border border-black absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2
      flex justify-center items-center flex-col gap-5 ${showQtyModal ? '' : 'hidden'}
      `}>
        <label>
          Select Qty:
          <input type='number' className="border border-black" value={qtyValue} onChange={(e) => setQtyValue(e.target.value)} />
        </label>
        <label>
          Enter Price:
          <input type='number' className="border border-black" value={priceValue} onChange={(e) => setPriceValue(e.target.value)} />
        </label>
        <div className="flex gap-5">
          <button onClick={() => setShowQtyModal(false)}>Cancel</button>
          <input type='submit' value='Confirm' className="cursor-pointer" />
        </div>
      </form>


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
            fee={fee}
            setFee={setFee}
          />
        </div>
        <div className="col-span-2 border m-3 ">
          <div className="bg-white w-full h-full">

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
                    <tr className="border-b-[1px] ">
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
                      <tr className=" border-b-[1px]" key={index}>
                        <td className="py-1">
                          <strong>{product.productName}</strong>
                        </td>
                        <td>{product.brand}</td>
                        <td>{product.description}</td>
                        <td>{product.retailPrice}</td>

                        <td>{product.stock}</td>
                        <td>{product.unit}</td>
                        <td>{product.storageLocation}</td>
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
        </div>
      </div>
    </div>
  );
};

export default CashierDashboard;
