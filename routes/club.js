const express = require('express')
const router = express.Router()
const ClubController = require('../controllers/clubController')

router.get('/clubs', ClubController.readClub)
router.get('/clubs/add', ClubController.renderAddClub)
router.post('/clubs/add', ClubController.handleAddClub)
router.get('/clubs/delete/:clubId', ClubController.deleteClub)
router.get('/clubs/:clubId/players/:playerId', ClubController.clubPlayerDetail)
router.get('/clubs/:clubId', ClubController.clubDetail)



module.exports = router