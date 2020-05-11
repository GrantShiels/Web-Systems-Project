const fetch = require("node-fetch");
var Pokedex = require('pokedex-promise-v2');
var Dex = new Pokedex();

//list of pokemon the user can fight, will pick a random one
const challengePokemon = [ "charizard", "snorlax", "rhyhorn", "nidoqueen","vileplume", "vaporeon", "mewtwo", "dragonite", "machamp", "magneton", "gengar", "pinsir"];

//Used for testing puprposes
//getChallengePokemon();

//Get one of the challenger pokemon and their info
function getChallengePokemon(){
    //randomly choose one of the pokemon from the list
    var challenger = challengePokemon[Math.floor(Math.random() * challengePokemon.length)];
    //add the chosen pokemon to the poke API URL
    var challengerURL = "https://pokeapi.co/api/v2/pokemon/" + challenger

    fetch(challengerURL)
        .then(response => response.json())
        .then(function(challengerData) {

            //get all of the challngers info
            var challengerID = challengerData.id;
            var challengerName = challengerData.name;
            var challengerType1 = challengerData.types[0].type.name;
            var challengerHP = challengerData.base_experience;

            //if the challneger has two types get both
            if (challengerData.types.length == 2) {
                var challengerType2 = challengerData.types[1].type.name;
            } else {
                var challengerType2 = null;
            }

            var challengerImg = "https://pokeres.bastionbot.org/images/pokemon/" + pokeID + ".png"

            console.log("ID: " + challengerID);
            console.log("Name: " + challengerName);
            console.log("Type one: " + challengerType1);
            console.log("Type two: " + challengerType2);
            console.log("HP: " +challengerHP);

        });
};

//funcion used to create a card that will display the challenegers detials
function displayChallenger() {

}