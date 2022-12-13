import React from "react";
import { useState } from "react";

const HardwareForm = ({ cart, setCart, setHardwareQuery }) => {

  const [newCart, setNewCart] = useState()

  const handleQuantity = (e) => {
    const arr = []
    const { name, value } = e.target

  
  }
  console.log(newCart)
  return (
    <>
      <input
        type="text"
        placeholder="Search Item"
        className="w-full border border-gray-300 p-3"
        onChange={(e) => setHardwareQuery(e.target.value)}
      />
      <div className="w-full h-3/6 border border-gray-300 flex flex-col justify-start overflow-y-scroll">

        {cart.map((item, index) => (
          <div className="w-full py-4 border-b-[1px] grid grid-cols-4" key={index}>
            <div className="flex flex-col h-full items-center col-span-2 justify-center">
              <div><strong>{item.productName}</strong></div>
              <div>{item.brand}</div>
            </div>

            <div className="flex flex-col h-full items-start gap-3 justify-center">
              <label htmlFor='qty'>
                Qty:
                <input id='qty' type='number' name={item._id} placeholder='1' className="w-3/5 border rounded-sm py-1 px-2 ml-2" onChange={handleQuantity} />
              </label>
              <div>Unit: {item.unit}</div>

            </div>
            <div className="flex flex-col h-full items-center justify-center">
              <div className="text-xl">₱ {item.retailPrice}</div>
            </div>
          </div>
        ))}

      </div>

      <div className="w-full grid grid-cols-2 gap-3">
        <button className="p-3 bg-green-500 hover:bg-green-300 text-white" onClick={() => setCart([])}>
          Clear
        </button>
        <button className="p-3 bg-green-500 hover:bg-green-300 text-white">
          Confirm
        </button>
        <button className="p-3 bg-green-500 hover:bg-green-300 text-white" >
          Unpaid
        </button>
        <button className="p-3 bg-green-500 hover:bg-green-300 text-white">
          Confirm
        </button>
      </div>
    </>
  );
};

export default HardwareForm;
