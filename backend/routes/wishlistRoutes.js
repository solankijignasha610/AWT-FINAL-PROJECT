const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const auth = require("../middleware/authMiddleware");

// ❤️ Get Wishlist
router.get("/", auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user.id, items: [] });
      await wishlist.save();
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ➕ Add to Wishlist
router.post("/add", auth, async (req, res) => {
  try {
    const { product } = req.body;
    let wishlist = await Wishlist.findOne({ userId: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user.id, items: [] });
    }

    const prodId = (product._id || product.id).toString();

    const existingItem = wishlist.items.find(
      item => item.productId === prodId
    );

    if (!existingItem) {
      wishlist.items.push({
        productId: prodId,
        name: product.name,
        price: product.price,
        image: product.image
      });
      await wishlist.save();
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ❌ Remove from Wishlist
router.delete("/remove/:id", auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.user.id });

    if (wishlist) {
      wishlist.items = wishlist.items.filter(
        item => item.productId !== req.params.id
      );
      await wishlist.save();
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
