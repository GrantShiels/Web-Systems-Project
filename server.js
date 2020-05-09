var express = require('express')
var app     = express()
const PORT = process.env.PORT || 8009

var port = PORT;
app.get('/', (req, res) => res.render('pages/index'))

app.listen(PORT)
console.log("express server runing at".PORT)
