import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";
import { getTransactionList } from "../../redux/actions/transactionsActions";

const ViewAll = () => {
  const date = dayjs(new Date()).format("YYYY-MM-DD");
  const [dateSearchView, setDateSearchView] = useState(date);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const dispatch = useDispatch();

  const transactionList = useSelector((state) => state.transactionList);
  const { transactions } = transactionList;

  useEffect(() => {
    dispatch(getTransactionList());
  }, [dispatch]);


  const transactionInitialValue = Array.isArray(transactions) ? transactions : []
  

  const filtered = dateSearchView
    ? transactionInitialValue.filter(
        (item) =>
          dayjs(item.createdAt).format("YYYY-MM-DD") ===
          dayjs(dateSearchView).format("YYYY-MM-DD")
      )
    : transactionInitialValue.filter(
        (item) =>
          dayjs(item.createdAt).format("YYYY-MM-DD") ===
          dayjs(dateSearchView).format("YYYY-MM-DD")
      );

  const filteredisIn = filtered?.filter((item) => item.isIn);
  const filteredisOut = filtered?.filter((item) => !item.isIn);

  const totalIn = filteredisIn?.reduce((acc, item) => acc + item.amount, 0);
  const totalOut = filteredisOut?.reduce((acc, item) => acc + item.amount, 0);

  const totalSales = totalIn - totalOut;

  return (
    <div className="w-11/12 mx-auto p-5">
      <div className="flex gap-5">
        <button className="px-5 py-3 border my-2" onClick={handlePrint}>
          Print
        </button>

        <input
          type="date"
          id="start"
          name="search-date"
          onChange={(e) => setDateSearchView(e.target.value)}
          value={dateSearchView}
          className="p-3 border m-1 text-sm cursor-pointer"
          min="2022-01-01"
          max="2030-01-01"
        />
      </div>

      <div ref={componentRef} className="py-10 px-8 h-full text-sm border">
        <div className="py-5">
          <p className="font-bold text-xl">Enzo Hardware</p>

          <p className="">{dayjs(dateSearchView).format("MMMM DD, YYYY")}</p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* In */}
          <div className="border-r pr-3">
            <p className="font-bold my-3">In</p>
            {filteredisIn?.map((item, index) => (
              <div key={index} className="grid grid-cols-4 border-b">
                <div className="capitalize">
                  <p>{item.name}</p>
                </div>
                <div
                  className={`text-center ${
                    item.category === "initial balance" ? "font-bold" : ""
                  } capitalize`}
                >
                  <p>{item.category}</p>
                </div>
                <div className="text-center">
                  <p>{item.description}</p>
                </div>
                <div className="text-end">
                  <p>{item.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
            <div className="font-bold py-5 text-end">
              Total In: ₱ {totalIn?.toLocaleString()}
            </div>
          </div>

          {/* Out */}
          <div>
            <p className="font-bold my-3">Out</p>
            {filteredisOut?.map((item, index) => (
              <div key={index} className="grid grid-cols-4 border-b">
                <div className="capitalize">
                  <p>{item.name}</p>
                </div>
                <div className="text-center capitalize">
                  <p>{item.category}</p>
                </div>
                <div className="text-center capitalize">
                  <p>{item.description}</p>
                </div>
                <div className="text-end">
                  <p>{item.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
            <div className="font-bold py-5 text-end">
              Total Out: ₱ {totalOut?.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="font-bold text-end py-5 border-t">
          Total Balance: ₱ {totalSales?.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default ViewAll;
