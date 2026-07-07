const cartsService = require("../services/carts.service");

// GET carts/id
const getCartById = async (req, res) => {
    const products = await cartsService.getCartById(req.params.id);
    res.status(200).json({ success: true, data: products});
};

// POST carts/
// id: String
// products: []
const createCart = async (req, res) => {
    const cart = await cartsService.createCart();
    res.status(200).json({ success: true, data: cart });
};

const deleteCartById = async (req, res) => {
    await cartsService.deleteCartById(req.params.id);
    res.status(200).json({ success: true });
};

// POST carts/:id/product/:pid
// id: String
// pid: String
// quantity: Number
const addProductToCartById = async (req, res) => {
    await cartsService.addProductToCartById(req.params.id, req.params.pid, req.body);
    res.status(200).json({ success: true });
};

const deleteProductFromCartById = async (req, res) => {
    await cartsService.deleteProductFromCartById(req.params.id, req.params.pid);
};

module.exports = {
    getCartById,
    createCart,
    deleteCartById,
    addProductToCartById,
    deleteProductFromCartById
};