const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authController')
const checkAuth = require('../middleware/checkAuth');


router.get('/', AuthController.landing);
router.get('/register', checkAuth, AuthController.renderRegister);
router.post('/register', AuthController.handleRegister);
router.get('/login', checkAuth, AuthController.renderLogin);
router.post('/login', AuthController.handleLogin);
router.get('/logout', AuthController.logout);

module.exports = router
