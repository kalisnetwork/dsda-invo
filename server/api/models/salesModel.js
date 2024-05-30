import mongoose, { Schema, model } from "mongoose";

const SaleSchema = new Schema(
    {
        saleId: {
            type: String,
            required: true,
            unique: true,
        },
        dateAndTime: {
            type: Date,
            default: Date.now,
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        products: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true,
            },
            saleQty: {
                type: Number,
                required: true,
            },
            salePrice: {
                type: Number,
                required: true,
            },
        }],
        totalSaleQty: {
            type: Number,
            required: true,
        },
        totalSalePrice: {
            type: Number,
            required: true,
        },
        gst: {
            type: Number,
            enum: [2.5, 5, 8, 12, 14, 16, 18],
            required: true,
        },
        finalSalePrice: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Sales = model("sales", SaleSchema);
export default Sales;
