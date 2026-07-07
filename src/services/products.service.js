const productsRepository = require("../repositories/products.repository");

const getProducts = async () => {
    return await productsRepository.getProducts();
};


const getProductById = async (id) => {
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
const createProduct = async (data) => {
    return await productsRepository.createProduct(data);
};

const updateProductById = async (id, data) => {
    return await productsRepository.updateProductById(id, data);
};

const deleteProductById = async (id) => {
    return await productsRepository.deleteProductById(id);
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
}