// const poke_container = document.getElementById('poke_container');


add_poke = ''

function processPokeResp(pokemon) {
    //console.log(pokemon);
    const upperCaseName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    add_poke += `
    <div class="image_container">
    ${upperCaseName} 
    <a href="/profile/${pokemon.id}">
    <img src="${pokemon.sprites.other["official-artwork"].front_default}">
    </a>
    </div>`
}

async function ninePokemons() {
    for (i = 1; i <= 9; i++) {
        if (i % 3 == 1) {
            add_poke += `<div class = "pokemon_images">`
        }

        random = Math.floor(Math.random() * 898) + 1

        await $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${random}`,
            success: processPokeResp
        })

        if (i % 3 == 0) {
            add_poke += `</div>`
        }
    }
    jQuery("main").html(add_poke);
}


function setup() {
    ninePokemons();
}


$(document).ready(setup);
// const fetchPokemon = async () => {
//     let i = Math.floor(Math.random() * 898) + 1; //randomly generates a number between 1 - 898. There are only 898 pokemon in this API.
//     console.log(i);
//     getPokemon(i);
// }

// const getPokemon = async id => {
//     const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
//     const res = await fetch(url);
//     const pokemon = await res.json();
//     createCard(pokemon);
// }


// fetchPokemon();

// function createCard(pokemon) {
//     const pokemonElement = document.createElement('div');
//     pokemonElement.classList.add('pokemon');

//     const upperCaseName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

//     const pokemonInnerHTML = `
//     <div class = "img-container"> 
//     <img src = "${pokemon.sprites['front_default']}"/>
//     </div>
//     <div class = "info">
//         <h2 class = "name">${upperCaseName}</h2>

//     `;


//     pokemonElement.innerHTML = pokemonInnerHTML;

//     poke_container.appendChild(pokemonElement)
// }