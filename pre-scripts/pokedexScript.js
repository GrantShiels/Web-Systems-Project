
    const fetch = require("node-fetch");
    var Pokedex = require('pokedex-promise-v2');
    var Dex = new Pokedex();
    var amount = { limit: 151 }

    getPokedexKanto()

    //displayPokedex(pokeData)

// Dex.getPokemonsList(amount)
//     .then(function(response){
//         console.log(response);
//     })

    //get all of the first generation pokemon, aka the kanto pokemon
    function getPokedexKanto(){
        //set the limit to 151 since that is all of the origional pokemon
      fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then(function(allPokemon){
            allPokemon.results.forEach(function(pokemon){
                getEachPokemonData(pokemon);
            })
        })
    }

    //get the data for each of the 151 pokemon
    function getEachPokemonData(pokemon){
        //Saves the current pokemon url so it can be used later
        let pokeUrl = pokemon.url

        fetch(pokeUrl)
        .then(response => response.json())
        .then(function(pokeData){
            console.log(pokeData)
            displayPokedex(pokeData)
        })
    }

    //fucntion that is uses to display each of the pokemons info to the user
    function displayPokedex(pokeData){
        var currentID = `#${pokeData.id}`
        //all of the containers will be stored here
        let allPokemonContainer = document.getElementById('poke-container');

        //make a new div for each opkemon that will hold it's info
        let pokeContainer = document.createElement("div")

        //create elements for pokemon name and type etc
        let pokeName = document.createElement("h4")
        pokeName.innerText = pokeData.name

        let pokeNumber = document.createElement("p")
        pokeNumber.innerText = currentID

        //some pokemon have multiple types so will make types a lis
        let pokeTypes = document.createElement("ul")
        createTypes(pokeData.types, pokeTypes)

        //add the info of the pokemon to it's info box
        pokeContainer.append(pokeName, pokeNumber, pokeTypes);

        //add the info box to the list of all pokemon
        allPokemonContainer.appendChild(pokeContainer)

        getPokeImage(currentID, pokeContainer)
    }

    //The PokeAPI does provide some images for the pokemon, however they are small
    //and don't look very HD. So I shall use the Pokeres API to get higher quality images
    function getPokeImage(pokeID, containerDiv){

        //create new image element
        let pokeImage = document.createElement("img")
        //get the image from the ID
        pokeImage.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`
        //add the image
        containerDiv.append(pokeImage);
    }

    //function that is used to build the types list 
    function createTypes(types, ul){
        //for each type do
        types.forEach(function(type){
            //make a list item for each type
            let typeLi = document.createElement("li");
            typeLi.innerText = type["type"]["name"];
            //add the type to the list
            ul.append(typeLi);
        })
    }