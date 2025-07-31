const { where } = require('sequelize')
const { User, Club, Player, Position, Sequelize, sequelize } = require('../models/index')
const { options } = require('../routes')

class ClubController {
    static async clubPlayerDetail(req, res){
        try {
            const {playerId} = req.params
            let choosenPlayer = await Player.findOne({
                include: [{
                    model: Club,
                    as: 'club',
                    attributes: ['clubName']
                }, 
                {
                    model: Position,
                    as: 'positions',
                    attributes: ['positionName']
                }],
                where: {
                    id: playerId
                }
            })

            res.render('clubPlayerDetail', {choosenPlayer})
        }
        catch(err) {
            res.send(err)
            console.log(err)
        }
    }
    static async readClub(req, res){
        try {
            const {deletedClub} = req.query
            let clubs = await Club.findAll({
                include: [{
                    model: Player,
                    as: 'players',
                    attributes: []
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['name']
                }],
                attributes : {
                    include: [
                        [Sequelize.fn('COUNT', Sequelize.col('players.id')), 'playerCount']
                    ]
                },
                group: ['Club.id', 'user.id', 'user.name'],
                order: [['createdAt', 'DESC']]
            })

            res.render("clubsList", {clubs, deletedClub})
        }
        catch (err) {
            res.send(err)
            console.log(err)
        }
    }

    static async renderAddClub(req,res){
        try {
            res.render('addClub')
        }
        catch (err) {
            console.log(err)
            res.send(err)
        }
    }

    static async handleAddClub(req,res){
        try {
            let { clubName, transferBudget } = req.body

            await Club.create({clubName, transferBudget})
            res.redirect('/clubs')
        }
        catch(err) {
            res.send(err)
            console.log(err)
        }
    }

    static async deleteClub(req, res){
        try {
            let {clubId} = req.params

            let deletedClub = await Club.findOne({where: {id: clubId}})
            
            await deletedClub.destroy()
            res.redirect(`/clubs?deletedClub=${deletedClub.clubName}`)
                
        }
        catch(err) {
            res.send(err)
            console.log(err)
        }
    }

    static async clubDetail(req, res){
        try {
            let {clubId} = req.params
            let choosenClubPlayers = await Player.findAll({
                include: ['club', 'positions'],
                where: {
                    ClubId: clubId
                }
            })

            // console.log(choosenClubPlayers)
            res.render('clubDetail', {choosenClubPlayers})
        }
        catch(err){
            res.send(err)
            console.log(err)
        }
    }
}

module.exports = ClubController