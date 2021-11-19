const { Hostel } = require("../model/hostel");

const express = require("express");
const router = express.Router();

router.get("/hostels/", async (req, res) => {
  let { q: search } = req.query;
  search = (search || "").trim();

  let hostels = await Hostel.find({}).sort({ name: 1 });
  if (search) {
    let result = hostels
      .filter(
        (hostel) =>
          hostel.location.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
      .map((hostel) => hostel);

    res.render("search-result", { result });
  }
});

router.get("/search", (_, res) => {
  res.render("search-result");
});

router.post("/hostels", async (req, res) => {
  let hostel = new Hostel(req.body);
  hostel = await hostel.save();
});
module.exports = router;
