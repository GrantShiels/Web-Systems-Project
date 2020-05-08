

//Test script for playing around with pokemon api
const fetch = require("node-fetch")
var Pokedex = require('pokedex-promise-v2');
var Dex = new Pokedex();
var amount = { limit: 151 }

Dex.getPokemonsList(amount)
    .then(function(response) {
        console.log(response)
    })



// fetchKantoPokemon()
// //Will get the first generation of pokemon only
// function fetchKantoPokemon(){
//     fetch('https://pokeapi.co/api/v2/pokemon?limit=1')
//         .then(response => response.json())
//         .then(function(allpokemon){
//             allpokemon.results.forEach(function(pokemon){
//                 fetchPokemonData(pokemon);
//             })
//         })
// }

// //Will get the data for each of the pokemon
// function fetchPokemonData(pokemon){
//     let url = pokemon.url

//     fetch(url)

//     .then(response => response.json())
//     .then(function(pokeData){
//         console.log(pokeData)
//     })
// }


// function renderPokemon(pokeData){
//     let allPok
// }