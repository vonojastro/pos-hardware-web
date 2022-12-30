import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
    {
  name: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    default: 0
  },
  description: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isIn: {
    type: Boolean,
    required: true,
  },
  qty: {
    type: Number,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: true
  },
  profit: {
    type: Number,
    default: 0
  },
},
{
    timestamps: true
}
);

const Transaction = mongoose.model("transaction", transactionSchema)

export default Transaction