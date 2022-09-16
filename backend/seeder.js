import mongoose from "mongoose";
import Transaction from "./model/transactionModel.js";
import transactions from "./data/transactions.js";
import dailyReport from "./data/dailyReportData.js";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";

dotenv.config()
connectDB()

const importData = async () => {
    try{
await Transaction.deleteMany()


await Transaction.insertMany(transactions)


console.log('Data Imported')
    } catch (error) {
console.error(error)
process.exit(1)
    }
}

const destroyData = async () => {
    try{
await Transaction.deleteMany()

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