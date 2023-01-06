import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { useState } from "react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const date = dayjs(new Date()).format("MMMM DD, YYYY");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const logoutHandler = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
    }
    setShowMenu(false);
  };

  return (
    <div className="w-full flex justify-center bg-[#60A3D9] text-white py-3 px-10 relative" onClick={() => showMenu ? setShowMenu(!showMenu) : ''}>
      <div className="w-11/12 flex justify-between items-center ">
        {userInfo ? (
          <>
            <div className="flex gap-5">
              <HiMenu className="hover:text-green-200"
                style={{ fontSize: "30px", cursor: "pointer" }}
                onClick={() => setShowMenu(true)}
              />
            </div>
          </>
        ) : (
          ""
        )}

        <Link to="/">
          <div>Enzo POS</div>
        </Link>

        <div>{date}</div>
      </div>

      <div
        className={`absolute w-3/12 h-screen bg-[#60A3D9] border-r-[1px] border-blue-300 z-[100] top-[0] ease-in-out duration-500 ${
          showMenu ? "left-[0]" : "left-[-100%]"
        }`}
      >
        <div className="flex flex-col justify-center items-center text-black h-full text-start relative">
          <AiOutlineClose
            className=" text-white hover:text-gray-300 absolute top-[0] left-[0]  mt-5 ml-5 text-xl  font-bold cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
          {userInfo?.isAdmin && userInfo ? (
            <>
              <Link
                onClick={() => setShowMenu(false)}
                className="uppercase py-5 px-[20%] flex gap-3 items-center  hover:bg-white hover:text-black ease-in-out duration-200 text-white w-full"
                to="/admin"
              >
                Home
              </Link>

              {/* <Link
                onClick={() => setShowMenu(false)}
                className="uppercase py-5 px-[20%] hover:bg-white hover:text-black ease-in-out duration-200 text-white w-full"
                to="/user-list"
              >
                User List
              </Link> */}

              <Link
                onClick={() => setShowMenu(false)}
                className="uppercase py-5 px-[20%] hover:bg-white hover:text-black ease-in-out duration-200 text-white w-full"
                to="/product-list"
              >
                Product List
              </Link>

              {/* <Link
                onClick={() => setShowMenu(false)}
                className="uppercase py-5 px-[20%] hover:bg-white hover:text-black ease-in-out duration-200 text-white w-full"
                to="/monthlysales"
              >
                Monthly Sales
              </Link> */}

              <Link
                onClick={() => setShowMenu(false)}
                className="uppercase text-white px-[20%] hover:bg-white hover:text-black ease-in-out duration-200 py-5 w-full"
                to="/preview"
              >
                DAILY REPORT
              </Link>
            </>
          ) : !userInfo?.isAdmin && userInfo ? (
            <>
              <Link
                onClick={() => setShowMenu(false)}
                className="uppercase text-white px-[20%] hover:bg-white hover:text-black ease-in-out duration-200 py-5 w-full"
                to="/cashier"
              >
                Home
              </Link>

              <Link
                onClick={() => setShowMenu(false)}
                className="uppercase text-white px-[20%] hover:bg-white hover:text-black ease-in-out duration-200 py-5 w-full"
                to="/preview"
              >
                DAILY REPORT
              </Link>

              {/* <Link
                onClick={() => setShowMenu(false)}
                className="uppercase text-white py-5 hover:bg-white hover:text-black ease-in-out duration-200 w-full"
                to="/searchlist"
              >
                <div>Search transaction</div>
              </Link> */}
            </>
          ) : (
            ""
          )}

          {userInfo ? (
            <button
              className="uppercase py-5 px-[20%] text-start text-white w-full hover:bg-white hover:text-black ease-in-out duration-200"
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
