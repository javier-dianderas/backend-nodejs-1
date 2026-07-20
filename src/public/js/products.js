const socket = io();

socket.on("connect", () => {
    console.log("Web Client Conectado", socket.id);
});

socket.on("productsUpdated", async (data) => {
    location.reload();
});