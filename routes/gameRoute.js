
const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require("../lib/authenticate");


router.get("/battle", ensureAuthenticated, (req, res) => 
    res.render("pages/battle", { 
        username: req.user.username
    }));

module.exports = router;