import express from "express";
import path from "path";
import * as viewsController from "../controllers/views.controller.js";

const router = express.Router();

router.get("/products", viewsController.productsView);

router.get("/products/:pid", viewsController.productView);

router.get("/carts/:cid", viewsController.cartView);

export default router;