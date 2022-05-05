add_poke = ''

const cardColors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#F4e7da',
    rock: 'd5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#98b3e6',
    psychic: '#eaeda1',
    flying: 'F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};

function processPokeResp(pokemon) {
    const upperCaseName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    add_poke += `<div class="pokemon_container"><a href="/profile/${pokemon.id}"><img src="${pokemon.sprites.other["official-artwork"].front_default}"> </a>${upperCaseName} </div>`
}

async function ninePokemons() {
    for (i = 1; i <= 9; i++) {
        if (i % 3 == 1) {
            add_poke += `<div class ="pokemon_images">`
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