const bcrypt = require('bcryptjs')
const { User, Club } = require('../models/index')



class AuthController {
    static landing(req, res){
        try {
            if (!req.session.userId) {
                return res.redirect('/login');  // Jika session tidak ada, arahkan ke login
            }

            res.redirect('/clubs')
        }
        catch(err){
            res.send(err)
            console.log(err)
        }
    }

  static async renderRegister(req, res) {
    try {
        let errorMessage = req.query.errorMessage;
        if (!errorMessage) {
        errorMessage = [];
        } else {
        errorMessage = errorMessage.split(",");
        }

        let clubs = await Club.findAll()

        res.render('register', { errorMessage, clubs });
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
  }


  static async handleRegister(req, res) {
    try{
        const { name, email, password, confirmPassword, role, ClubId } = req.body;

        if (password !== confirmPassword) {
        return res.redirect('/register?errorMessage=Passwords do not match');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword, role, ClubId });

        req.session.userId = user.id;
        req.session.role = user.role;
        req.session.ClubId = user.ClubId;
        res.redirect('/');
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
  }


  static renderLogin(req, res) {
    try {
        let errorMessage = req.query.errorMessage;
        if (!errorMessage) {
        errorMessage = [];
        } else {
        errorMessage = errorMessage.split(",");
        }

        res.render('login', { errorMessage });
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
}


    static async handleLogin(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.redirect('/login?errorMessage=Invalid credentials');
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.redirect('/login?errorMessage=Invalid credentials');
            }

            req.session.userId = user.id;
            req.session.role = user.role;
            req.session.ClubId = user.ClubId;
            const club = await Club.findOne({ where: { id: user.ClubId } })
            req.session.clubName = club.clubName
            req.session.transferBudget = club.transferBudget

            res.redirect('/clubs');
        }
        catch(err){
            console.log(err)
            res.send(err)
        }
    }


  static logout(req, res) {
    try {
        req.session.destroy(() => {
        res.redirect('/clubs');
        });
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
  }
}

module.exports = AuthController;
