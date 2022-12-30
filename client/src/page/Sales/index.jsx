import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTransactionList } from "../../redux/actions/transactionsActions";

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
      item.category !== "cash in" &&
      item.category !== "others" &&
      dayjs(item.createdAt).format("MM") === dateSearchView
  );

  const uniqueDates = [
    ...new Set(
      filtered.map((row) => dayjs(row.createdAt).format("DD/MM/YYYY"))
    ),
  ];


  // const dataBydates = uniqueDates.map((date) => ({
  //   createdAt: date,
  //   amount: filtered
  //     .filter(
  //       (row) => dayjs(row.createdAt).format("DD/MM/YYYY") === date && row.isIn
  //     )
  //     .map((row) => row.amount)
  //     .reduce((a, c) => a + c, 0),
  //   profit: filtered
  //     .filter(
  //       (row) => dayjs(row.createdAt).format("DD/MM/YYYY") === date && !row.isIn
  //     )
  //     .map((row) => row.profit)
  //     .reduce((a, c) => a + c, 0),
  // }));

  const monthlySales = uniqueDates.map((date) => ({
    createdAt: date,
    hardwareProfit: filtered
      .filter(
        (row) => dayjs(row.createdAt).format("DD/MM/YYYY") === date && row.category === 'hardware'
      )
      .map((row) => row.profit)
      .reduce((a, c) => a + c, 0),

    atmProfit: filtered
      .filter(
        (row) => dayjs(row.createdAt).format("DD/MM/YYYY") === date && row.category === 'atm'
      )
      .map((row) => row.profit)
      .reduce((a, c) => a + c, 0),

    chequeProfit: filtered
      .filter(
        (row) => dayjs(row.createdAt).format("DD/MM/YYYY") === date && row.category === 'cheque'
      )
      .map((row) => row.profit)
      .reduce((a, c) => a + c, 0),

    totalProfit: filtered
      .filter(
        (row) => dayjs(row.createdAt).format("DD/MM/YYYY") === date
      )
      .map((row) => row.profit)
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

      <div className="border w-full h-full">
        <table className="w-full text-center gap-5">
          <thead>
            <tr className="text-sm">
              <th className="py-3">Date</th>
              <th>Hardware </th>
              <th>ATM </th>
              <th>Cheque </th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody >
            {monthlySales?.map((item, index) => (
              <tr key={index} className={index % 2 ? 'bg-gray-200' : ''}>
                <td>{item.createdAt}</td>
                <td>{item.hardwareProfit ? "₱ " + item.hardwareProfit.toLocaleString() : '-'}</td>
                <td>{item.atmProfit ? "₱ " + item.atmProfit.toLocaleString() : '-'}</td>
                <td>{item.chequeProfit ? "₱ " + item.chequeProfit.toLocaleString() : '-'}</td>
                <td>{item.totalProfit ? "₱ " + item.totalProfit.toLocaleString() : '-'}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
};

export default MonthlySales;
