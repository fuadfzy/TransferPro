const express = require('express')
const router = express.Router()
const PlayerController = require('../controllers/playerController')

router.get('/players', PlayerController.readPlayers)




module.exports = router