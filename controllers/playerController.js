const { where } = require('sequelize')
const { User, Club, Player, Position, PlayerPosition } = require('../models/index')
const { options } = require('../routes')
const {Op} = require('sequelize')
const Helper = require(`../helpers/helper`)

class PlayerController {
    static async readPlayers(req, res){
        try {
            let errorMessage = req.query.errorMessage;
            if (!errorMessage) {
                errorMessage = [];
            } else {
                errorMessage = errorMessage.split(",");
            }
            const positionFilter = req.query.position || 'All'
            const searchQuery = req.query.search || ''
            let rules = {}
            let topScorer = await Player.getTopScorer()

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

            const session = req.session.userId ? { 
                            userId: req.session.userId, 
                            role: req.session.role, 
                            clubName: req.session.clubName,
                            transferBudget: Helper.getPounds(req.session.transferBudget)
                        } : null;

          
            const userClub = await Club.findOne({where: {id: req.session.ClubId ? req.session.ClubId : null}})
            const userTransferBudget = userClub === null ? null : Helper.getPounds(userClub.transferBudget)

            res.render('readPlayers', {userTransferBudget, errorMessage, session, topScorer, players, positions, selectedPosition: positionFilter === 'All' ? 'All' : positionFilter, searchQuery })
        }

        catch(err) {
            res.send(err)
            console.log(err)
        }
    }

    static async renderAddPlayer(req, res) {
        try {
            let errorMessage = req.query.errorMessage;
            if (!errorMessage) {
                errorMessage = [];
            } else {
                errorMessage = errorMessage.split(",");
            }

            const clubs = await Club.findAll();
            const positions = await Position.findAll();

            const session = req.session.userId ? { 
                            userId: req.session.userId, 
                            role: req.session.role, 
                            clubName: req.session.clubName,
                            transferBudget: Helper.getPounds(req.session.transferBudget)
                        } : null;

       
            const userClub = await Club.findOne({where: {id: req.session.ClubId ? req.session.ClubId : null}})
            const userTransferBudget = userClub === null ? null : Helper.getPounds(userClub.transferBudget)

            res.render('addPlayer', { userTransferBudget, session, clubs, positions, errorMessage });
        } catch (err) {
            console.error(err);
            res.send(err);
        }
    }

    static async handleAddPlayer(req, res) {
        try {
            const { name, price, ClubId, age, position1, position2 } = req.body;

            const errors = [];
            const allPositions = await Position.findAll();
            const positionNames = allPositions.map(position => position.positionName);

            if (!positionNames.includes(position1)) {
                errors.push('Position 1 is not valid/empty');
            }
            // Jika ada error validasi, redirect kembali ke form dengan error message
            if (errors.length > 0) {
                const errorMessage = errors.join(",");
                return res.redirect(`/players/add?errorMessage=${errorMessage}`);
            }

            // Buat pemain baru
            const player = await Player.create({
                name,
                price,
                ClubId,
                age
            });
            const position1Id = await Position.findOne({ where: { positionName: position1 } });
            const position2Id = position2 ? await Position.findOne({ where: { positionName: position2 } }) : null;

            await player.addPositions([position1Id.id, position2Id ? position2Id.id : null].filter(Boolean));


            res.redirect('/players');
        } catch (err) {
            if (err.name === "SequelizeValidationError") {
                const errorMessage = err.errors.map(error => error.message).join(",");
                res.redirect(`/players/add?errorMessage=${errorMessage}`);
            } else {
                console.log(err);
                res.send(err);
            }
        }
    }

    static async buyPlayer(req, res) {
        try {


            const { playerId } = req.params;
            const user = await User.findOne({ where: { id: req.session.userId } });

            const player = await Player.findOne({ where: { id: playerId } });
            if (!player) {
            return res.redirect('/players?errorMessage=Player not found');
            }

            const club = await Club.findOne({ where: { id: user.ClubId } });
            if (club.transferBudget < player.price) {
            return res.redirect('/players?errorMessage=Not enough transfer budget');
            }

            const playerClub = await Club.findOne({where: {id: player.ClubId}})

            if (playerClub.id === user.ClubId) {
            return res.redirect('/players?errorMessage=You can only buy players from other team');
            }

            await player.update({ ClubId: user.ClubId });
            await club.update({ transferBudget: club.transferBudget - player.price });

            res.redirect(`/clubs/${user.ClubId}`);

        }
        catch(err) {
            res.send(err)
            console.log(err)
        }     
    }
}

module.exports = PlayerController