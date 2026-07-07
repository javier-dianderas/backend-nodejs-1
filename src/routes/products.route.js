import express from "express";

import { getProducts, getProductById, createProduct, updateProductById, deleteProductById } from "../controllers/products.controller.js";
import validate from "../middlewares/validate.middleware.js";
import productBodySchema from "../schemas/product/product.body.schema.js";
import productParamsSchema from "../schemas/product/product.params.schema.js";

const router = express.Router();

// GET products/
router.get("/", getProducts);

// GET products/id
router.get("/:id"
    , validate(productParamsSchema, "params")
    , getProductById);

// POST products/
// id: String
// title: String
// description: String
// code: String
// price: Number
// status: Boolean
// stock: Number
// category: String
// thumbnails: Array de Strings
router.post("/"
    , validate(productBodySchema)
    , createProduct);

router.put("/:id"
    , validate(productParamsSchema, "params")
    , validate(productBodySchema)
    , updateProductById);

router.delete("/:id"
    , validate(productParamsSchema, "params")
    , deleteProductById);

export default router;