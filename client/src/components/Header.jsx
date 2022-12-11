import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
import { HiMenu } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from "react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
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
    dispatch(logout());
    setShowMenu(false)
  };

  return (
    <div className="w-full flex justify-center bg-green-500 text-white py-6 px-10 relative">
      <div className="w-11/12 flex justify-between items-center ">
        <Link to="/cashier">
          <div>ENZO HARDWARE</div>
        </Link>

        {userInfo ?
          (
            <>

              <div>{date}</div>

              <div className="flex gap-5">
                <HiMenu style={{ fontSize: '30px', cursor: 'pointer' }} onClick={() => setShowMenu(true)} />
              </div>
            </>
          )
          : ""}
      </div>

      <div className={`absolute w-3/12 h-screen bg-green-500 border-l-[1px] border-white z-[100] top-[0] ease-in-out duration-500 ${showMenu ? 'right-[0]' : 'right-[-100%]'}`}>

        <div className="flex flex-col justify-center items-center text-black h-full text-center relative">
          <AiOutlineClose className=" text-white hover:text-gray-300 absolute top-[0] right-[0]  mt-5 mr-5 text-xl text- font-bold cursor-pointer" onClick={() => setShowMenu(false)} />
          {userInfo?.isAdmin && userInfo ? (
            <Link
              onClick={() => setShowMenu(false)}
              className="uppercase py-5 hover:bg-white hover:text-green-500 ease-in-out duration-200 text-white w-full" to="/monthlysales">
              Monthly Sales
            </Link>
          ) : !userInfo?.isAdmin && userInfo ? (
            <>
              <Link
                onClick={() => setShowMenu(false)}
                className="uppercase text-white hover:bg-white hover:text-green-500 ease-in-out duration-200 py-5 w-full" to="/preview">
                Print Preview
              </Link>

              <Link
                onClick={() => setShowMenu(false)}
                className="uppercase text-white py-5 hover:bg-white hover:text-green-500 ease-in-out duration-200 w-full" to="/searchlist">
                <div  >
                  Search transaction
                </div>
              </Link>
            </>
          ) : (
            ""
          )}

          {userInfo ? <button className="uppercase py-5 text-white w-full hover:bg-white hover:text-green-500 ease-in-out duration-200" onClick={logoutHandler}>Logout</button> : ""}
        </div>
      </div>


    </div>
  );
};

export default Header;
