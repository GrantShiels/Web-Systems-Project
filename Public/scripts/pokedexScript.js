var Pokedex = require('pokedex-promise-v2');
var Dex = new Pokedex();
var amount = { limit: 151 }

Dex.getPokemonsList(amount)
    .then(function(response){
        console.log(response);
    })
