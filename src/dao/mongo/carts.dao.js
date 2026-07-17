import { CartModel } from "../../models/cart.model.js";

export const getCartById = async (cid) => {    
    return await CartModel.findById(cid);
};

export const createCart = async () => {
    const data = {
        items: []
    };

    const newCart = await CartModel.create(data);
    
    if (!newCart) {
        return null;
    }

    return {
        id: newCart._id,
        items: newCart.items,
        total: newCart.total
    };
};

export const updateProductsCartById = async (cid, items) => {
    const updatedCart = await CartModel.findByIdAndUpdate(
        cid,
        {
            $set: {
                items: items
            }
        },
        {
            returnDocument: "after"
        }
    );

    if (!updatedCart) {
        return null;
    }

    return {
        id: updatedCart._id,
        items: updatedCart.items,
        total: updatedCart.total
    }; 
}

export const deleteCartById = async (cid) => {
    const deletedCart = await CartModel.findByIdAndDelete(cid);
    if (!deletedCart) {
        return null;
    }
    return {
        id: deletedCart._id,
        items: deletedCart.items,
        total: deletedCart.total
    }; 
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
    );

    if (!updatedCart) {
        return null;
    }

    return {
        id: updatedCart._id,
        items: updatedCart.items,
        total: updatedCart.total
    }; 
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
    );

    if (!updatedCart) {
        return null;
    }

    return {
        id: updatedCart._id,
        items: updatedCart.items,
        total: updatedCart.total
    }; 
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
    );

    if (!updatedCart) {
        return null;
    }

    return {
        id: updatedCart._id,
        items: updatedCart.items,
        total: updatedCart.total
    };
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
    );

    if (!updatedCart) {
        return null;
    }

    return {
        id: updatedCart._id,
        items: updatedCart.items,
        total: updatedCart.total
    };
};