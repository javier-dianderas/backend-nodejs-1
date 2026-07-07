const productsService = require("../services/products.service");

const getProducts = async (req, res) => {
    const products = await productsService.getProducts();
    res.status(200).json({ success: true, data: products});
};


const getProductById = async (req, res) => {
    const product = await productsService.getProductById(req.params.id);
    res.status(200).json({ success: true, data: product});
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
const createProduct = async (req, res) => {
    const newProduct = await productsService.createProduct(req.body);
    res.status(201).json({ success: true, data: newProduct});
};

const updateProductById = async (req, res) => {
    const updatedProduct = await productsService.updateProductById(req.params.id, req.body);
    res.status(200).json({ success: true, data: updatedProduct});
};

const deleteProductById = async (req, res) => {
    const deletedProduct = await productsService.deleteProductById(req.params.id);
    res.status(200).json({ success: true, data: deletedProduct});
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
}