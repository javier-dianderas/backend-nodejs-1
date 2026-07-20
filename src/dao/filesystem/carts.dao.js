import { readJson, writeJson} from "../../utils/fileManager.js";
import path from "path";
import crypto from "crypto";
import { AppError } from "../../errors/app.error.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cartsFilePath = path.join(__dirname, "../data/carts.json");
const productsFilePath = path.join(__dirname, "../data/products.json");

const populateCart = async (cart) => {
    if (!cart) {
        return null;
    }
    const products = await readJson(productsFilePath);
    return {
        ...cart,
        items: cart.items.map(item => {
            const product = products.find(p => p._id === item.product);
            return {
                ...item,
                product: product
                    ? {
                        _id: product._id,
                        title: product.title,
                        code: product.code,
                        stock: product.stock,
                        price: product.price,
                        thumbnails: product.thumbnails
                    }
                    : null
            };
        })
    };
};

export const getCartById = async (cid) => {
    const carts = await readJson(cartsFilePath);
    const cart = carts.find(c => c._id === cid);
    return await populateCart(cart);
};

export const createCart = async () => {
    const carts = await readJson(cartsFilePath);
    const newCart = {
        _id: crypto.randomUUID(),
        items: []
    };
    carts.push(newCart);
    await writeJson(cartsFilePath, carts);
    return newCart;
};

export const updateProductsCartById = async (cid, newItems) => {
    const carts = await readJson(cartsFilePath);
    const cart = carts.find(c => c._id === cid);
    if (!cart) {
        return null;
    }
    cart.items = newItems;
    await writeJson(cartsFilePath, carts);
    return await populateCart(cart);
};

export const deleteCartById = async (cid) => {
    const carts = await readJson(cartsFilePath);
    const index = carts.findIndex(c => c._id === cid);
    if (index === -1) {
        return null;
    }
    const deletedCart = carts[index];
    carts.splice(index, 1);
    await writeJson(cartsFilePath, carts);
    return await populateCart(deletedCart);
};

export const addProductToCartById = async (cid, pid, quantity) => {
    const carts = await readJson(cartsFilePath);
    const cart = carts.find(c => c._id === cid);
    if (!cart) {
        return null;
    }
    cart.items.push({
        product: pid,
        quantity
    });
    await writeJson(cartsFilePath, carts);
    return await populateCart(cart);
};

export const addQuantityProductToCartById = async (cid, pid, quantity) => {
    const carts = await readJson(cartsFilePath);
    const cart = carts.find(c => c._id === cid);
    if (!cart) {
        return null;
    }
    const item = cart.items.find(i => i.product === pid);
    if (!item) {
        return null;
    }
    item.quantity += quantity;
    await writeJson(cartsFilePath, carts);
    return await populateCart(cart);
};

export const updateQuantityProductToCartById = async (cid, pid, quantity) => {
    const carts = await readJson(cartsFilePath);
    const cart = carts.find(c => c._id === cid);
    if (!cart) {
        return null;
    }
    const item = cart.items.find(i => i.product === pid);
    if (!item) {
        return null;
    }
    item.quantity = quantity;
    await writeJson(cartsFilePath, carts);
    return await populateCart(cart);
};

export const deleteProductFromCartById = async (cid, pid) => {
    const carts = await readJson(cartsFilePath);
    const cart = carts.find(c => c._id === cid);
    if (!cart) {
        return null;
    }
    cart.items = cart.items.filter(i => i.product !== pid);
    await writeJson(cartsFilePath, carts);
    return await populateCart(cart);
};