type_g = "";
storage = "";

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

function processPokemonResp2(data) {
    $("main").append(`
    <div class="card">
    <a href="/profile/${data.id}">
    <img src="${data.sprites.other["official-artwork"].front_default}"></a>
    ${data.name}</div>`)
}

function processPokemonResp(data) {
    for (i = 0; i < data.pokemon.length; i++)
        $.ajax({
            type: "get",
            url: data.pokemon[i].pokemon.url,
            success: processPokemonResp2
        })
}

function processPokeRegion(data) {
    storage = data.results;
    console.log(data);
    for (i = 0; i < data.results.length; i++) {
        $("main").append(`
        <div class="card">
        <a href = "/profile/${getID(data.results[i].url)}">
        <div>${data.results[i].name}</div>
        <img src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getID(data.results[i].url)}.png"> </a>
        </div>
        `)

    }
}

function searchPokemon() {
    searchInput = $("#pokemonName").val().toLowerCase()
    console.log(searchOnePokemon);
    $.ajax({
        type:"GET",
        url:`https://pokeapi.co/api/v2/pokemon/${searchInput}`,
        success: searchOnePokemon
    })
    $("main").empty()
}

function searchOnePokemon(data) {
    $("main").append(`
        <div class="card">
            <div> ${data.id}</div>
            <img src="${data.sprites.other["official-artwork"].front_default}">
        </div>
    `)
    getHistory(data);
}

function getHistory(data) {
    $('#history').append(`
            <div>
                <a href="../profile/${data.id}">${data.name}</a>
            </div>
            `)
}

function getID(url) {
    return url.split(`pokemon/`)[1].split(`/`)[0]
}

function display(type_) {
    // how to grab "type" of pokemon
    $("main").empty()
    type_g = type_
    $.ajax({
        type: "get",
        url: `https://pokeapi.co/api/v2/type/${type_}`,
        success: processPokemonResp
    })
}

function displayRegion(start, end) {
    $("main").empty()
    $.ajax({
        type: "get",
        url: `https://pokeapi.co/api/v2/pokemon/?limit=${end}&offset=${start}`,
        success: processPokeRegion
    })
}


function setup() {
    // display grass pokemon
    display($("#pokemon_type option:selected").val())
    $("#pokemon_type").change(() => {
        pokemon_type = $("#pokemon_type option:selected").val();
    display($("#pokemon_type option:selected").val())
    })

    $("#region").change(() => {
        pokeregion = $("#region option:selected").val();
        switch (pokeregion) {
            case 'kanto':
                displayRegion(1, 151)
                break;
            case 'johto':
                displayRegion(152, 251)
                break
            case 'hoenn':
                displayRegion(252, 386)
                break
            case 'sinnoh':
                displayRegion(387, 494)
                break
            case 'unova':
                displayRegion(495, 649)
                break
            case 'kalos':
                displayRegion(650, 721)
                break
            case 'alola':
                displayRegion(722, 809)
                break
            case 'galar':
                displayRegion(810, 898)
                break
            default:
                console.log('This shouldnt happen')
                break
        }
    })

    $("#searchPokemon").click(() => {
        searchPokemon();
    })
}

$(document).ready(setup)