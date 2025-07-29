const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.readClub)
router.get('/club', Controller.readClub)
router.get('/club/add', Controller.renderAddClub)
router.post('/club/add', Controller.handleAddClub)
// router.get('/club/:clubId/player/add', Controller.renderAddPlayer)
// router.post('/club/:clubId/player/add', Controller.handleAddPlayer)
// router.get('/club/:clubId/player/:playerId/buy', Controller.handleBuyPlayer)
// router.get('/club/:clubId/player/:playerId/delete', Controller.handleDelete)
// router.get('/club/:clubId', Controller.clubDetail)



module.exports = router