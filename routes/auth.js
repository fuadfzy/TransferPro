const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authController')


router.get('/', AuthController.landing);
router.get('/register', AuthController.renderRegister);
router.post('/register', AuthController.handleRegister);
router.get('/login', AuthController.renderLogin);
router.post('/login', AuthController.handleLogin);
router.get('/logout', AuthController.logout);

module.exports = router
