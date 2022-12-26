import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
    {
  name: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
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
  fee: {
    type: Number,
    default: 0
  },
  qty: {
    type: Number,
    default: 0,
  },

},
{
    timestamps: true
}
);

const Transaction = mongoose.model("transaction", transactionSchema)

export default Transaction