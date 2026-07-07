import * as productsRepository from "../repositories/products.repository.js";

export const getProducts = async () => {
    return await productsRepository.getProducts();
};


export const getProductById = async (id) => {
    return await productsRepository.getProductById(id);
};

// POST products/
// id: String
// title: String
// description: String
// code: String
// price: Number
// status: Boolean
// stock: Number
// category: String
// thumbnails: Array de Strings
export const createProduct = async (data) => {
    return await productsRepository.createProduct(data);
};

export const updateProductById = async (id, data) => {
    return await productsRepository.updateProductById(id, data);
};

export const deleteProductById = async (id) => {
    return await productsRepository.deleteProductById(id);
};