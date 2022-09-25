import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTransactionList } from "../redux/actions/transactionsActions";

import dayjs from "dayjs";

const MonthlySales = () => {
  const date = dayjs(new Date()).format("MM");
  const [dateSearchView, setDateSearchView] = useState(date);


  const dispatch = useDispatch();

  const transactionList = useSelector((state) => state.transactionList);
  const { transactions } = transactionList;

  useEffect(() => {
    dispatch(getTransactionList());
  }, [dispatch]);


  const transactionInitialValue = Array.isArray(transactions) ? transactions : []

  const filtered = transactionInitialValue.filter(
    (item) =>
      item.category !== "initial balance" &&
      item.category !== "others" &&
      dayjs(item.createdAt).format("MM") === dateSearchView
  );

  const uniqueDates = [
    ...new Set(
      filtered.map((row) => dayjs(row.createdAt).format("DD/MM/YYYY"))
    ),
  ];

  const dataBydates = uniqueDates.map((date) => ({
    createdAt: date,
    amount: filtered
      .filter(
        (row) => dayjs(row.createdAt).format("DD/MM/YYYY") === date && row.isIn
      )
      .map((row) => row.amount)
      .reduce((a, c) => a + c, 0),
    fee: filtered
      .filter(
        (row) => dayjs(row.createdAt).format("DD/MM/YYYY") === date && !row.isIn
      )
      .map((row) => row.fee)
      .reduce((a, c) => a + c, 0),
  }));

  return (
    <div className="w-11/12 mx-auto h-[600px] flex flex-col justify-center items-center p-5">
      <select
        onChange={(e) => setDateSearchView(e.target.value)}
        className="border p-3 m-3"
        value={dateSearchView}
      >
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>

      <div className="p-3 border w-full h-full">
        <table className="w-full text-center gap-5">
          <thead>
            <tr className="text-sm">
              <th className="py-3">Date </th>
              <th>Hardware </th>
              <th>ATM / Cheque </th>
              <th>Total Sales: </th>
            </tr>
          </thead>

          {dataBydates.map((item, index) => (
            <tbody className=" p-1 border" key={index}>
              <tr>
                <td>{item.createdAt}</td>
                <td>₱ {item.amount.toLocaleString()}</td>
                <td>₱ {item.fee.toLocaleString()}</td>
                <td>₱ {(item.fee + item.amount).toLocaleString()}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default MonthlySales;
