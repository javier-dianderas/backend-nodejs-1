import { ProductModel } from "../../models/product.model.js";

export const getProducts = async ({limit, page, category, isAvailable, sort}) => {
    const skip = (page - 1) * limit;
    const filter = {};

    if(category) {
        filter.category = category;
    }

    if(isAvailable) {
        filter.stock = { $gt: 0 };
    }

    const sortCriteria = { price: sort};

    const [oProducts, totalItems] = await Promise.all([
        ProductModel.find(filter).lean().sort(sortCriteria).skip(skip).limit(limit),
        ProductModel.countDocuments(filter)
    ]);

    const products = oProducts.map(({ _id, ...product }) => ({
        id: _id,
        ...product       
    }));

    return { products, totalItems };
};

export const getProductById = async (id) => {
    const product = await ProductModel.findById(id).lean();
    return {
        id: product._id,
        title: product.title,
        description: product.description,
        code: product.code,
        price: product.price,
        status: product.status,
        stock: product.stock,
        category: product.category,
        thumbnails: product.thumbnails
    }
};

export const createProduct = async (data) => {
    const newProduct = await ProductModel.create(data);
    return {
        id: newProduct._id,
        title: newProduct.title,
        description: newProduct.description,
        code: newProduct.code,
        price: newProduct.price,
        status: newProduct.status,
        stock: newProduct.stock,
        category: newProduct.category,
        thumbnails: newProduct.thumbnails
    };
};

export const updateProductById = async (id, data) => {
    
    const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        {
            title: data.title,
            description: data.description,
            code: data.code,
            price: data.price,
            status: data.status,
            stock: data.stock,
            category: data.category,
            thumbnails: data.thumbnails
        },
        {
            returnDocument: "after",
            runValidators: true
        }
    );
    
    return {
        id: updatedProduct._id,
        title: updatedProduct.title,
        description: updatedProduct.description,
        code: updatedProduct.code,
        price: updatedProduct.price,
        status: updatedProduct.status,
        stock: updatedProduct.stock,
        category: updatedProduct.category,
        thumbnails: updatedProduct.thumbnails
    };
};

export const deleteProductById = async (id) => {    
    const deletedProduct = await ProductModel.findByIdAndDelete(id);   
    return {
        id: deletedProduct._id,
        title: deletedProduct.title,
        description: deletedProduct.description,
        code: deletedProduct.code,
        price: deletedProduct.price,
        status: deletedProduct.status,
        stock: deletedProduct.stock,
        category: deletedProduct.category,
        thumbnails: deletedProduct.thumbnails
    };
};