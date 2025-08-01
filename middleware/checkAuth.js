

module.exports = function(req, res, next) {
  // Jika user sudah login (session userId ada)
  if (req.session.userId) {
    return res.redirect('/dashboard');  // Redirect ke halaman dashboard atau halaman lain yang sesuai
  }
  next(); // Jika belum login, lanjutkan ke route berikutnya
}
