import React from "react";

const HardwareForm = ({ cart }) => {


  return (
    <>
      <input
        type="text"
        placeholder="Search Item"
        className="w-full border border-gray-300 p-3"
      />
      <div className="w-full h-3/5 border border-gray-300 flex flex-col justify-start overflow-y-scroll">

{cart.map((item, index) => (
        <div className="w-full py-4 border-b-[1px] grid grid-cols-5" key={index}>
          <div className="flex flex-col h-full items-center col-span-2 justify-center">
            <div><strong>{item.productName}</strong></div>
            <div>{item.brand}</div>
          </div>
          <div className="flex flex-col h-full items-center justify-center">
            <label htmlFor='qty'>
              Qty:
              <input id='qty' type='number' className="w-3/6 border rounded-sm py-1 px-2 ml-2"/>
            </label>
           
          </div>
          <div className="flex flex-col h-full items-center justify-center">
            <div>Unit: {item.unit}</div>
          </div>
          <div className="flex flex-col h-full items-center justify-center">
            <div className="text-xl">P 200</div>
          </div>
        </div>
))}
        
      </div>

      <button className="p-3 bg-green-500 hover:bg-green-300 text-white">
        Confirm
      </button>
    </>
  );
};

export default HardwareForm;
