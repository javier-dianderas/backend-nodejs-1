const socket = io();

socket.on("connect", () => {
    console.log("Web Client Conectado", socket.id);
});

socket.on("cartUpdated", async (data) => {
    const cartId = document.getElementById("cartId").value;    
    if(cartId === data) {
        location.reload();
    }
});

document.querySelectorAll(".btn-add-1").forEach(button => {
    button.addEventListener("click", async () => {
        const cartId = document.getElementById("cartId").value;
        const productId = button.dataset.productId;
        let quantity = Number(button.dataset.quantity);
        quantity++;

        const responseProduct = await fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quantity: quantity
            })
        });
    });
});

document.querySelectorAll(".btn-minus-1").forEach(button => {
    button.addEventListener("click", async () => {
        const cartId = document.getElementById("cartId").value;
        const productId = button.dataset.productId;
        let quantity = Number(button.dataset.quantity);
        if(quantity > 0) {
            quantity--;
        }

        const responseProduct = await fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quantity: quantity
            })
        });
    });
});

document.querySelectorAll(".btn-remove").forEach(button => {
    button.addEventListener("click", async () => {
        const cartId = document.getElementById("cartId").value;
        const productId = button.dataset.productId;
        
        const responseProduct = await fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: "DELETE"
        });

    });
});