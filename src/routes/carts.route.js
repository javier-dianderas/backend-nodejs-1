import express from "express";
import { getCartById, createCart, deleteCartById, addProductToCartById, deleteProductFromCartById, updateQuantityProductToCartById, updateProductsCartById } from "../controllers/carts.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import cartParamsSchema from "../schemas/cart/cart.params.schema.js";
import cartProductParamsSchema from "../schemas/cart/cartProduct.params.schema.js";
import cartItemsBodySchema from "../schemas/cart/cartItems.body.schema.js";
import cartQuantityItemSchema from "../schemas/cart/cartQuantityItem.body.schema.js";

const router = express.Router();


router.get(
    "/:cid", 
    validate(cartParamsSchema, "params"),
    getCartById);

router.post("/", createCart);

router.put(
    "/:cid", 
    validate(cartParamsSchema, "params"),
    validate(cartItemsBodySchema, "body"),
    updateProductsCartById);

router.delete(
    "/:cid", 
    validate(cartParamsSchema, "params"),
    deleteCartById);

router.post(
    "/:cid/product/:pid", 
    validate(cartProductParamsSchema, "params"),
    validate(cartQuantityItemSchema, "body"),
    addProductToCartById);

router.put(
    "/:cid/product/:pid", 
    validate(cartProductParamsSchema, "params"),
    validate(cartQuantityItemSchema, "body"),
    updateQuantityProductToCartById);

router.delete(
    "/:cid/product/:pid", 
    validate(cartProductParamsSchema, "params"),
    deleteProductFromCartById);

export default router;