import * as cartsRepository from "../repositories/carts.repository.js";
import * as productsRepository from "../repositories/products.repository.js";
import { AppError } from "../errors/app.error.js";
import { toCartDto } from "../dto/cart.dto.js";

export const getCartById = async (cid) => {
    const cart = await cartsRepository.getCartById(cid);    
    if(!cart) {
        throw new AppError(`No existe cart con id ${cid}`, 404);
    }
    return toCartDto(cart);
};

export const createCart = async () => {
    const cart = await cartsRepository.createCart();
    return toCartDto(cart);
};

export const updateProductsCartById = async (cid, items) => {
    const cart = await cartsRepository.getCartById(cid);
    if(!cart) {
        throw new AppError(`No existe cart con id ${cid}`, 404);
    }
    
    for (const item of items) {                 
        const product = await productsRepository.getProductById(item.product);        
        if(!product) {
            throw new AppError(`No existe product con id ${item.product}`, 404);
        }  
    }
    const updatedCart = await cartsRepository.updateProductsCartById(cid, items);    
    return toCartDto(updatedCart);
};

export const deleteCartById = async (cid) => {
    const cart = await cartsRepository.getCartById(cid);
    if(!cart) {
        throw new AppError(`No existe cart con id ${cid}`, 404);
    }

    const deletedCart = await cartsRepository.deleteCartById(cid);
    return toCartDto(deletedCart);
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
    
    if(cart.items.some(i => i.product._id.equals(pid))) {
        //existe el producto en el carrito, se suman las cantidades
        const updatedQuantityCart = await cartsRepository.addQuantityProductToCartById(cid, pid, quantity);        
        return toCartDto(updatedQuantityCart);
    }
    // si no existe el producto se agrega   
    const updatedCart = await cartsRepository.addProductToCartById(cid, pid, quantity);
    return toCartDto(updatedCart);
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
    if(!cart.items.some(i => i.product._id.equals(pid))) {
        throw new AppError(`No existe product con id ${pid} en el cart`, 404);
    }

    const updatedCart = await cartsRepository.updateQuantityProductToCartById(cid, pid, quantity);
    return toCartDto(updatedCart);
};

export const deleteProductFromCartById = async (cid, pid) => {
    const cart = await cartsRepository.getCartById(cid);
    if(!cart) {
        throw new AppError(`No existe cart con id ${cid}`, 404);
    }

    if(!cart.items.some(i => i.product._id.equals(pid))) {
        throw new AppError(`No existe item con product con id ${pid}`, 404);
    }

    const updatedCart = await cartsRepository.deleteProductFromCartById(cid, pid);
    return toCartDto(updatedCart);
};