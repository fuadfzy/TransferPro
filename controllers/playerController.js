const { where } = require('sequelize')
const { User, Club, Player, Position, Sequelize, sequelize } = require('../models/index')
const { options } = require('../routes')
const {Op} = require('sequelize')

class PlayerController {
    static async readPlayers(req, res){
        try {
            const positionFilter = req.query.position || 'All'
            const searchQuery = req.query.search || ''
            let rules = {}

            if (searchQuery){
                rules.name = {[Op.iLike]: `%${searchQuery}%`}
            }
            
            let players = await Player.findAll({
                where: rules,
                include: [{
                    model: Club,
                    as: 'club',
                },{
                    model: Position,
                    as: 'positions',
                    where: positionFilter === 'All' ? {} : {positionName: positionFilter}
                }]
            })
            let positions = await Position.findAll()
            res.render('readPlayers', {players, positions, selectedPosition: positionFilter === 'All' ? 'All' : positionFilter, searchQuery })
        }

        catch(err) {
            res.send(err)
            console.log(err)
        }
    }
}

module.exports = PlayerController