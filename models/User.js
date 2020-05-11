//model for the user 

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt  = require('bcrypt-nodejs');

//Scheem build from username, password and four fav pokemon
var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true }},
    password: { type: String, required: true},
    pokemonOne: String,
    pokemonTwo: String,
    pokemonThree: String,
    pokemonFour: String
});



// UserSchema.methods.comparePasswords = function(password) {
//     var user = this;

//     return bcrypt.compareSync.model("User", UserSchema);
// };

var User = mongoose.model("User", UserSchema);

module.exports = User;