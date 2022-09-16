import React, { useEffect} from "react";

const AtmForm = ({
  setAmount,
  setName,
  setDescription,
  setFee,
  category,
  amount,
}) => {
  const atmMax = amount > 5000 ? 0 : amount;

  useEffect(() => {
    setDescription("ATM");

    if (category === "atm") {
      setFee(35);
    } else {
      setFee(0);
    }
    setAmount(atmMax);
  }, [setDescription, setFee, category, setAmount, atmMax, amount]);

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
          type="text"
          id="amount"
          placeholder="Enter Amount (maximun ₱5,000)"
          className="border p-2 w-full"
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>

      <button className="p-3 bg-green-500 hover:bg-green-300 text-white">
        Confirm
      </button>
    </>
  );
};

export default AtmForm;
