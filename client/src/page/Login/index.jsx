import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../../redux/actions/userActions";
import { useEffect } from "react";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {

  const [open, setOpen] = useState(false);

  const [login, setLogin] = useState({
    username: null,
    password: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userLogin;

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      navigate("/cashier");
    } else if (userInfo && userInfo.isAdmin) {
      navigate("/admin")
    }

    if (loading) {
      setOpen(true)
    } else {
      setOpen(false)
    }

  }, [userInfo, navigate, loading, setOpen]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginAction(login.username, login.password));

  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setLogin({
      ...login,
      [name]: value,
    });
  };


  return (
    <div className="h-screen  flex justify-center items-center">

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="px-10 py-12 rounded shadow-lg shadow-gray-300/100 flex flex-col gap-5 justify-content-center w-3/12">
        <h3 className="font-bold text-center text-lg">LOGIN</h3>

        <form className="flex flex-col gap-5" onSubmit={submitHandler}>
          <input
            id="username"
            type="text"
            placeholder="Enter Email"
            name="username"
            onChange={handleChange}
            className=" py-3 border border-gray-300 normal-case text-center"
          />

          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleChange}
            name="password"
            className=" py-3 border border-gray-300 normal-case text-center"
          />
          <button
            className="border text-white border-gray-300 p-2 w-full bg-[#60A3D9] hover:bg-white hover:text-black duration-300 ease-in-out"
          >
            LOGIN
          </button>
          <ToastContainer />
        </form>

        <h3 className="normal-case text-center">
          Create Account?
          <Link to="/" className="normal-case text-blue-400">
            {" "}
            Sign Up
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Login;
