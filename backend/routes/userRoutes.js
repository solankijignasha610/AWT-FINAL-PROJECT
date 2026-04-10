const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {

const { name, email, password } = req.body;

// hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const user = new User({
name,
email,
password: hashedPassword
});

await user.save();

// create token
const token = jwt.sign(
{ id: user._id },
"secretkey",
{ expiresIn: "1h" }
);

res.json({ message: "User Registered", token });

});

// Login
router.post("/login", async (req, res) => {

const { email, password } = req.body;

const user = await User.findOne({ email });

if(!user){
return res.status(400).json({message:"User not found"});
}

// compare password using bcrypt
const isMatch = await bcrypt.compare(password, user.password);

if(!isMatch){
return res.status(400).json({message:"Wrong password"});
}

// create token
const token = jwt.sign(
{ id: user._id },
"secretkey",
{ expiresIn: "1h" }
);

res.json({
message: "Login Success",
token
});

});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Hide passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;