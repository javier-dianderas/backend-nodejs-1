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

    const [products, totalItems] = await Promise.all([
        ProductModel.find(filter).lean().sort(sortCriteria).skip(skip).limit(limit),
        ProductModel.countDocuments(filter)
    ]);

    return { products, totalItems };
};

export const getProductById = async (id) => {
    return await ProductModel.findById(id).lean();
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
    
    return updatedProduct;
};

export const deleteProductById = async (id) => {    
    const x = await ProductModel.findByIdAndDelete(id);   
    console.log("x", x);
};