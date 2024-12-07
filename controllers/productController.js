const multer = require("multer");
const path = require("path");
const Product = require("../models/productModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single("image");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const image = req.file ? req.file.path : null;

    const product = await Product.create({
      name,
      price,
      category,
    });

    res.json({ message: "Product created", product });
  } catch (err) {
    res.json({ error: err.message });
  }
};

// exports.createProduct = async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.json({ message: "Product created", product });
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// };

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated", product });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json({ products });
  } catch (err) {
    res.json({ error: err.message });
  }
};
