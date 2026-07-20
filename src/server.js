import dotenv from "dotenv";
dotenv.config();

import { Server } from "socket.io";
import app from "./app.js";
import { connectDB } from "./config/db.config.js";
import { configureProductsSocket } from "./sockets/products.socket.js";
import { setSocket } from "./sockets/socket.js";

console.log('🔄 Iniciando conexión a la base de datos...');
await connectDB();

const httpServer = app.listen(process.env.PORT, () => {
    console.log(`🚀 Servidor Express escuchando en el puerto ${process.env.PORT}`);
});

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
setSocket(io);
configureProductsSocket(io);