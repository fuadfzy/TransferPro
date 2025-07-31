module.exports = function(role) {
  return (req, res, next) => {
    if (req.session.role !== role) {
      return res.redirect('/login?errorMessage=You are not authorized to access this page');
    }
    next();
  };
};
