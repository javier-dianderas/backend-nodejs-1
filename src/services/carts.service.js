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
    const cart = cartsRepository.getCartById(id);
    if(!cart) {
        throw new AppError(`No existe cart con id ${id}`, 404);
    }
    return await cartsRepository.deleteCartById(id);
}

// POST carts/:id/product/:pid
// id: String
// pid: String
// quantity: Number
export const addProductToCartById = async (id, pid, quantity) => {
    console.log("services id", id);
    console.log("services pid", pid);
    console.log("services quantity", quantity);

    const cart = await cartsRepository.getCartById(id);
    if(!cart) {
        throw new AppError(`No existe cart con id ${id}`, 404);
    }

    const product = await productsRepository.getProductById(pid);
    if(!product) {
        throw new AppError(`No existe product con id ${pid}`, 404);
    }

    console.log("cart", cart);
    console.log("product", product);

    if(cart.items.some(i => i.product.equals(pid))) {
        //existe el producto en el carrito, se suman las cantidades
        return await cartsRepository.addQuantityProductToCartById(id, pid, quantity);
    }
    // si no existe el producto se agrega   
    return await cartsRepository.addProductToCartById(id, pid, quantity);
};

export const deleteProductFromCartById = async (id, pid) => {
    const cart = await cartsRepository.getCartById(id);
    if(!cart) {
        throw new AppError(`No existe cart con id ${id}`, 404);
    }

    if(!cart.items.some(i => i.product.equals(pid))) {
        throw new AppError(`No existe item con product con id ${pid}`, 404);
    }

    return await cartsRepository.deleteProductFromCartById(id, pid);
};