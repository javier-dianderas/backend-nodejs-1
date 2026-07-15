import * as productsRepository from "../repositories/products.repository.js";

export const getProducts = async ({limit, page, category, isAvailable, sort}) => {
    const { products, totalItems } = await productsRepository.getProducts({limit, page, category, isAvailable, sort});

    const totalPages = Math.ceil(totalItems / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;

    return { products, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage };
};


export const getProductById = async (id) => {
    return await productsRepository.getProductById(id);
};

export const createProduct = async (data) => {
    return await productsRepository.createProduct(data);
};

export const updateProductById = async (id, data) => {
    return await productsRepository.updateProductById(id, data);
};

export const deleteProductById = async (id) => {
    return await productsRepository.deleteProductById(id);
};