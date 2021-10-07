module.exports = function redirect(req, res, next) {
  if (req.session.user) {
    return res.redirect("/explore");
  }
  next();
};
