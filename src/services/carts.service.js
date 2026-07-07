import * as cartsRepository from "../repositories/carts.repository.js";
import * as productsRepository from "../repositories/products.repository.js";
import AppError from "../errors/app.error.js";

// GET carts/id
export const getCartById = async (id) => {
    return await cartsRepository.getCartById(id);
};

// POST carts/
// id: String
// products: []
export const createCart = async () => {
    return await cartsRepository.createCart();
};

export const deleteCartById = async (id) => {
    await cartsRepository.deleteCartById(id);
}

// POST carts/:id/product/:pid
// id: String
// pid: String
// quantity: Number
export const addProductToCartById = async (id, pid, quantity) => {
    console.log("services id", id);
    console.log("services pid", pid);
    console.log("services quantity", quantity);

    const product = await productsRepository.getProductById(pid);
    if(!product) {
        throw new AppError(`No existe product con id ${pid}`, 404);
    }

    await cartsRepository.addProductToCartById(id, product, quantity);
};

export const deleteProductFromCartById = async (id, pid) => {
    await cartsRepository.deleteProductFromCartById(id, pid);
};