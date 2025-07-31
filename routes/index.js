const express = require('express')
const router = express.Router()
const Controller = require('../controllers/clubController.js')

const clubRoute = require('./club')
const playerRoute = require('./player.js')

router.use('/', clubRoute)
router.use('/', playerRoute)

module.exports = router