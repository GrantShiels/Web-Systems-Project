const LocalStratagey = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

const User = require("../models/User")

module.exports = function(passport) {
    passport.use(
        new LocalStratagey({usernameField: "username"}, (username, password, done) => {
            //look for the username
            User.findOne({
                username: username
            }).then(user => {
                    if(!user) {
                        return done(null, false, {message: "User doesn't exist"});
                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;
                        if(isMatch) {
                            console.log("Password match")
                            return done(null, user);
                        } else {
                            return done(null, false, {message: "Password incorrect"});
                        }
                    });
                })
                .catch(err => console.log(err))
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}