
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8009

//mongoi const
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://GShiels:Goldduck99@pokerumble-wpaen.mongodb.net/test?retryWrites=true&w=majority";


//set var for the cont for easy calls
var app = express();

var mongoose = require("mongoose");
var bodyParser = require('body-parser');

//allows all requests to be sent to the console
var morgan = require('morgan');
app.use(morgan("dev"));

//setting up the .ejs file paths for the url
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'Public')))

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  next();
});

//connect mongoose to the DB
mongoose.connect(uri, {useNewUrlParser: true});


//Set the pages for the diffrent url
app.set('views', path.join(__dirname, 'views'))
app.set('scripts', path.join(__dirname, 'scripts'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/pokedex', (req, res) => res.render('pages/pokedex'))
//app.get('/login', (req, res) => res.render('pages/login'))


//-------------------------------------------
//  Testing API Area
//-------------------------------------------

//instance of the router
var apiRouter = express.Router();


apiRouter.use(function(req, res, next) {
  console.log("User on app");
  next();
})

apiRouter.get('/', function(req, res, next) { 
  res.json({ message: 'hooray! welcome to our api!' }); 
});

apiRouter.route("/users")

    //used to create a user
    .post(function(req, res) {
      var user = new user();

      user.username = req.body.username;
      user.password = req.body.password;
      user.pokemonOne = req.body.pokemonOne;
      user.pokemonTwo = req.body.pokemonOne;
      user.pokemonThree = req.body.pokemonOne;
      user.pokemonFour = req.body.pokemonOne;

      console.log(req.body.username);

      user.save(function(err) {
        if (err) {
          //if there's already a user with those detials
          if (err.code == 11000)
            return res.json({ success: false, message: "Someone already has that Username, sorry "});
          else
            return res.send(err);
        }

        res.json({ message: "User has been created"});
      });
    })

      //Get all users
      .get(function(req, res) {
        User.find(function(err, users) {
          if (err) return res.send(err);
          res.json(users);
        })
      })





app.use("/api", apiRouter);

//-------------------------------------------
//
//-------------------------------------------




app.listen(PORT, () => console.log(`Listening on ${ PORT }`))