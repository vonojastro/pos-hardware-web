import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { BiMessageSquareDetail } from "@react-icons/all-files/bi/BiMessageSquareDetail";
import {
  deleteTransaction,
  getTransactionList,
} from "../redux/actions/transactionsActions";
import { Link } from "react-router-dom";
import { TRANSACTION_ADD_RESET } from "../redux/constants/transactionsConstants";


import CircularProgress from '@mui/material/CircularProgress';

const ListTabDisplay = ({ tab, dateSearch }) => {



  const [open, setOpen] = useState(false);


  const transactionList = useSelector((state) => state.transactionList);
  const { transactions, loading } = transactionList;

  const dispatch = useDispatch();

  const transactionInitialValue = Array.isArray(transactions) ? transactions : []

  const filtered = tab
    ? transactionInitialValue.filter(
      (item) =>
        item.category === tab &&
        dayjs(item.createdAt).format("YYYY-MM-DD") ===
        dayjs(dateSearch).format("YYYY-MM-DD")
    )
    : transactionInitialValue.filter(
      (item) =>
        dayjs(item.createdAt).format("YYYY-MM-DD") ===
        dayjs(dateSearch).format("YYYY-MM-DD")
    );

  const transaction = useSelector((state) => state.transaction);
  const { success: successAdd, loading: addLoading } = transaction;

  useEffect(() => {
    dispatch(getTransactionList());
    dispatch({ type: TRANSACTION_ADD_RESET });
  }, [dispatch, successAdd]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      if (dispatch(deleteTransaction(id))) {

        dispatch(getTransactionList())
      }
    }
    dispatch(getTransactionList())
  };

  return (
    <div className="w-full  py-5 h-full overflow-y-scroll flex flex-col">

{loading ? (
<div className="w-full h-full flex justify-center items-center">
<CircularProgress color="success"/>
</div>
) : (

  <table className="w-full text-center gap-5">
        <thead >
          <tr className="text-sm border-b">
            <th className="py-3">Transaction: </th>
            <th>Description: </th>
            <th>Amount: </th>
            <th>Cash In/Out </th>

            <th>Time: </th>
          </tr>
        </thead>
        {filtered?.map((item, index) => (
          <tbody key={index}>
            <tr className={`cursor-pointer text-sm ${index % 2 ? 'bg-gray-100' : ''}`}>
              <td className="p-1 capitalize">
                {item.name.map((item, index) => (
                  <div key={index}>
                    {item}
                  </div>
                ))}

              </td>
              <td className="">{
                item.description.map((product, index) => (
                  <div key={index}>
                    {product + " "}
                    {item.fee ? '(₱ ' + item.fee + ')' : ''}
                  </div>
                ))
              }</td>
              <td className="">₱ {item.amount.toLocaleString()}</td>
              <td className="" onClick={() => deleteHandler(item._id)}>
                {item.isIn ? "In" : "Out"}
              </td>
              <td className="">{dayjs(item.createdAt).format("hh:mm a")}</td>

              <td>
                <Link to={`/transaction/${item._id}`}>
                  {item.category === "atm" ||
                    item.category === "cash in" ? (
                    ""
                  ) : (
                    <BiMessageSquareDetail />
                  )}
                </Link>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
)}

    

    </div>
  );
};

export default ListTabDisplay;
