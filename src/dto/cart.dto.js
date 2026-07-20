const toCartProductDto = (product) => ({
    id: product._id,
    code: product.code,
    title: product.title,
    stock: product.stock,
    price: product.price,
    image: product.thumbnails?.[0] ?? null    
});

const toCartItemDto = (item) => ({
    id: item._id,
    quantity: item.quantity,
    product: toCartProductDto(item.product)
});

export const toCartDto = (cart) => ({
    id: cart._id,
    items: cart.items.map(toCartItemDto),
    updatedAt: cart.updatedAt
});