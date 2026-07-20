const socket = io();

socket.on("connect", () => {
    console.log("Web Client Conectado", socket.id);
});

socket.on("productsUpdated", async (data) => {
    const productId = document.getElementById("productId").value;    
    if(productId === data) {
        location.reload();
    }
});

const btnAddCart = document.getElementById("btnAddCart");

btnAddCart.addEventListener("click", async () => {

    let cartId = localStorage.getItem("cartId");

    if (!cartId) {
        const response = await fetch("/api/carts", {
            method: "POST"
        });
        const cart = await response.json();
        console.log(cart);
        cartId = cart.payload.id;
        localStorage.setItem("cartId", cartId);
    }

    const productId = document.getElementById("productId").value;

    const responseProduct = await fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                quantity: 1
            })
        });

    const product = await responseProduct.json();
    console.log(product);

    if(product.status === "success") {
        Swal.fire({
            title: "¿Que desea hacer?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Ir al carrito",
            denyButtonText: `Volver al catálogo`,
            confirmButtonColor: "rgb(200, 41, 37)",
            cancelButtonColor: "rgb(200, 41, 37)",
            denyButtonColor: "rgb(200, 41, 37)"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = `/carts/${cartId}`;
            }
            else if (result.isDenied) {
                window.location.href = `/products`;
            }
        });
    } else {
        Swal.fire({
            title: "Ocurrio un error",
            text: "El producto no se pudo agregar al carrito!",
            icon: "error"
        });
    }
    
});