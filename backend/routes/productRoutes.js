const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");

// Public
router.get("/", async (req, res) => {
const products = await Product.find();
res.json(products);
});

// Protected (only logged-in user)
router.post("/", auth, async (req, res) => {

const product = new Product(req.body);
await product.save();

res.json({ message: "Product Added" });

});

module.exports = router;