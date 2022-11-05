/* Importing the Router function from the express module and then creating a new router object. */
const { Router } = require("express");
const router = Router();

/* Importing the functions from the controladores.js file. */
const {
  getProductsController,
  getRandomProductController,
  getProductByIdController,
  addNewProduct,
  deleteProductById,
  updateProductById,
  getHomePage
} = require("../controladores.js");



/* Creating a route for the web server. */
router.get("/",getHomePage);
router.get("/products", getProductsController);
router.get("/randomProducts", getRandomProductController);

/* Creating a route for the API. */
router.get("/api/product/:id", getProductByIdController);
router.post("/api/product", addNewProduct);
router.delete("/api/product/:id", deleteProductById);
router.put("/api/product/:id", updateProductById);

module.exports = { router };
