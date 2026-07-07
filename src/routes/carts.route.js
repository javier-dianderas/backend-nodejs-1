const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/carts.controller");

// GET carts/id
router.get("/:id", cartsController.getCartById);

// POST carts/
// id: String
// products: []
router.post("/", cartsController.createCart);

router.delete("/:id", cartsController.deleteCartById);

// POST carts/:id/product/:pid
// id: String
// pid: String
// quantity: Number
router.post("/:id/product/:pid", cartsController.addProductToCartById);

router.delete("/:id/product/:pid", cartsController.deleteProductFromCartById);

module.exports = router;