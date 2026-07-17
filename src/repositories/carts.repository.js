import * as cartsMongoDao from "../dao/mongo/carts.dao.js";
import * as cartsFileDato from "../dao/filesystem/carts.dao.js";
import dotenv from "dotenv";

dotenv.config();
const dao = process.env.PERSISTENCE === "MONGO" ? cartsMongoDao : cartsFileDato;

export const getCartById = async (cid) => {
    return await dao.getCartById(cid);
};

export const createCart = async () => {
    return await dao.createCart();
};

export const updateProductsCartById = async (cid, items) => {
    return await dao.updateProductsCartById(cid, items);
}

export const deleteCartById = async (cid) => {
    return await dao.deleteCartById(cid);
}

export const addProductToCartById = async (cid, pid, quantity) => {
    return await dao.addProductToCartById(cid, pid, quantity);
};

export const addQuantityProductToCartById = async (cid, pid, quantity) => {
    return await dao.addQuantityProductToCartById(cid, pid, quantity);
}

export const updateQuantityProductToCartById = async (cid, pid, quantity) => {
    return await dao.updateQuantityProductToCartById(cid, pid, quantity);
}

export const deleteProductFromCartById = async (cid, pid) => {
    return await dao.deleteProductFromCartById(cid, pid);
};