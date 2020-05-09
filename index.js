const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8009

var User = require("./lib/User")
var router = express.Router()

var mongodb = require("mongodb")
var MongoClient = mongodb.MongoClient


express()
  .use(express.static(path.join(__dirname, 'Public')))
  .set('views', path.join(__dirname, 'views'))
  .set('scripts', path.join(__dirname, 'scripts'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/pokedex', (req, res) => res.render('pages/pokedex'))
  .get('/login', (req, res) => res.render('pages/login'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

router.post("/login", function(req, res) {
  var username = req.body.username
  var password = req.password

  User.findOne({username: username, password: password}, function(err, user) {
    if(err) {
      console.log(err)
      return res.status(500).send();
    }

    if(!user) {
      return res.status(404).send();
    }

    return res.status(200).send();
  })
})

router.post("/register", function(req, res){
  var username = req.body.username
  var password = req.body.password
  var pokemonOne = req.body.pokemonOne
  var pokemonTwo = req.body.pokemonTwo
  var pokemonThree = req.body.pokemonThree
  var pokemonFour = req.body.pokemonFour

  var newUser = new User()
  newUser.username = username
  newUser.password = password
  newUser.pokemonOne = pokemonOne
  newUser.pokemonTwo = pokemonTwo
  newUser.pokemonThree = pokemonThree
  newUser.pokemonFour = pokemonFour
  newUser.save(function(err, savedUser){
    if(err) {
      console.log(err)
      return res.status(500).send();
    }

    return res.status(200).send()
  })
})  