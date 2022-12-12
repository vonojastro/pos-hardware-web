import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTab from "../../../components/ListTab";
import ListTabDisplay from "../../../components/CashierDisplay";
import TransactionForm from "../../../components/TransactionForm";
import { getTransactionList } from "../../../redux/actions/transactionsActions";
import dayjs from "dayjs";
import { BsCartPlus } from "react-icons/bs";

import { getProductsAction } from "../../../redux/actions/productsAction";

const CashierDashboard = () => {
  const [tab, setTab] = useState("");
  const [category, setCategory] = useState("");

  const [cart, setCart] = useState([]);

  const date = dayjs(new Date()).format("YYYY-MM-DD");
  const [dateSearch, setDateSearch] = useState(date);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionList());
    dispatch(getProductsAction());
  }, [dispatch]);

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const allProducts = Array.isArray(products) ? products : [];

  const handleAddCart = (id) => {
    const item = allProducts.filter((item) => item._id === id)[0];
    const existItem = cart.find((product) => product._id === item._id);
   
    if(existItem) {
      setCart([cart.map((x) => x._id === existItem.id ? item : x)[0]])
    } else {
      setCart([...cart, item]);
    }
  }
  console.log(cart);


  return (
    <div className="w-11/12 mx-auto z-0">
      <div className="grid grid-cols-3 h-screen content-start">
        <div className="col-span-1 flex flex-col justify-center items-center">
          <TransactionForm category={category} setCategory={setCategory} cart={cart} />
        </div>
        <div className="col-span-2 border m-3 ">
          <div className="bg-white w-full h-full">
            {category !== "hardware" ? (
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

                      <th>Quantity</th>
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

                        <td>{product.qty}</td>
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
