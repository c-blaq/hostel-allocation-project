const { Hostel } = require("../model/hostel");
// const hostels = require("../hostels.json");
const express = require("express");
const router = express.Router();

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

module.exports = router;
