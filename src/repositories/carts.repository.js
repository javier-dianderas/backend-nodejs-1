import { readJson, writeJson} from "../utils/fileManager.js";
import path from "path";
import crypto from "crypto";
import AppError from "../errors/app.error.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/carts.json");

// GET carts/id
export const getCartById = async (id) => {
    const carts = await readJson(filePath);
    return carts.find(p => p.id === id);
};

// POST carts/
// id: String
// products: []
export const createCart = async () => {
    const carts = await readJson(filePath);

    const newCart = {
        id: crypto.randomUUID().toString(),
        items: []
    };
    carts.push(newCart);
    await writeJson(filePath, carts);
    return newCart;
};

export const deleteCartById = async (id) => {
    const carts = await readJson(filePath);

    const exists = carts.some(p => p.id === id);
    if(!exists) {        
        throw new AppError(`No existe cart con id ${id}`, 404);
    }

    const newCarts = carts.filter(p => p.id !== id);
    await writeJson(filePath, newCarts);
}

// POST carts/:id/product/:pid
// id: String
// pid: String
// quantity: Number
export const addProductToCartById = async (id, product, data) => {

    console.log("repo id", id);
    console.log("repo product", product);
    console.log("repo quantity", data);

    const carts = await readJson(filePath);

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

    await writeJson(filePath, carts);
};

export const deleteProductFromCartById = async (id, pid) => {
    const carts = await readJson(filePath);

    const cart = carts.find(c => c.id === id);
    if(!cart) {
        throw new AppError(`No existe cart con id ${id}`, 404);
    }

    const len = cart.items.length;
    cart.items = cart.items.filter(p => p.product.id !== pid);
    
    if(len === cart.items.length) {
        throw new AppError(`No existe item con product con id ${pid}`, 404);
    }

    await writeJson(filePath, carts);
};