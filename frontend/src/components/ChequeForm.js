import React, { useEffect, useState } from "react";

const ChequeForm = ({
  setAmount,
  setDescription,
  setName,
  amount,
  setFee,
  category,
}) => {
  const [chequeFee, setChequeFee] = useState(30);
  const [chequeAmount, setChequeAmount] = useState(0);

  const charge = Math.ceil(chequeAmount / 1000) * chequeFee;
  const totalAmount = chequeAmount - charge;

  useEffect(() => {
    setAmount(totalAmount);

    if (category === "cheque") {
      setFee(charge);
    } else {
      setFee(0);
    }
  }, [setAmount, totalAmount, charge, setFee, category]);

  return (
    <>
      <label htmlFor="name" className="">
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="border p-2 w-full"
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label htmlFor="amount" className="">
        <input
          type="number"
          id="amount"
          placeholder="Amount "
          className="border p-2 w-full"
          onChange={(e) => setChequeAmount(e.target.value)}
        />
      </label>

      <label htmlFor="description" className="">
        <input
          type="text"
          id="description"
          placeholder="Bank Address"
          className="border p-2 w-full"
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <div className="flex gap-5 items-center justify-center">
        <div className="w-full">Fee: {charge}</div>
      </div>

      <div className="flex gap-5 items-center">
        <div className="w-full font-bold">Total Amount:</div>
        <input
          type="text"
          value={amount}
          id="description"
          placeholder=""
          className="border p-2 w-full"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <select
        className="border px-2 py-3"
        onChange={(e) => setChequeFee(e.target.value)}
        required
      >
        <option value="30">Minimum Fee</option>
        <option value="50">Maximum Fee</option>
      </select>

      <button className="p-3 bg-green-500 hover:bg-green-300 text-white">
        Confirm
      </button>
    </>
  );
};

export default ChequeForm;
