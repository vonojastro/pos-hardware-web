import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const SignUp = () => {

  const [register, setRegister] = useState({
    username: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });

console.log(register)
  const handleChange = (e) => {
    const { value, name } = e.target;

    setRegister({
      ...register,
      [name]: value,
    });
  };


  return (
    <div className="h-screen m-[-50px]  flex justify-center items-center">
    <div className="px-10 py-12 rounded shadow-lg shadow-gray-300/100 flex flex-col gap-5 justify-content-center w-3/12">
      <h3 className="font-bold text-center  text-lg">REGISTER</h3>
      <form className="flex flex-col gap-5">
        <input
          id="username"
          type="text"
          name='username'
          onChange={handleChange}
          placeholder="Enter Email"
          className="tracking-widest py-3 border border-gray-300 normal-case text-center"
        />

        <input
          id="name"
          type="text"
          name='fullName'
          onChange={handleChange}
          placeholder="Enter Full Name"
          className="tracking-widest py-3 border border-gray-300 normal-case text-center"
        />

        <input
          id="password"
          type="password"
          name='password'
          onChange={handleChange}
          placeholder="Confirm Password"
          className="tracking-widest py-3 border border-gray-300 normal-case text-center"
        />

        <input
          id="password"
          type="password"
          name='confirmPassword'
          onChange={handleChange}
          placeholder="Enter Password"
          className="tracking-widest py-3 border border-border-gray-300 normal-case text-center"
        />
        <button className="border border-gray-300 p-2 w-full btn ">Sign up</button>
      </form>

      <h3 className="normal-case text-center">
        Already have an Account?
        <Link to="/login" className="normal-case text-blue-400"> Login</Link>
      </h3>
    </div>
  </div>
  )
}

export default SignUp