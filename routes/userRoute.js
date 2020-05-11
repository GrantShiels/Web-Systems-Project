//used for setting up the routes for the login and regiser pages

const express = require('express');
const router = express.Router();
var bcrypt  = require('bcrypt-nodejs');
const passport = require('passport');

//user Model
const User = require("../models/User")

//render pages for the login and regiset
router.get('/login', (req, res) => res.render('pages/login'))
router.get("/register", (req, res) => res.render("pages/register"))

//post for register page
router.post("/register", (req, res) => {
    const { username, password, password2 } = req.body;
    let errors = [];

    //look to see if all the fields have data
    if (!username || !password || !password2) {
        errors.push({msg: "Fill in all fields!"});
    }
    //make sure the password is a decent length
    if (password.length < 5) {
        errors.push({msg: "Please make sure the password is longer than 5 characters!"})
    }
    //make sure the username is a decent length
    if (username.length < 5) {
        errors.push({msg: "Please use a username with at least 5 characters"})
    }
    //Check if the two passwords are the same
    if (password !== password2) {
        errors.push({msg: "The two passwords do not match"});
    }

    //if there is an error flg it
    if(errors.length > 0) {
        res.render("pages/register", {errors, username, password, password2});
    } else {
        //if there's no errors

        //Search if there's already a user
        User.findOne({ username: username})
            .then(user => {
                //there is already a user
                if(user) {
                    errors.push({ msg: "That username has been taken"})
                    res.render("pages/register", {errors, username, password, password2});
                } else {
                    const newUser = new User({
                        username, 
                        password
                    });

                    bcrypt.hash(newUser.password, null, null, function(err, hash) {
                        if (err) return next(err);
                        console.log("password hashing...");
                        ///chnage the password to the hashed version
                        newUser.password = hash;

                        //save the new user
                        newUser.save()
                            //then redirect to login page
                            .then(user => {
                                req.flash("success_msg", "Account Created!")
                                res.redirect("/user/login");

                            })
                            .catch(err => console.log(err));

                    });
                }
            });
    }
});

module.exports = router;