const { where } = require('sequelize')
const { User, Club, Player, Position, Sequelize, sequelize } = require('../models/index')
const { options } = require('../routes')

class Controller {
    static async readClub(req, res){
        try {
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

            res.render("clubsList", {clubs})
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
            res.redirect('/club')
        }
        catch(err) {
            res.send(err)
            console.log(err)
        }
    }
}

module.exports = Controller