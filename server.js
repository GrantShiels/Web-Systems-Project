
const express = require('express');
const path = require('path');
const flash = require("connect-flash");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require("passport");
const http = require("http");
const socketio = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = socketio(server);

const Battle = require("./lib/pokeBattle");


//passport script
require("./lib/passport")(passport);

const PORT = process.env.PORT || 8009;

//mongoi const
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://GShiels:Goldduck99@pokerumble-wpaen.mongodb.net/test?retryWrites=true&w=majority";



//allows all requests to be sent to the console
var morgan = require('morgan');
app.use(morgan("dev"));

//need the user model script
var User = require("./models/User");



app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  next();
});


//connect mongoose to the DB
mongoose.connect(uri, {useNewUrlParser: true})
  .then(() => console.log("mongoDB is connected"))
  .catch(err => console.log(err));



//setting up the .ejs file paths for the url
app.use(express.static(path.join(__dirname, 'Public')));
app.set('views', path.join(__dirname, 'views'));
app.set('scripts', path.join(__dirname, 'lib'));
app.set('view engine', 'ejs');


//Socket.io section
let waitingPlayer = null;

io.on("connection", (socket) => {

  //if there is a user waiting for a game
  if (waitingPlayer) {
    //join users for new game
    new Battle(waitingPlayer, socket);
    //clear waiting player val
    waitingPlayer = null;
  } else {
    waitingPlayer = socket;
    waitingPlayer.emit("message", "Waiting for new player")
  }

  socket.on("message", (text) => {
    io.emit("message", text);
  })
});


//Body Parse
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


//Express Session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


//Passport stuff
app.use(passport.initialize());
app.use(passport.session());

//connect the flash
app.use(flash());


//messages
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


//ROutes
app.get('/', (req, res) => res.render('pages/index'));
app.get('/pokedex', (req, res) => res.render('pages/pokedex'));
app.get("/battle", (req, res) => res.render("pages/battle"));
app.get("/chat", (req, res) => res.render("pages/chat"));
app.use("/user", require("./routes/userRoute"));
app.use("/game", require("./routes/gameRoute"));






server.listen(PORT, () => console.log(`Listening on ${ PORT }`));