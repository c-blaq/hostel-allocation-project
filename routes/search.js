const { Hostel } = require("../model/hostel");
// const hostels = require("../hostels.json");
const express = require("express");
const router = express.Router();

router.get("/hostels/", (req, res) => {
  let { search } = req.query;
  search = (search || "").trim();

  if (search) {
    let result = hostels
      .filter(
        (hostel) =>
          hostel.location.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
      .map((hostel) => hostel);
    res.send(result);
  }
});

module.exports = router;
