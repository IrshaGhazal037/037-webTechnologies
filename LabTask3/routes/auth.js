const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

router.get("/logout", async (req, res) => {
  req.session.user = null;
  console.log("session clear");
  return res.redirect("/Login");
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  req.setFlash("danger", "Logged out!");
  // req.session.flash = { type: "success", message: "Logged Out Successfully!" };
  res.redirect("/Login");
});

router.get("/Login", (req, res) => {
  res.render("/api/auth/Login");
});
router.post("/Login", async (req, res) => {

  console.log("REquest find", req.body)
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.session.flash = { type: "danger", message: "User Not Present" };
    req.flash("danger", "User with this email not present");
    return res.redirect("/Login");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    req.session.user = user;
    console.log("user is present")
    req.flash("success", "Logged in Successfully");
    return res.redirect("/");
  } else {
    req.flash("danger", "Invalid Password");
    return res.redirect("/Login");
  }
});
router.get("/Register", (req, res) => {
  res.render("auth/Register");
});
router.post("/Register", async (req, res) => {
  //   await User.deleteMany({});
  console.log("REquest find", req.body)
  let user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();
  res.redirect("/Login");
});
module.exports = router;
