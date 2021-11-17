const adminAuth = require("../middleware/admin");
const { Hostel, validateHostel } = require("../model/hostel");
const express = require("express");
const router = express.Router();

router.get("/", adminAuth, (req, res) => {
  res.render("admin");
});

router.post("/", async (req, res) => {
  const { error } = validateHostel(req.body);
  if (error) return res.send(error.details[0].message);

  let hostel = await Hostel.findOne({ hostelName: req.body.hostelName });
  if (hostel) return res.send("Hostel already exists!");

  hostel = new Hostel(req.body);
  hostel = await hostel.save();

  res.redirect("/admin");
});

module.exports = router;
