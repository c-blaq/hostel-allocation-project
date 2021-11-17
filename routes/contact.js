const express = require("express");
const router = express.Router();

// CONTACT
router.get("/", (req, res) => {
  res.render("contact");
});

module.exports = router;
