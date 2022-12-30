import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAction } from "../redux/actions/productsAction";

import { addTransaction } from "../redux/actions/transactionsActions";
import { TRANSACTION_ADD_RESET } from "../redux/constants/transactionsConstants";

import AtmForm from "./AtmForm";
import ChequeForm from "./ChequeForm";
import HardwareForm from "./HardwareForm";
import InitialBalanceForm from "./CashIn";
import OthersForm from "./OthersForm";


const TransactionForm = ({ setCategory,
  category,
  cart,
  setCart,
  setHardwareQuery,
  deleteCartItem,
  setProductSearch,
  productSearch,
  name,
  setName,
  amount,
  setAmount,
  description,
  setDescription,
  isIn,
  setIsIn,
  isPaid,
  setIsPaid,
  profit,
  setProfit
}) => {


  const dispatch = useDispatch();

  const transactionList = useSelector((state) => state.transactionList);
  const { transactions } = transactionList;

  useEffect(() => {
    dispatch({ type: TRANSACTION_ADD_RESET });
    if (category === "cheque" || category === "atm") {
      setIsIn(false);
      setProductSearch(false)
    } else if (category === "hardware" || category === "cash in") {
      setIsIn(true);
      if (category === "cash in") {
        setProductSearch(false)
      }

    } else if (category === "others") {
      setProductSearch(false)
    }
  }, [category, isIn, dispatch, setIsIn, setProductSearch]);


// Confirm transaction
  const submitHandler = (e) => {
    e.preventDefault();

    if(!isPaid) {
      setIsPaid(true)
    }
    if (amount && name && description && category !== 'hardware') {
      dispatch(addTransaction(name, amount, description, category, isIn, isPaid, profit));
    } else if (amount && name && description && category === 'hardware') {

      dispatch(addTransaction(name, amount, description, category, isIn, isPaid, profit));

      const updatedQty = cart.map(product => product.stock >= product.qty ? dispatch(updateProductAction({
        _id: product._id,
        stock: product.stock - product.qty,
      }
      )) : console.log('out of stock'))

      if (updatedQty) {
        setProductSearch(false)
        setCart([])
      }
    }
    setCategory('')
  };

// Confirm unpaid transaction
  const submitUnpaid = (e) => {
    e.preventDefault();

    setIsPaid(false)
    if (amount && name && description && category === 'hardware' && !isPaid) {

      dispatch(addTransaction(name, amount, description, category,isIn, isPaid, profit));

      const updatedQty = cart.map(product => product.stock >= product.qty ? dispatch(updateProductAction({
        _id: product._id,
        stock: product.stock - product.qty,
      }
      )) : console.log('out of stock'))

      if (updatedQty) {
        setProductSearch(false)
        setCart([])
      }
    }
    setCategory('')
  };


  return (
    <>
      <div className="w-full m-3 bg-white border text-sm h-[650px]">
        <div className="grid grid-cols-2">
          <button
            className={`p-3 ${isIn === true
              ? "bg-[#60A3D9] text-white"
              : isIn === null
                ? ""
                : ""
              } hover:text-black border-r hover:bg-[#60A3D9]`}
            onClick={() => setIsIn(true)}
          >
            In
          </button>
          <button
            className={`p-3 ${isIn === false
              ? "bg-[#60A3D9] text-white"
              : isIn === null
                ? ""
                : ""
              } hover:text-black hover:bg-[#60A3D9]`}
            onClick={() => setIsIn(false)}
          >
            Out
          </button>
        </div>
        <div
          className="w-full flex flex-col gap-5 p-3 justify-start h-full"
        // onSubmit={submitHandler}
        >
          <select
            className="border px-2 py-3"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            required
          >
            <option value="">-SELECT-</option>
            <option value="hardware">Hardware</option>
            <option value="cheque">Cheque</option>
            <option value="atm">ATM</option>
            <option value="cash in">Cash In</option>
            <option value="others">Others</option>
          </select>

          {category === "others" ? (
            <OthersForm
              setName={setName}
              setAmount={setAmount}
              setDescription={setDescription}
              submitHandler={submitHandler}
              profit={profit}
              setProfit={setProfit}
            />
          ) : (
            ""
          )}
          {category === "hardware" ? (
            <HardwareForm
              setName={setName}
              setAmount={setAmount}
              setDescription={setDescription}
              cart={cart}
              setCart={setCart}
              setHardwareQuery={setHardwareQuery}
              deleteCartItem={deleteCartItem}
              setProductSearch={setProductSearch}
              productSearch={productSearch}
              submitHandler={submitHandler}
              submitUnpaid={submitUnpaid}
            />
          ) : (
            ""
          )}
          {category === "cash in" ? (
            <InitialBalanceForm
              setName={setName}
              setAmount={setAmount}
              setDescription={setDescription}
              submitHandler={submitHandler}
              profit={profit}
              setProfit={setProfit}
            />
          ) : (
            ""
          )}
          {category === "cheque" ? (
            <ChequeForm
              setName={setName}
              setAmount={setAmount}
              setDescription={setDescription}
              amount={amount}
              category={category}
              profit={profit}
              setProfit={setProfit}
              submitHandler={submitHandler}
            />
          ) : (
            ""
          )}
          {category === "atm" ? (
            <AtmForm
              setName={setName}
              setAmount={setAmount}
              setDescription={setDescription}
              amount={amount}
              category={category}
              submitHandler={submitHandler}
              profit={profit}
            setProfit={setProfit}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionForm;
