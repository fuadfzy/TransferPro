module.exports = function(role) {
  return (req, res, next) => {
    if (req.session.role !== role) {
      return res.redirect('/players?errorMessage=You are not authorized to buy players!');
    }
    next();
  };
};
