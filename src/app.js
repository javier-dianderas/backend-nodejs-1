import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import productsRoute from "./routes/products.route.js";
import cartsRoute from "./routes/carts.route.js";

const app = express();

if(!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// Configuración de multer

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const nombreUnico = Date.now() + "_" + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, `${nombreUnico}${extension}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFiles = ["images/jpeg", "images/png"];
    if(allowedFiles.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Tipo de archivo no permitodo"), false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limitis: { filseSize: 5 * 1024 * 1024 }
});

//

app.use(express.json());

app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);

app.use(errorMiddleware);

export default app;

