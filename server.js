const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8009



express()
  .use(express.static(path.join(__dirname, 'Public')))
  .set('views', path.join(__dirname, 'views'))
  .set('scripts', path.join(__dirname, 'scripts'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/pokedex', (req, res) => res.render('pages/pokedex'))
  .get('/login', (req, res) => res.render('pages/login'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))