const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./models/Product");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));

// ✅ Seed function
const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();

    if (count === 0) {
      await Product.insertMany([
        {
          name: "Laptop",
          price: 100000,
          image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_SL1500_.jpg"
        },
        {
          name: "Smartphone",
          price: 80000,
          image: "https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_SL1500_.jpg"
        },
        {
          name: "Headphones",
          price: 3000,
          image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SL1500_.jpg"
        },
        {
          name: "Smart Watch",
          price: 9000,
          image: "https://m.media-amazon.com/images/I/61y2VVWcGBL._AC_SL1500_.jpg"
        },
        {
          name: "Gaming Mouse",
          price: 2500,
          image: "https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg"
        }
      ]);

      console.log("✅ Products Added in DB");
    } else {
      console.log("⚡ Products already exist");
    }
  } catch (error) {
    console.log("❌ Seed Error:", error);
  }
};

// ✅ MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
.then(async () => {
  console.log("✅ MongoDB Connected");

  // 👇 IMPORTANT (yaha call karo)
  await seedProducts();

  // Start server
  app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
  });
})
.catch(err => console.log("❌ DB Error:", err));