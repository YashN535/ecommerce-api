const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer();

exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.json({ Message: "User created successfully", user });
  } catch (error) {
    res.json({ Message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ Message: "Logged In", token });
  } catch (error) {
    res.json({ Message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ Message: "User not found" });

    user.password = newPassword;
    await user.save();
    res.json({ Message: "Password changed successfully" });
  } catch (error) {
    res.json({ Message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ Message: "User not found" });

    user.password = newPassword;
    await user.save();
    res.json({ Message: "Password changed successfully" });
  } catch (error) {
    res.json({ Message: error.message });
  }
};

exports.userList = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (error) {
    res.json({ Message: error.message });
  }
};
