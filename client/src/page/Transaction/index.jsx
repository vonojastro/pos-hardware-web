import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getTransactionDetails } from "../../redux/actions/transactionsActions";
import { useReactToPrint } from "react-to-print";

const TransactionDetails = () => {
  const date = dayjs(new Date()).format("MMMM DD, YYYY");

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionDetails(id));
  }, [dispatch, id]);

  const transactionDetails = useSelector((state) => state.transactionDetails);
  const { transaction } = transactionDetails;

  const amount = transaction?.amount + transaction?.fee;
  const fee = transaction?.fee;
  const totalAmount = transaction?.amount;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="w-11/12 mx-auto h-[600px] flex flex-col justify-center items-center">
      <button className="px-5 py-3 border my-2" onClick={handlePrint}>
        Print
      </button>

      <div
        className="w-6/12 h-[300px] border grid justify-items-stretch gap-4 p-12 text-sm"
        ref={componentRef}
      >
        <div>
          <div className="justify-self-start font-bold">Enzo Hardware</div>
          <div className="justify-self-start">{date}</div>
        </div>

        {transaction?.category === "hardware" ||
        transaction?.category === "others" ? (
          <table className="text-center">
            <thead>
              <tr>
                <th className="py-2">Item</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{transaction?.name}</td>
                <td>{amount?.toLocaleString()}</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="border-t ">
                <td className="font-bold">Total:</td>
                <td>₱ {amount?.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table className="text-center">
            <thead>
              <tr>
                <th className="py-2">Name:</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{transaction?.name}</td>
                <td>{amount?.toLocaleString()}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Fee:</td>
                <td>{fee?.toLocaleString()}</td>
              </tr>
            </tbody>
            <tbody>
              <tr className="border-t ">
                <td className="font-bold">Total:</td>
                <td>₱ {totalAmount?.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionDetails;
