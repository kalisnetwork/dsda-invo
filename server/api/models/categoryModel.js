import { Schema, model } from 'mongoose';

const CategorySchema = new Schema({
    categoryId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'product',
    }],
}, { timestamps: true });

const Category = model("categories", CategorySchema);
export default Category;
