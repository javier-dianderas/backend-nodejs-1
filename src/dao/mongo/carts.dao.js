import { CartModel } from "../../models/cart.model.js";

export const getCartById = async (id) => {    
    return await CartModel.findById(id);
};

export const createCart = async () => {
    const data = {
        items: []
    };

    const newCart = await CartModel.create(data);    
    return {
        id: newCart._id,
        items: newCart.items,
        total: newCart.total
    };
};

export const deleteCartById = async (id) => {
    const deletedCart = await CartModel.findByIdAndDelete(id);
    return {
        id: deletedCart._id,
        items: deletedCart.items,
        total: deletedCart.total
    }; 
}

export const addProductToCartById = async (id, pid, quantity) => {
    const updatedCart = await CartModel.findByIdAndUpdate(
        id,
        {
            $push: {
                items: {
                    product: pid,
                    quantity: quantity
                }
            }
        },
        {
            new: true
        }
    );

    return {
        id: updatedCart._id,
        items: updatedCart.items,
        total: updatedCart.total
    }; 
};

export const addQuantityProductToCartById = async (id, pid, quantity) => {
    const updatedCart = await CartModel.findOneAndUpdate(
        {
            _id: id,
            "items.product": pid
        },
        {
            $inc: {
                "items.$.quantity": quantity
            }
        },
        {
            new: true
        }
    );

    return {
        id: updatedCart._id,
        items: updatedCart.items,
        total: updatedCart.total
    }; 
};

export const deleteProductFromCartById = async (id, pid) => {
    const updatedCart = await CartModel.findByIdAndUpdate(
        id,
        {
            $pull: {
                items: {
                    product: pid
                }
            }
        },
        {
            new: true
        }
    );

    return {
        id: updatedCart._id,
        items: updatedCart.items,
        total: updatedCart.total
    };
};