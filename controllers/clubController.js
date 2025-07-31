const { where } = require('sequelize')
const { User, Club, Player, Position, Sequelize, sequelize } = require('../models/index')
const Helper = require(`../helpers/helper`)
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

            const session = req.session.userId ? { 
                userId: req.session.userId, 
                role: req.session.role, 
                clubName: req.session.clubName,
                transferBudget: Helper.getPounds(req.session.transferBudget)
            } : null;

         
            const userClub = await Club.findOne({where: {id: req.session.ClubId ? req.session.ClubId : null}})
            const userTransferBudget = userClub === null ? null : Helper.getPounds(userClub.transferBudget)

            res.render('clubPlayerDetail', {userTransferBudget, choosenPlayer, session})
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

            const session = req.session.userId ? { 
                userId: req.session.userId, 
                role: req.session.role, 
                clubName: req.session.clubName,
                transferBudget: Helper.getPounds(req.session.transferBudget)
            } : null;


            const userClub = await Club.findOne({where: {id: req.session.ClubId ? req.session.ClubId : null}})
            const userTransferBudget = userClub === null ? null : Helper.getPounds(userClub.transferBudget)

            res.render("clubsList", {userTransferBudget, clubs, deletedClub, session})
        }
        catch (err) {
            res.send(err)
            console.log(err)
        }
    }

    static async renderAddClub(req,res){
        try {
            const session = req.session.userId ? { 
                userId: req.session.userId, 
                role: req.session.role, 
                clubName: req.session.clubName,
                transferBudget: Helper.getPounds(req.session.transferBudget)
            } : null;


            const userClub = await Club.findOne({where: {id: req.session.ClubId ? req.session.ClubId : null}})
            const userTransferBudget = userClub === null ? null : Helper.getPounds(userClub.transferBudget)


            res.render('addClub', {userTransferBudget, session})

           
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

            const session = req.session.userId ? { 
                userId: req.session.userId, 
                role: req.session.role, 
                clubName: req.session.clubName,
                transferBudget: Helper.getPounds(req.session.transferBudget)
            } : null;

    
            const userClub = await Club.findOne({where: {id: req.session.ClubId ? req.session.ClubId : null}})
            const userTransferBudget = userClub === null ? null : Helper.getPounds(userClub.transferBudget)

            // console.log(choosenClubPlayers)
            res.render('clubDetail', {userTransferBudget, choosenClubPlayers, session})
        }
        catch(err){
            res.send(err)
            console.log(err)
        }
    }
}

module.exports = ClubController