const { Hostel } = require("../model/hostel");

const express = require("express");
const router = express.Router();

router.get("/hostels/", async (req, res) => {
  let { q: search } = req.query;
  search = (search || "").trim();

  let hostels = await Hostel.find().sort({ name: 1 });
  if (search) {
    let hostel = hostels
      .filter(
        (hostel) =>
          hostel.location.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
      .map((hostel) => hostel);
    //   res.render("explore", { hostel });
    // } else {
    //   res.redirect("/");
  }
});

router.post("/hostels", async (req, res) => {
  let hostel = new Hostel(req.body);
  hostel = await hostel.save();
});

module.exports = router;
