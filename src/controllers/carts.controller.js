import * as cartsService from "../services/carts.service.js";

// GET carts/id
export const getCartById = async (req, res) => {
    const cart = await cartsService.getCartById(req.params.id);

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

// POST carts/
// id: String
// products: []
export const createCart = async (req, res) => {
    const newCart = await cartsService.createCart();
    res.status(200).json({ 
        status: "success", 
        payload: newCart 
    });
};

export const deleteCartById = async (req, res) => {
    const deletedCart = await cartsService.deleteCartById(req.params.id);
    res.status(200).json({ 
        status: "success",
        payload: deletedCart
    });
};

// POST carts/:id/product/:pid
// id: String
// pid: String
// quantity: Number
export const addProductToCartById = async (req, res) => {
    const { quantity } = req.body;
    const updatedCart = await cartsService.addProductToCartById(req.params.id, req.params.pid, quantity);
    res.status(200).json({ 
        success: "success",
        payload: updatedCart
    });
};

export const deleteProductFromCartById = async (req, res) => {
    const updatedCart = await cartsService.deleteProductFromCartById(req.params.id, req.params.pid);
    res.status(200).json({ 
        success: "success",
        payload: updatedCart
    });
};