export const toProductDto = (product) => ({
    id: product._id,
    title: product.title,
    description: product.description,
    code: product.code,
    price: product.price,
    status: product.status,
    stock: product.stock,
    category: product.category,
    thumbnails: product.thumbnails,
    image: product.thumbnails?.[0] ?? null,
    updatedAt: product.updatedAt
});

export const toProductsDto = (products) => {
    return products.map(toProductDto);
};