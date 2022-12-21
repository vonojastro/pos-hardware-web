import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
    {
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
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
  fee: {
    type: Number,
    default: 0
  },
  qty: {
    type: Number,
  },

},
{
    timestamps: true
}
);

const Transaction = mongoose.model("transaction", transactionSchema)

export default Transaction