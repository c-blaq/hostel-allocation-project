const { Hostel } = require("../model/hostel");

const express = require("express");
const router = express.Router();

router.post("/hostels", async (req, res) => {
  let hostel = new Hostel(req.body);
  hostel = await hostel.save();
});

router.get("/hostels/", async (req, res) => {
  let { q: search } = req.query;
  search = (search || "").trim();

  let hostels = await Hostel.find().sort({ hostelName: 1 });
  if (search) {
    let hostel = hostels
      .filter(
        (hostel) =>
          hostel.location.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
      .map((hostel) => hostel);

    // console.log(hostel);

    res.render("search-result", { hostel });

    //   res.render("explore", { hostel });
    // } else {
    //   res.redirect("/");
  }
});

router.get("/search", (_, res) => {
  res.render("search-result");
});

module.exports = router;
