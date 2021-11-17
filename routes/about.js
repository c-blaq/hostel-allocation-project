const express = require("express");
const router = express.Router();

// ABOUT
router.get("/", (req, res) => {
  res.render("about");
});

module.exports = router;
