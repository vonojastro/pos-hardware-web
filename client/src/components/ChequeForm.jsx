import React, { useEffect, useState } from "react";

const ChequeForm = ({
  setAmount,
  setDescription,
  setName,
  amount,
  setProfit,
  category,
  submitHandler
}) => {
  const [chequeFee, setChequeFee] = useState(10);
  const [chequeAmount, setChequeAmount] = useState(0);

  const charge = Math.ceil(chequeAmount / 1000) * chequeFee;
  const totalAmount = chequeAmount - charge;

  useEffect(() => {
    setAmount(totalAmount);

    if (category === "cheque") {
      setProfit(charge);
    } else {
      setProfit(0);
    }
  }, [setAmount, totalAmount, charge, setProfit, category]);

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
        <option value="10">₱ 10</option>
        <option value="20">₱ 20</option>
        <option value="30">₱ 30</option>
        <option value="40">₱ 40</option>
        <option value="50">₱ 50</option>
      </select>

      <button className="p-3 bg-[#60A3D9] hover:bg-green-300 text-white" onClick={submitHandler}>
        Confirm
      </button>
    </>
  );
};

export default ChequeForm;
