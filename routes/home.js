const { Hostel } = require("../model/hostel");
const express = require("express");
const router = express.Router();

// HOME
router.get("/", async (req, res) => {
  let hostels = await Hostel.find().sort({ name: 1 }).limit(4);

  res.render("index", { hostels });
});

module.exports = router;
