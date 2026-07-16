import * as cartsMongoDao from "../dao/mongo/carts.dao.js";
import * as cartsFileDato from "../dao/filesystem/carts.dao.js";
import dotenv from "dotenv";

dotenv.config();
const dao = process.env.PERSISTENCE === "MONGO" ? cartsMongoDao : cartsFileDato;

export const getCartById = async (id) => {
    return await dao.getCartById(id);
};

export const createCart = async () => {
    return await dao.createCart();
};

export const deleteCartById = async (id) => {
    return await dao.deleteCartById(id);
}

export const addProductToCartById = async (id, pid, quantity) => {
    return await dao.addProductToCartById(id, pid, quantity);
};

export const addQuantityProductToCartById = async (id, pid, quantity) => {
    return await dao.addQuantityProductToCartById(id, pid, quantity);
}

export const deleteProductFromCartById = async (id, pid) => {
    return await dao.deleteProductFromCartById(id, pid);
};