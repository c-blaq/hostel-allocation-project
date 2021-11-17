const bcrypt = require("bcrypt");
const { User, validateUser, validateLogin } = require("../model/user");
const { Hostel } = require("../model/hostel");

const express = require("express");
const auth = require("../middleware/auth");
const redirect = require("../middleware/redirect");
const router = express.Router();

//SIGN-IN
router.get("/sign-in", redirect, (req, res) => {
  res.render("sign-in");
});

router.post("/sign-up", async (req, res) => {
  const { error } = validateUser(req.body);
  try {
    if (error) return res.send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.send("User already exists!");

    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    let result = await user.save();

    res.redirect("/sign-in");
  } catch (error) {
    res.status(400).send("An error occured");
  }
});

router.post("/sign-in", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  let confirmPassword = await bcrypt.compare(req.body.password, user.password);
  if (!confirmPassword)
    return res.status(400).send("Invalid email or password");

  req.session.user = user;
  res.redirect("/explore");
});

module.exports = router;
