import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";

const Header = () => {
  const date = dayjs(new Date()).format("MMMM DD, YYYY");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="w-full flex justify-center bg-green-500 text-white py-6 px-10">
      <div className="w-11/12 flex justify-between align-center">
        <Link to="/cashier">
          <div>ENZO HARDWARE</div>
        </Link>

        {userInfo ? <div>{date}</div> : ""}

        <div className="flex gap-5">
          {userInfo?.isAdmin && userInfo ? (
            <Link to="/monthlysales">
              <button>Monthly Sales</button>
            </Link>
          ) : !userInfo?.isAdmin && userInfo ? (
            <>
              <Link to="/preview">
                <button>Print Preview</button>
              </Link>

              <Link to="/searchlist">
                <button>Search transaction</button>
              </Link>
            </>
          ) : (
            ""
          )}

          {userInfo ? <button onClick={logoutHandler}>Logout</button> : ""}
        </div>
      </div>
    </div>
  );
};

export default Header;
