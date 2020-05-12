
const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require("../lib/authenticate");


router.get("/battle", ensureAuthenticated, (req, res) => 
    res.render("pages/battle", { 
        username: req.user.username
    }));
router.get("/*", (req, res) => res.redirect('/'));

module.exports = router;