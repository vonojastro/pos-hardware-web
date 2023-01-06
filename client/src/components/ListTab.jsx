import React from "react";

const ListTab = ({ setTab, tab, dateSearch, setDateSearch }) => {
  return (
    <div className="grid grid-cols-6 bg-[#60A3D9]">
      <button
        className={`p-3 ${
          tab === "" ? "bg-white" : "bg-[#60A3D9] text-white"
        } hover:bg-green-300 text-sm`}
        onClick={() => setTab("")}
      >
        All
      </button>
      <button
        className={`p-3 ${
          tab === "hardware" ? "bg-white" : "bg-[#60A3D9] text-white"
        } hover:bg-green-300 text-sm`}
        onClick={() => setTab("hardware")}
      >
        Hardware
      </button>
      <button
        className={`p-3 ${
          tab === "atm" ? "bg-white" : "bg-[#60A3D9] text-white"
        } hover:bg-green-300 text-sm`}
        onClick={() => setTab("atm")}
      >
        ATM
      </button>
      <button
        className={`p-3 ${
          tab === "cheque" ? "bg-white" : "bg-[#60A3D9] text-white"
        } hover:bg-green-300 text-sm`}
        onClick={() => setTab("cheque")}
      >
        Cheque
      </button>
      <button
        className={`p-3 ${
          tab === "others" ? "bg-white" : "bg-[#60A3D9] text-white"
        } hover:bg-green-300 text-sm`}
        onClick={() => setTab("others")}
      >
        Others
      </button>

<div>
<input
        type="date"
        id="start"
        name="search-date"
        onChange={(e) => setDateSearch(e.target.value)}
        value={dateSearch}
        className="p-1 w-11/12 border m-1 text-sm cursor-pointer "
        min="2022-01-01"
        max="2030-01-01"
      />
</div>
   
    </div>
  );
};

export default ListTab;
