import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const Header = (search, setSearch) => {
  const date = dayjs(new Date()).format("MMMM DD, YYYY");


  return (
    <div className="w-full flex justify-center bg-green-500 text-white py-6 px-10">
      <div className="w-11/12 flex justify-between align-center">
        <Link to="/">
          <div>ENZO HARDWARE</div>
        </Link>

        <div>{date}</div>
        <div className="flex gap-5">
          <Link to="/preview">
            <button>Print Preview</button>
          </Link>
          <Link to="/monthlysales">
            <button>Monthly Sales</button>
          </Link>
          
          <Link to="/searchlist">
            <button>Search transaction</button>
          </Link>
          <Link to="/searchlist">
            <button>Search transaction</button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Header;
