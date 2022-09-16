import mongoose from "mongoose";

const dailyReportSchema = mongoose.Schema(
    {
totalIn: [
 {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        isIn: {
            type: Boolean,
            required: true
        },
           fee: {
            type: Number,
            required: true,
            default: 0
        },
        transaction: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "Transaction",
        }
    }
],
totalOut: [
     {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
       fee: {
            type: Number,
            required: true,
            default: 0
        },
        isIn: {
            type: Boolean,
            required: true
        },
        transaction: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "Transaction",
        }
    }
]

},
{
    timestamps: true
}
)

const DailyReport = mongoose.model("dailyreport", dailyReportSchema)

export default DailyReport