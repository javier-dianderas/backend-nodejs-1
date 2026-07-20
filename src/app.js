import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import productsRoute from "./routes/api/products.route.js";
import cartsRoute from "./routes/api/carts.route.js";
import viewsRoute from "./routes/views.route.js";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";

const app = express();

// if(!fs.existsSync("uploads")) {
//     fs.mkdirSync("uploads");
// }

// Configuración de multer

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         const nombreUnico = Date.now() + "_" + Math.round(Math.random() * 1e9);
//         const extension = path.extname(file.originalname);
//         cb(null, `${nombreUnico}${extension}`);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedFiles = ["images/jpeg", "images/png"];
//     if(allowedFiles.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error("Tipo de archivo no permitodo"), false);
//     }
// }

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limitis: { filseSize: 5 * 1024 * 1024 }
// });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//
app.engine("handlebars", engine({
    defaultLayout: "main", // Layout por defecto o esqueleto principal
    layoutsDir: path.join(process.cwd(), "./src/views/layouts"), // Carpeta de layouts
    partialsDir: path.join(process.cwd(), "./src/views/partials"), // Carpeta de partials
    helpers: {
        eq: (a, b) => a === b, // Helper para comparar igualdad
    }
}));
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/", viewsRoute);
app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);

app.use(errorMiddleware);

export default app;

