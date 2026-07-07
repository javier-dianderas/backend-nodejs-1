const fileManager = require("../utils/fileManager");
const path = require("path");
const crypto = require("crypto");
const AppError = require("../errors/app.error");

const filePath = path.join(__dirname, "../data/carts.json");

// GET carts/id
const getCartById = async (id) => {
    const carts = await fileManager.readJson(filePath);
    return carts.find(p => p.id === id);
};

// POST carts/
// id: String
// products: []
const createCart = async () => {
    const carts = await fileManager.readJson(filePath);

    const newCart = {
        id: crypto.randomUUID().toString(),
        items: []
    };
    carts.push(newCart);
    await fileManager.writeJson(filePath, carts);
    return newCart;
};

const deleteCartById = async (id) => {
    const carts = await fileManager.readJson(filePath);

    const exists = carts.some(p => p.id === id);
    if(!exists) {        
        throw new AppError(`No existe cart con id ${id}`, 404);
    }

    const newCarts = carts.filter(p => p.id !== id);
    await fileManager.writeJson(filePath, newCarts);
}

// POST carts/:id/product/:pid
// id: String
// pid: String
// quantity: Number
const addProductToCartById = async (id, product, data) => {

    console.log("repo id", id);
    console.log("repo product", product);
    console.log("repo quantity", data);

    const carts = await fileManager.readJson(filePath);

    const cart = carts.find(c => c.id === id);
    if(!cart) {
        throw new AppError(`No existe cart con id ${id}`, 404);
    }
    const item = cart.items.find(p => p.product.id === product.id);
    const { quantity } = data;
    if(item) {
        item.quantity = quantity;
    } else {
        cart.items.push({
            product: product,
            quantity: quantity
        });
        
    }

    await fileManager.writeJson(filePath, carts);
};

const deleteProductFromCartById = async (id, pid) => {
    const carts = await fileManager.readJson(filePath);

    const cart = carts.find(c => c.id === id);
    if(!cart) {
        throw new AppError(`No existe cart con id ${id}`, 404);
    }

    const len = cart.items.length;
    cart.items = cart.items.filter(p => p.product.id !== pid);
    
    if(len === cart.items.length) {
        throw new AppError(`No existe item con product con id ${pid}`, 404);
    }

    await fileManager.writeJson(filePath, carts);
};

module.exports = {
    getCartById,
    createCart,
    deleteCartById,
    addProductToCartById,
    deleteProductFromCartById
};