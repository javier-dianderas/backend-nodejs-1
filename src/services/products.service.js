import * as productsRepository from "../repositories/products.repository.js";
import { toProductDto, toProductsDto } from "../dto/product.dto.js";
import { AppError } from "../errors/app.error.js";

export const getProducts = async ({limit, page, category, isAvailable, sort}) => {
    const { products, totalItems } = await productsRepository.getProducts({limit, page, category, isAvailable, sort});
    
    const productsDto = toProductsDto(products);
    const totalPages = Math.ceil(totalItems / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;

    return { productsDto, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage };
};

export const getProductById = async (id) => {
    const product = await productsRepository.getProductById(id);
    if(!product) {
        throw new AppError(`No existe product con id ${id}`, 404);
    }
    return toProductDto(product);
};

export const createProduct = async (data) => {
    const product = await productsRepository.createProduct(data);
    return toProductDto(product);
};

export const updateProductById = async (id, data) => {
    const productExists = await productsRepository.getProductById(id);
    if(!productExists) {
        throw new AppError(`No existe product con id ${id}`, 404);
    }
    const product = await productsRepository.updateProductById(id, data);
    return toProductDto(product);
};

export const deleteProductById = async (id) => {
    const productExists = await productsRepository.getProductById(id);
    if(!productExists) {
        throw new AppError(`No existe product con id ${id}`, 404);
    }
    const product = await productsRepository.deleteProductById(id);
    return toProductDto(product);
};