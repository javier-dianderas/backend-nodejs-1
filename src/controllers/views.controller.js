import * as productsService from "../services/products.service.js";
import * as cartsService from "../services/carts.service.js";
import { buildLink } from "../utils/links.js";

export const productsView = async (req, res) => {

    const limit = Number(req.query.limit ?? process.env.PAGINATION_LIMIT);
    const page = Number(req.query.page ?? process.env.PAGINATION_PAGE);
    const sort = Number(req.query.sort ?? 1);
    const isAvailable = req.query.isAvailable === undefined ? undefined : req.query.isAvailable === "true";
    const { category } = req.query;
    
    const { productsDto, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = await productsService.getProducts({limit, page, category, isAvailable, sort});

    const prevLink = hasPrevPage ? buildLink(req, prevPage) : null;
    const nextLink = hasNextPage ? buildLink(req, nextPage) : null;

    const result = {        
        productsDto,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink
    };

    res.render("products", result);
};

export const productView = async (req, res) => {

    const product = await productsService.getProductById(req.params.pid);

    res.render("product", {
        product
    });
};

export const cartView = async (req, res) => {

    const cart = await cartsService.getCartById(req.params.cid);

    res.render("cart", {
        cart,
        isEmpty: cart.items.length === 0,
        total: cart.items.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        )
    });
};