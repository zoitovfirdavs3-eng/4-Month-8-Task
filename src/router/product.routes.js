const { Router } = require("express");
const productController = require("../controller/product.controller");
const productValidator = require("../utils/product.validator");

const productRouter = Router();

productRouter.get("/all", productController.GET_PRODUCTS);

productRouter
  .route("/:id")
  .get(productController.GET_PRODUCTS)
  .delete(productController.DELETE_PRODUCTS)
  .put(productController.UPDATE_PRODUCTS);

productRouter.post("/create", productValidator, productController.CREATE_PRODUCTS);

module.exports = productRouter;
