module.exports = function auth(req, res, next) {
  if (req.session.isAdmin === true) {
    next();
  } else {
    res.redirect("/");
  }
};
