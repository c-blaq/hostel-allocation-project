const { Hostel } = require("../model/hostel");

const express = require("express");
const router = express.Router();

// EXPLORE
router.get("/", async (req, res) => {
  let hostels = await Hostel.find().sort({ name: 1 });

  res.render("explore", { hostels });
});

// HOSTEL VIEW
router.get("/hostel/:slug", async (req, res) => {
  let hostels = await Hostel.findOne(req.params);

  res.render("hostel", { hostels });
});

module.exports = router;
