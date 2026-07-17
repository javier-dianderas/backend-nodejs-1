import * as cartsService from "../services/carts.service.js";

export const getCartById = async (req, res) => {
    const cart = await cartsService.getCartById(req.params.cid);

    if(!cart) {
        res.status(404).json({ 
            status: "error", 
            message: "No se encontró el cart"
        });
    }

    res.status(200).json({ 
        status: "success", 
        payload: cart
    });
};

export const createCart = async (req, res) => {
    const newCart = await cartsService.createCart();
    res.status(200).json({ 
        status: "success", 
        payload: newCart 
    });
};

export const updateProductsCartById = async (req, res) => {
    const { items } = req.body;
    const updatedCart = await cartsService.updateProductsCartById(req.params.cid, items);
    res.status(200).json({ 
        success: "success",
        payload: updatedCart
    });
};

export const deleteCartById = async (req, res) => {
    const deletedCart = await cartsService.deleteCartById(req.params.cid);
    res.status(200).json({ 
        status: "success",
        payload: deletedCart
    });
};

export const addProductToCartById = async (req, res) => {
    const { quantity } = req.body;
    const updatedCart = await cartsService.addProductToCartById(req.params.cid, req.params.pid, quantity);
    res.status(200).json({ 
        success: "success",
        payload: updatedCart
    });
};

export const updateQuantityProductToCartById = async (req, res) => {
    const { quantity } = req.body;
    const updatedCart = await cartsService.updateQuantityProductToCartById(req.params.cid, req.params.pid, quantity);
    res.status(200).json({ 
        success: "success",
        payload: updatedCart
    });
}

export const deleteProductFromCartById = async (req, res) => {
    const updatedCart = await cartsService.deleteProductFromCartById(req.params.cid, req.params.pid);
    res.status(200).json({ 
        success: "success",
        payload: updatedCart
    });
};