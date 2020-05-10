
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8009

//mongoi const
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://GShiels:Goldduck99@pokerumble-wpaen.mongodb.net/test?retryWrites=true&w=majority";


//set var for the cont for easy calls
var app = express()




//setting up the .ejs file paths for the url
app.use(express.static(path.join(__dirname, 'Public')))
app.set('views', path.join(__dirname, 'views'))
app.set('scripts', path.join(__dirname, 'scripts'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/pokedex', (req, res) => res.render('pages/pokedex'))
app.get('/login', (req, res) => res.render('pages/login'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

//app.listen(port)

//login route
app.route("/test")
  .get(function(req, res){
  res.send("This is the login form")
})
  .post(function(req, res){console.log("Porcessing")
  res.send("processing the login form")
})

MongoClient.connect(uri, function (err, db) {
  if(err) throw err;

  console.log("end DB stuff")
  
});