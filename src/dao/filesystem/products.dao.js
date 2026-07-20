import { readJson, writeJson} from "../../utils/fileManager.js";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/products.json");

export const getProducts = async ({ limit, page, category, isAvailable, sort }) => {
    let products = await readJson(filePath);

    if (category) {
        products = products.filter(p => p.category === category);
    }

    if (isAvailable) {
        products = products.filter(p => p.stock > 0);
    }

    products.sort((a, b) => (a.price - b.price) * sort);

    const totalItems = products.length;

    const skip = (page - 1) * limit;

    return {
        products: products.slice(skip, skip + limit),
        totalItems
    };
};

export const getProductById = async (id) => {
    const products = await readJson(filePath);
    return products.find(p => p._id === id) ?? null;
};

export const createProduct = async (data) => {
    const products = await readJson(filePath);

    const newProduct = {
        _id: crypto.randomUUID(),
        ...data
    };

    products.push(newProduct);

    await writeJson(filePath, products);

    return newProduct;
};

export const updateProductById = async (id, data) => {
    const products = await readJson(filePath);

    const index = products.findIndex(p => p._id === id);

    if (index === -1) {
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

    const index = products.findIndex(p => p._id === id);

    if (index === -1) {
        return null;
    }

    const deletedProduct = products[index];

    products.splice(index, 1);

    await writeJson(filePath, products);

    return deletedProduct;
};