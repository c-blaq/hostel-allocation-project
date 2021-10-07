const Hostel = require("../model/hostel");
// const hostels = require("../hostels.json");
const express = require("express");
const router = express.Router();

router.get("/explore", (req, res) => {
  res.render("explore");
});

router.get("/hostels/:location", (req, res) => {
  if (req.params.location) {
    let result = hostels
      .filter(
        (hostel) =>
          hostel.location
            .toLowerCase()
            .indexOf(req.params.location.toLowerCase()) !== -1
      )
      .map((hostel) => hostel);
    res.send(result);
  }
});

router.post("/hostels", async (req, res) => {
  let hostel = new Hostel(req.body);
  hostel = await hostel.save();
});

module.exports = router;
