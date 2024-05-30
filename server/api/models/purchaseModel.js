import mongoose, { Schema, model } from "mongoose";

const PurchaseSchema = new Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            required: true,
        },
        quantityPurchased: {
            type: Number,
            required: true,
        },
        purchaseDate: {
            type: Date,
            default: Date.now,
        },
        totalPurchaseAmount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Purchase = model("purchase", PurchaseSchema);
export default Purchase;

