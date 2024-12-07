const Category = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json({ message: "Category created", category });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category updated", category });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.listCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (err) {
    res.json({ error: err.message });
  }
};
