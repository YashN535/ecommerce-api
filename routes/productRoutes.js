const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  listProducts,
} = require("../controllers/productController");

const router = express.Router();

// CRUD operations for Products
router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/list", listProducts);

module.exports = router;
