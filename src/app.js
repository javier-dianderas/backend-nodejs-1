import express from "express";
import path from "path";
import fs from "fs";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import productsRoute from "./routes/api/products.route.js";
import cartsRoute from "./routes/api/carts.route.js";
import viewsRoute from "./routes/views.route.js";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//
app.engine("handlebars", engine({
    defaultLayout: "main", // Layout por defecto o esqueleto principal
    layoutsDir: path.join(__dirname, "views", "layouts"), // Carpeta de layouts
    partialsDir: path.join(__dirname, "views", "partials"), // Carpeta de partials
    helpers: {
        eq: (a, b) => a === b, // Helper para comparar igualdad
    }
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/", viewsRoute);
app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);

app.use(errorMiddleware);

export default app;

