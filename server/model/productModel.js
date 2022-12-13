import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            default: 'None',
        },
        description: {
            type: String,
            default: 'None',
        },
        supplier: {
            type: String,
            default: 'None',
        },
        storageLocation: {
            type: String,
            default: 'None',
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
        stock: {
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