import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
        },
        description: {
            type: String,
        },
        supplier: {
            type: String,
        },
        totalCost: {
            type: Number,
            default: 0,
        },
        costPerUnit: {
            type: Number,
            default: 0,
        },
        retailPrice: {
            type: Number,
            default: 0,
        },
        wholesalePrice: {
            type: Number,
            default: 0,
        },
        qty: {
            type: Number,
            required: true,
            default: 0
        },
        unit: {
            type: String,
        },
    }, {
        timestamps: true
    }
)
const Product = mongoose.model('Product', productSchema)

export default Product