const express = require('express')
const app = express()
const port = 3000
const session = require('express-session');

const routes = require('./routes/index')

app.use(session({
  secret: 'transferpro777', 
  resave: false,           
  saveUninitialized: false, 
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, 
    httpOnly: true,              
    secure: false,               
  }
}));

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))

app.use("/", routes)
app.listen(port, () => {
    console.log(`TransferPro running on Port ${port}`)
})