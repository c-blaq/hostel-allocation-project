module.exports = function auth(req, res, next) {
  if (req.session.user && req.session.user.isAdmin === true) {
    next();
  } else {
    res.redirect("/");
  }
};
