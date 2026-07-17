import * as cartsRepository from "../repositories/carts.repository.js";
import * as productsRepository from "../repositories/products.repository.js";
import AppError from "../errors/app.error.js";

export const getCartById = async (id) => {
    return await cartsRepository.getCartById(id);
};

export const createCart = async () => {
    return await cartsRepository.createCart();
};

export const updateProductsCartById = async (cid, items) => {
    console.log(items);
    for (const item of items) {         
        console.log(item.product);
        const product = await productsRepository.getProductById(item.product);
        console.log(product);
        if(!product) {
            throw new AppError(`No existe product con id ${item.product}`, 404);
        }  
    }
    return await cartsRepository.updateProductsCartById(cid, items);
};

export const deleteCartById = async (cid) => {
    const cart = cartsRepository.getCartById(cid);
    if(!cart) {
        throw new AppError(`No existe cart con id ${cid}`, 404);
    }
    return await cartsRepository.deleteCartById(cid);
}

export const addProductToCartById = async (cid, pid, quantity) => {
    const cart = await cartsRepository.getCartById(cid);
    if(!cart) {
        throw new AppError(`No existe cart con id ${cid}`, 404);
    }

    const product = await productsRepository.getProductById(pid);
    if(!product) {
        throw new AppError(`No existe product con id ${pid}`, 404);
    }

    if(cart.items.some(i => i.product.equals(pid))) {
        //existe el producto en el carrito, se suman las cantidades
        return await cartsRepository.addQuantityProductToCartById(cid, pid, quantity);
    }
    // si no existe el producto se agrega   
    return await cartsRepository.addProductToCartById(cid, pid, quantity);
};

export const updateQuantityProductToCartById = async (cid, pid, quantity) => {
    const cart = await cartsRepository.getCartById(cid);
    if(!cart) {
        throw new AppError(`No existe cart con id ${cid}`, 404);
    }

    const product = await productsRepository.getProductById(pid);
    if(!product) {
        throw new AppError(`No existe product con id ${pid}`, 404);
    }

    // si no existe el producto en el cart    
    if(!cart.items.some(i => i.product.equals(pid))) {
        throw new AppError(`No existe product con id ${pid} en el cart`, 404);
    }

    return await cartsRepository.updateQuantityProductToCartById(cid, pid, quantity);
};

export const deleteProductFromCartById = async (cid, pid) => {
    const cart = await cartsRepository.getCartById(cid);
    if(!cart) {
        throw new AppError(`No existe cart con id ${cid}`, 404);
    }

    if(!cart.items.some(i => i.product.equals(pid))) {
        throw new AppError(`No existe item con product con id ${pid}`, 404);
    }

    return await cartsRepository.deleteProductFromCartById(cid, pid);
};