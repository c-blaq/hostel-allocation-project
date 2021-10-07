const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

// dashboard
router.get("/", auth, async (req, res) => {
  const { user } = req.session;
  res.render("dashboard", { message: `Welcome ${user.name}` });
});

module.exports = router;
