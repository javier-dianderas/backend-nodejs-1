import { readJson, writeJson} from "../../utils/fileManager.js";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/products.json");

export const getProducts = async () => {
    return await readJson(filePath);
};


export const getProductById = async (id) => {
    const products = await readJson(filePath);
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
export const createProduct = async (data) => {
    const products = await readJson(filePath);

    const newProduct = {
        id: crypto.randomUUID().toString(),
        ...data
    };
    products.push(newProduct);
    await writeJson(filePath, products);
    return newProduct;
};

export const updateProductById = async (id, data) => {
    const products = await readJson(filePath);

    const index = products.findIndex(p => p.id === id);

    // No existe
    if(index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...data
    };

    await writeJson(filePath, products);
    return products[index];
};

export const deleteProductById = async (id) => {
    const products = await readJson(filePath);

    const exists = products.some(p => p.id === id);
    if(!exists) {
        return false;
    }

    const newProducts = products.filter(p => p.id !== id);
    await writeJson(filePath, newProducts);
    return true;
};