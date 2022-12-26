import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAction } from "../redux/actions/productsAction";

import { addTransaction } from "../redux/actions/transactionsActions";
import { TRANSACTION_ADD_RESET } from "../redux/constants/transactionsConstants";

import AtmForm from "./AtmForm";
import ChequeForm from "./ChequeForm";
import HardwareForm from "./HardwareForm";
import InitialBalanceForm from "./InitialBalanceForm";
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
  fee,
  setFee,
}) => {

  const dispatch = useDispatch();

  const transactionList = useSelector((state) => state.transactionList);
  const { transactions } = transactionList;


  useEffect(() => {
    dispatch({ type: TRANSACTION_ADD_RESET });
    if (category === "cheque" || category === "atm") {
      setIsIn(false);
    } else if (category === "hardware" || category === "initial balance") {
      setIsIn(true);
    }
  }, [category, isIn, dispatch, setIsIn]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (amount && name && description && category !== 'hardware') {
      dispatch(addTransaction(name, amount, description, category, fee, isIn));
    } else if (amount && name && description && category === 'hardware') {

      dispatch(addTransaction(name, amount, description, category, fee, isIn));


      const updatedProd = cart.map(product => product.stock >= product.qty ? dispatch(updateProductAction({
        _id: product._id,
        productName: product.productName,
        brand: product.brand,
        description: product.description,
        supplier: product.supplier,
        totalCost: product.totalCost,
        costPerUnit: product.costPerUnit,
        retailPrice: product.retailPrice,
        wholesalePrice: product.wholesalePrice,
        stock: product.stock - product.qty,
        unit: product.unit,
        storageLocation: product.storageLocation,
      }
      )) : console.log('out of stock'))

      
      if (updatedProd) {
        setProductSearch(false)
        setCart([])
      }

    }


    e.target.reset();
  };


  return (
    <>
      <div className="w-full m-3 bg-white border text-sm h-[650px]">
        <div className="grid grid-cols-2">
          <button
            className={`p-3 ${isIn === true
              ? "bg-green-500 text-white"
              : isIn === null
                ? ""
                : ""
              } hover:text-black border-r hover:bg-green-300`}
            onClick={() => setIsIn(true)}
          >
            In
          </button>
          <button
            className={`p-3 ${isIn === false
              ? "bg-green-500 text-white"
              : isIn === null
                ? ""
                : ""
              } hover:text-black hover:bg-green-300`}
            onClick={() => setIsIn(false)}
          >
            Out
          </button>
        </div>
        <form
          className="w-full flex flex-col gap-5 p-3 justify-start h-full"
          onSubmit={submitHandler}
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
            <option value="initial balance">Initial Balance</option>
            <option value="others">Others</option>
          </select>

          {category === "others" ? (
            <OthersForm
              setName={setName}
              setAmount={setAmount}
              setDescription={setDescription}
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
            />
          ) : (
            ""
          )}
          {category === "initial balance" ? (
            <InitialBalanceForm
              setName={setName}
              setAmount={setAmount}
              setDescription={setDescription}
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
              setFee={setFee}
              category={category}
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
              setFee={setFee}
              category={category}
            />
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
};

export default TransactionForm;
