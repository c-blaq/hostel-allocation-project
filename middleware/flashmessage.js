module.exports = function (req, res, next) {
  if (req.session.flash) {
    res.locals.flash = req.session.flash;
    req.session.flash = null;
  }
  res.createFlashMessage = function (message) {
    req.session.flash = message;
    return res;
  };
  next();
};
