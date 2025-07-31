const express = require('express')
const router = express.Router()
const ClubController = require('../controllers/clubController')

router.get('/', ClubController.readClub)
router.get('/clubs', ClubController.readClub)
router.get('/clubs/add', ClubController.renderAddClub)
router.post('/clubs/add', ClubController.handleAddClub)
router.get('/clubs/delete/:clubId', ClubController.deleteClub)
router.get('/clubs/:clubId/players/:playerId', ClubController.clubPlayerDetail)
// router.get('/club/:clubId/player/add', Controller.renderAddPlayer)
// router.post('/club/:clubId/player/add', Controller.handleAddPlayer)
// router.get('/club/:clubId/player/:playerId/buy', Controller.handleBuyPlayer)
// router.get('/club/:clubId/player/:playerId/delete', Controller.handleDelete)
router.get('/clubs/:clubId', ClubController.clubDetail)



module.exports = router