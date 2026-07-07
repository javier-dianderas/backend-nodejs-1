const cartsRepository = require("../repositories/carts.repository");
const productsRepository = require("../repositories/products.repository");
const AppError = require("../errors/app.error");

// GET carts/id
const getCartById = async (id) => {
    return await cartsRepository.getCartById(id);
};

// POST carts/
// id: String
// products: []
const createCart = async () => {
    return await cartsRepository.createCart();
};

const deleteCartById = async (id) => {
    await cartsRepository.deleteCartById(id);
}

// POST carts/:id/product/:pid
// id: String
// pid: String
// quantity: Number
const addProductToCartById = async (id, pid, quantity) => {
    console.log("services id", id);
    console.log("services pid", pid);
    console.log("services quantity", quantity);

    const product = await productsRepository.getProductById(pid);
    if(!product) {
        throw new AppError(`No existe product con id ${pid}`, 404);
    }

    await cartsRepository.addProductToCartById(id, product, quantity);
};

const deleteProductFromCartById = async (id, pid) => {
    await cartsRepository.deleteProductFromCartById(id, pid);
};

module.exports = {
    getCartById,
    createCart,
    deleteCartById,
    addProductToCartById,
    deleteProductFromCartById
};