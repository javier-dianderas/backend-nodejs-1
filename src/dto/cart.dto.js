const toCartProductDto = (product) => ({
    id: product._id,
    title: product.title,
    price: product.price
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