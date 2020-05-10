
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

//need the user model script
var User = require("./models/User");

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

apiRouter.route('/users')
       // create a user (accessed at POST http://localhost:8080/users)
       .post(function(req, res) {
         var user = new User(); // create a new instance of the User model
         user.username = req.body.username; // set the users username (comes from the request)
         user.password = req.body.password; // set the users password (comes from the request)

         console.log(req.body.name);
         console.log(req.body.username);
         user.save(function(err) {
           if (err) {
             // duplicate entry
             if (err.code == 11000)
              return res.json({ success: false, message: 'A user with that username already exists. '});
             else
              return res.send(err);
            }
            // return a message
            res.json({ message: 'User created!' });
          });
        })
       // get all the users (accessed at GET http://address/api/users)
       .get(function(req, res) {
         User.find(function(err, users) {
             if (err) return res.send(err);
             // return the users
             res.json(users);
         });
        });




app.use("/api", apiRouter);

//-------------------------------------------
//
//-------------------------------------------




app.listen(PORT, () => console.log(`Listening on ${ PORT }`))