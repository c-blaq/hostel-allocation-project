const bcrypt = require("bcrypt");
// const Token = require("../model/userToken");
const { User, validateUser, validateLogin } = require("../model/user");
const { Hostel } = require("../model/hostel");

const express = require("express");
const auth = require("../middleware/auth");
const redirect = require("../middleware/redirect");
const router = express.Router();

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
  public_key: process.env.MAILGUN_PUBLIC_KEY,
});
const DOMAIN = process.env.MAILGUN_DOMAIN;

// HOME
router.get("/", async (req, res) => {
  let hostels = await Hostel.find().sort({ name: 1 }).limit(4);

  res.render("index", { hostels });

  mg.messages
    .create(DOMAIN, {
      from: "Homely <bbayejuadesina@gmail.com>",
      to: "babayejuadesina@gmail.com",
      subject: `Email Verification`,
      template: "email",
      "h:X-Mailgun-Variables": JSON.stringify({
        // be sure to stringify your payload
        title: "email verify",
      }),
      "h:Reply-To": "bbayejuadesina@gmail.com",
    })
    .then((msg) => console.log(msg)) // logs response data
    .catch((err) => console.log(err));

  // res.render("index");
});

// ABOUT
router.get("/about", (req, res) => {
  res.render("about");
});

// EXPLORE
router.get("/explore", async (req, res) => {
  let hostels = await Hostel.find().sort({ name: 1 });

  res.render("explore", { hostels });
});

// HOSTEL VIEW
router.get("/hostel/:slug", async (req, res) => {
  let hostels = await Hostel.findOne(req.params);

  res.render("hostel", { hostels });
});

// CONTACT
router.get("/contact", (req, res) => {
  res.render("contact");
});

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

router.get("/verify/:id/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("Invalid link");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link");

    await User.updateOne({ _id: user._id, verified: true });
    await Token.findByIdAndRemove(token._id);

    res.send("email verified sucessfully");
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
