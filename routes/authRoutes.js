const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  changePassword,
  userList,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/changepassword", changePassword);
router.get("/users", userList);

module.exports = router;
