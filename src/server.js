import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.config.js";

console.log('🔄 Iniciando conexión a la base de datos...');
await connectDB();

app.listen(process.env.PORT, () => {
    console.log(`🚀 Servidor Express escuchando en el puerto ${process.env.PORT}`);
});