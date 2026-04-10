const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const auth = require("../middleware/authMiddleware");


// 🛒 Get Cart
router.get("/", auth, async (req, res) => {

let cart = await Cart.findOne({ userId: req.user.id });

if(!cart){
cart = new Cart({ userId: req.user.id, items: [] });
await cart.save();
}

res.json(cart);

});


// ➕ Add to Cart
router.post("/add", auth, async (req, res) => {

const { product } = req.body;

let cart = await Cart.findOne({ userId: req.user.id });

if(!cart){
cart = new Cart({ userId: req.user.id, items: [] });
}

const prodId = (product._id || product.id).toString();

const existingItem = cart.items.find(
item => item.productId === prodId
);

if(existingItem){
existingItem.quantity += 1;
}else{
cart.items.push({
productId: prodId,
name: product.name,
price: product.price,
image: product.image
});
}

await cart.save();

res.json(cart);

});


// ❌ Remove from Cart
router.delete("/remove/:id", auth, async (req, res) => {

let cart = await Cart.findOne({ userId: req.user.id });

cart.items = cart.items.filter(
item => item.productId.toString() !== req.params.id
);

await cart.save();

res.json(cart);

});

module.exports = router;