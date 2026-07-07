const fileManager = require("../utils/fileManager");
const path = require("path");
const crypto = require("crypto");

const filePath = path.join(__dirname, "../data/products.json");

const getProducts = async () => {
    return await fileManager.readJson(filePath);
};


const getProductById = async (id) => {
    const products = await fileManager.readJson(filePath);
    return products.find(p => p.id === id);
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
    const products = await fileManager.readJson(filePath);

    const newProduct = {
        id: crypto.randomUUID().toString(),
        ...data
    };
    products.push(newProduct);
    await fileManager.writeJson(filePath, products);
    return newProduct;
};

const updateProductById = async (id, data) => {
    const products = await fileManager.readJson(filePath);

    const index = products.findIndex(p => p.id === id);

    // No existe
    if(index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...data
    };

    await fileManager.writeJson(filePath, products);
    return products[index];
};

const deleteProductById = async (id) => {
    const products = await fileManager.readJson(filePath);

    const exists = products.some(p => p.id === id);
    if(!exists) {
        return false;
    }

    const newProducts = products.filter(p => p.id !== id);
    await fileManager.writeJson(filePath, newProducts);
    return true;
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
}