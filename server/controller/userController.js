
import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generataToken.js";

// public
// route POST /api/user/login
// description Auth

const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            username: user.username,
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

    if (user) {
        res.send({
            _id: user._id,
            name: user.name,
            username: user.username,
            isAdmin: user.isAdmin,
        })
    }
});

// public
// route POST /api/user
// description register

const registerUser = asyncHandler(async (req, res) => {
    const { name, username, password } = req.body

    const userExists = await User.findOne({ username})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        username,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
});

export { authUser, getUserProfile, registerUser }
