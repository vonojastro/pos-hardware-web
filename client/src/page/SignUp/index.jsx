import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const SignUp = () => {
  return (
    <div className="h-screen m-[-50px]  flex justify-center items-center">
    <div className="px-10 py-12 rounded shadow-lg shadow-gray-300/100 flex flex-col gap-5 justify-content-center w-3/12">
      <h3 className="font-bold text-center  text-lg">REGISTER</h3>
      <form className="flex flex-col gap-5">
        <input
          id="username"
          type="text"
          placeholder="Enter Email"
          className="tracking-widest py-3 border border-[#22C55E] normal-case text-center"
        />

        <input
          id="name"
          type="text"
          placeholder="Enter Full Name"
          className="tracking-widest py-3 border border-[#22C55E] normal-case text-center"
        />

        <input
          id="password"
          type="text"
          placeholder="Confirm Password"
          className="tracking-widest py-3 border border-[#22C55E] normal-case text-center"
        />

        <input
          id="password"
          type="text"
          placeholder="Enter Password"
          className="tracking-widest py-3 border border-[#22C55E] normal-case text-center"
        />
        <button className="border border-[#22C55E] p-2 w-full btn ">Sign up</button>
      </form>

      <h3 className="normal-case text-center">
        Create Account?
        <Link to="/login" className="normal-case text-blue-400"> Login</Link>
      </h3>
    </div>
  </div>
  )
}

export default SignUp