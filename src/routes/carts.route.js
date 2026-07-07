import express from "express";
import { getCartById, createCart, deleteCartById, addProductToCartById, deleteProductFromCartById } from "../controllers/carts.controller.js";

const router = express.Router();

// GET carts/id
router.get("/:id", getCartById);

// POST carts/
// id: String
// products: []
router.post("/", createCart);

router.delete("/:id", deleteCartById);

// POST carts/:id/product/:pid
// id: String
// pid: String
// quantity: Number
router.post("/:id/product/:pid", addProductToCartById);

router.delete("/:id/product/:pid", deleteProductFromCartById);

export default router;