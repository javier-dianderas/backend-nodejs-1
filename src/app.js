const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const errorMiddleware = require("./middlewares/error.middleware");

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

const productsRoute = require("./routes/products.route");
const cartsRoute = require("./routes/carts.route");

app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);

app.use(errorMiddleware);

module.exports = app;

