const adminAuth = require("../middleware/admin");
const express = require("express");
const router = express.Router();

router.get("/admin", adminAuth, (req, res) => {
  res.send("welcome admin");
});

module.exports = router;
