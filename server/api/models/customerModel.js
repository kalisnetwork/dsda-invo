import { Schema, model } from 'mongoose';

const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    imageUrl: {
        type: String,
    },
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
    },
    purchaseHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'purchase',
    }],
}, { timestamps: true });

const Customer = model("customers", CustomerSchema);
export default Customer;
