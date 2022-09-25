import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { BiMessageSquareDetail } from "@react-icons/all-files/bi/BiMessageSquareDetail";
import {
  deleteTransaction,
  getTransactionList,
} from "../redux/actions/transactionsActions";
import { Link } from "react-router-dom";
import { TRANSACTION_ADD_RESET } from "../redux/constants/transactionsConstants";

const ListTabDisplay = ({ tab, dateSearch }) => {
  const transactionList = useSelector((state) => state.transactionList);
  const { transactions } = transactionList;

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

      console.log(transactionInitialValue)

  const transaction = useSelector((state) => state.transaction);
  const { success: successAdd } = transaction;

  useEffect(() => {
    dispatch(getTransactionList());
    dispatch({ type: TRANSACTION_ADD_RESET });
  }, [dispatch, successAdd]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteTransaction(id));
    }
    window.location.reload();
  };

  return (
    <div className="w-full px-3 py-5 h-[500px] overflow-scroll flex flex-col items-end">
      <table className="w-full text-center gap-5">
        <thead>
          <tr className="text-sm">
            <th className="py-3">Transaction: </th>
            <th>Description: </th>
            <th>Amount: </th>
            <th>Cash In/Out </th>
            <th>Fee: </th>
            <th>Time: </th>
          </tr>
        </thead>
        {filtered?.map((item, index) => (
          <tbody key={index}>
            <tr className="hover:border-t hover:border-b cursor-pointer text-sm">
              <td className="p-1 capitalize">{item.name}</td>
              <td className="capitalize">{item.description}</td>
              <td className="">₱ {item.amount.toLocaleString()}</td>
              <td className="" onClick={() => deleteHandler(item._id)}>
                {item.isIn ? "In" : "Out"}
              </td>
              <td className="">{item.fee === 0 ? "No fee" : item.fee}</td>

              <td className="">{dayjs(item.createdAt).format("hh:mm a")}</td>

              <td>
                <Link to={`/transaction/${item._id}`}>
                  {item.category === "atm" ||
                  item.category === "initial balance" ? (
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
    </div>
  );
};

export default ListTabDisplay;
