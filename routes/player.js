const express = require('express')
const router = express.Router()
const roleCheck = require('../middleware/roleCheck');
const PlayerController = require('../controllers/playerController')

router.get('/players', PlayerController.readPlayers)
router.get('/players/add', PlayerController.renderAddPlayer)
router.post('/players/add', PlayerController.handleAddPlayer)
router.get('/players/:playerId/buy', roleCheck('owner'), PlayerController.buyPlayer)




module.exports = router