import mongoose, { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    images: [{
      type: String,
    }],
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'reviews',
    }],
  },
  { timestamps: true }
);

const Product = model("product", ProductSchema);
export default Product;
