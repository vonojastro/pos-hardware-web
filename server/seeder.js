import mongoose from "mongoose";
import Transaction from "./model/transactionModel.js";
import User from "./model/userModel.js";
import transactions from "./data/transactions.js";
import userData from "./data/userData.js";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";

dotenv.config()
connectDB()

const importData = async () => {
    try{
await User.deleteMany()


await User.insertMany(userData)


console.log('Data Imported')
    } catch (error) {
console.error(error)
process.exit(1)
    }
}

const destroyData = async () => {
    try{
await User.deleteMany()

console.log('Data Destroyed')
    } catch (error) {
console.error(error)
process.exit(1)
    }
}

if(process.argv[2] === '-d') {
destroyData()
} else {
importData()
}