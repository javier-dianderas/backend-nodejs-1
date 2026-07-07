const express = require("express");
const router = express.Router();
const produtcsController = require("../controllers/products.controller");
const validate = require("../middlewares/validate.middleware");
const productBodySchema = require("../schemas/product/product.body.schema");
const productParamsSchema = require("../schemas/product/product.params.schema");

// GET products/
router.get("/", produtcsController.getProducts);

// GET products/id
router.get("/:id"
    , validate(productParamsSchema, "params")
    , produtcsController.getProductById);

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
    , produtcsController.createProduct);

router.put("/:id"
    , validate(productParamsSchema, "params")
    , validate(productBodySchema)
    , produtcsController.updateProductById);

router.delete("/:id"
    , validate(productParamsSchema, "params")
    , produtcsController.deleteProductById);

module.exports = router;