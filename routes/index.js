const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

const clubRoute = require('./club')
const playerRoute = require('./player.js')

router.use('/', clubRoute)
// router.use('players', playerRoute)

module.exports = router