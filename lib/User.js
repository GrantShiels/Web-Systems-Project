var mongoose = require("mongoose")

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    pokemonOne: String,
    pokemonTwo: String,
    pokemonThree: String,
    pokemonFour: String
})

var User = mongoose.model("myuser", userSchema)
    module.exports = User