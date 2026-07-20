import { CartModel } from "../../models/cart.model.js";

export const getCartById = async (cid) => {    
    const cart = await CartModel.findById(cid).populate("items.product", "_id title code stock price thumbnails").lean();
    return cart;
};

export const createCart = async () => {
    const data = {
        items: []
    };

    const newCart = await CartModel.create(data);
    return newCart.toObject();
};

export const updateProductsCartById = async (cid, newItems) => {
    const updatedCart = await CartModel.findByIdAndUpdate(
        cid,
        {
            $set: {
                items: newItems
            }
        },
        {
            returnDocument: "after"
        }
    ).populate("items.product", "_id title price").lean();
    return updatedCart;
}

export const deleteCartById = async (cid) => {
    const deletedCart = await CartModel.findByIdAndDelete(cid).populate("items.product", "_id title price").lean();
    return deletedCart;
}

export const addProductToCartById = async (cid, pid, quantity) => {
    const updatedCart = await CartModel.findByIdAndUpdate(
        cid,
        {
            $push: {
                items: {
                    product: pid,
                    quantity: quantity
                }
            }
        },
        {
            returnDocument: "after"
        }
    ).populate("items.product", "_id title price").lean();
    return updatedCart;
};

export const addQuantityProductToCartById = async (cid, pid, quantity) => {
    const updatedCart = await CartModel.findOneAndUpdate(
        {
            _id: cid,
            "items.product": pid
        },
        {
            $inc: {
                "items.$.quantity": quantity
            }
        },
        {
            returnDocument: "after"
        }
    ).populate("items.product", "_id title price").lean();
    return updatedCart;
};

export const updateQuantityProductToCartById = async (cid, pid, quantity) => {
    const updatedCart = await CartModel.findOneAndUpdate(
        {
            _id: cid,
            "items.product": pid
        },
        {
            $set: {
                "items.$.quantity": quantity
            }
        },
        {
            returnDocument: "after"
        }
    ).populate("items.product", "_id title price").lean();
    return updatedCart;
};

export const deleteProductFromCartById = async (cid, pid) => {
    const updatedCart = await CartModel.findByIdAndUpdate(
        cid,
        {
            $pull: {
                items: {
                    product: pid
                }
            }
        },
        {
            returnDocument: "after"
        }
    ).populate("items.product", "_id title price").lean();
    return updatedCart;
};