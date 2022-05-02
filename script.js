const poke_container = document.getElementById('poke_container');
const number_of_pokemon = 150;

const fetchPokemon = async () => {
    let i = Math.floor(Math.random() * 898) + 1;
    console.log(i);
    getPokemon(i);
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createCard(pokemon);
}


fetchPokemon();

function createCard(pokemon) {
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');

    const upperCaseName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    const pokemonInnerHTML = `
    <div class = "img-container"> 
    <img src = "${pokemon.sprites['front_default']}"/>
    </div>
    <div class = "info">
        <h2 class = "name">${upperCaseName}</h2>

    `;


    pokemonElement.innerHTML = pokemonInnerHTML;

    poke_container.appendChild(pokemonElement)
}
