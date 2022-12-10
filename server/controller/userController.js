
import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generataToken.js";

// public
// route POST /api/user/login
// description Auth

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

  const user = await User.findOne({email})

  if(user && (await user.matchPassword(password))) {
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
});

// private
// route GET /api/user/login
// description get profile

const getUserProfile = asyncHandler(async (req, res) => {
const user = await User.findById(req.user._id)

if(user) {
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    })
}
});

  export {authUser, getUserProfile}
  