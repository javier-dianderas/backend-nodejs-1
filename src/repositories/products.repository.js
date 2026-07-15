import * as productsMongoDao from "../dao/mongo/products.dao.js";
import * as productsFileDato from "../dao/filesystem/products.dao.js";
import dotenv from "dotenv";

dotenv.config();
const dao = process.env.PERSISTENCE === "MONGO" ? productsMongoDao : productsFileDato;

export const getProducts = async ({limit, page, category, isAvailable, sort}) => {
    return await dao.getProducts({limit, page, category, isAvailable, sort});
};

export const getProductById = async (id) => {
    return await dao.getProductById(id);
};

export const createProduct = async (data) => {
    return await dao.createProduct(data);
};

export const updateProductById = async (id, data) => {
    return await dao.updateProductById(id, data);
};

export const deleteProductById = async (id) => {    
    return await dao.deleteProductById(id);
};