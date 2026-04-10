const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  items: [
    {
      productId: {
        type: String // String to handle both MongoDB _id and static numeric IDs
      },
      name: String,
      price: Number,
      image: String
    }
  ]
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
