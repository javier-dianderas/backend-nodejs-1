import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        min: 1
    }
});

const cartSchema = new mongoose.Schema({
    items: {
        type: [cartItemSchema]
    }
});

export const CartModel = mongoose.model("Cart", cartSchema);