type_g = "";
storage = "";

function processPokemonResp2(resp) {
    console.log(resp);
    $("main").append("<p>" +resp.name + "</p>")
    $("main").append(`<img src="${resp.sprites.other["official-artwork"].front_default}">`)
}

function processPokemonResp(resp) {
    for (i = 0; i < resp.pokemon.length; i++)
        $.ajax({
            type: "get",
            url: resp.pokemon[i].pokemon.url,
            success: processPokemonResp2
        })

    
}

function processPokeRegion(data) {
    storage = data.results;
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
}

$(document).ready(setup)