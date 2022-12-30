import Transaction from "../model/transactionModel.js";
import asyncHandler from "express-async-handler";


// @desc Fetch all transactions
// @route GET /api/transactions
// @access public
const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({});
  res.json(transactions);
});


// @desc add transaction
// @route POST /api/transactions
// @access public
const addTransaction = asyncHandler(async (req, res) => {
  const { 
    name, 
    description, 
    amount,
    category,
    isIn,
    isPaid,
    profit
 } = req.body;

  const transaction = await Transaction.create({
     name, 
    description, 
    amount,
    category,
    isIn,
    isPaid,
    profit
  });

  if (transaction) {
    res.status(201).json({
    name: transaction.name, 
    description: transaction.description, 
    amount: transaction.amount,
    category: transaction.category,
    isIn: transaction.isIn,
    isPaid: transaction.isPaid,
    profit: transaction.profit
    });
  } else {
    res.status(400);
    throw new Error("Invalid transaction");
  }
});

// @desc get transaction
// @route GET /api/transactions
// @access public
const getTransactionById = asyncHandler(async (req, res) => {
const transaction = await Transaction.findById(req.params.id)

if(transaction) {
res.json(transaction)
} else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});



// @desc delete transaction
// @route DELETE /api/transactions
// @access public
const deleteTransaction = asyncHandler(async (req, res) => {
const transaction = await Transaction.findById(req.params.id)

if(transaction) {
await transaction.remove()
res.json({message: "Transaction Removed"})
} else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});



export {getTransactions, addTransaction, deleteTransaction, getTransactionById}