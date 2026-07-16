import * as productsService from "../services/products.service.js";
import { buildLink } from "../utils/links.js";

export const getProducts = async (req, res) => {

    const limit = Number(req.query.limit ?? process.env.PAGINATION_LIMIT);
    const page = Number(req.query.page ?? process.env.PAGINATION_PAGE);
    const sort = Number(req.query.sort ?? 1);
    const isAvailable = req.query.isAvailable === undefined ? undefined : req.query.isAvailable === "true";
    const { category } = req.query;    

    const { products, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = await productsService.getProducts({limit, page, category, isAvailable, sort});
    
    const prevLink = hasPrevPage ? buildLink(req, prevPage) : null;
    const nextLink = hasNextPage ? buildLink(req, nextPage) : null;

    res.status(200).json({ 
        status: "success", 
        payload: products,
        totalPages: totalPages,
        prevPage: prevPage,
        nextPage: nextPage,
        page: page,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevLink: prevLink,
        nextLink: nextLink
    });
};

export const getProductById = async (req, res) => {
    const product = await productsService.getProductById(req.params.id);
    res.status(200).json({ 
        status: "success", 
        payload: product
    });
};

export const createProduct = async (req, res) => {
    const newProduct = await productsService.createProduct(req.body);
    res.status(201).json({ 
        status: "success", 
        payload: newProduct
    });
};

export const updateProductById = async (req, res) => {
    const updatedProduct = await productsService.updateProductById(req.params.id, req.body);
    res.status(200).json({ 
        status: "success", 
        payload: updatedProduct
    });
};

export const deleteProductById = async (req, res) => {
    const deletedProduct = await productsService.deleteProductById(req.params.id);
    res.status(200).json({ 
        status: "success", 
        payload: deletedProduct
    });
};