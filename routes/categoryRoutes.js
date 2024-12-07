const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategories,
} = require("../controllers/categoryController");

const router = express.Router();

// CRUD operations for Categories
router.post("/create", createCategory);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);
router.get("/list", listCategories);
module.exports = router;
