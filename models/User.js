//model for the user 

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt  = require('bcrypt-nodejs');

//Scheem build from username, password and four fav pokemon
var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true}},
    password: { type: String, required: true, select: false },
    pokemonOne: String,
    pokemonTwo: String,
    pokemonThree: String,
    pokemonFour: String
});

//hash the users password before saving for security
UserSchema.pre("save", function(next) {
    console.log("Pre Saving user")

    var user = this;
    //has the password only if it's a new user or it's being changed
    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) return next(err);
        console.log("password hashing...");
        ///chnage the password to the hashed version
        user.password = hash;
        next();
        console.log("Password hashed")
        
    });
});

UserSchema.methods.comparePasswords = function(password) {
    var user = this;

    return bcrypt.compareSync.model("User", UserSchema);
};

module.exports = mongoose.model("User", UserSchema);