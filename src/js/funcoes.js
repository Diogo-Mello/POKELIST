var modal = document.querySelector('ion-modal');
const body = document.querySelector('body');
const pokemonList = [];
const listPokemon = document.getElementById('listPokemon');
var boolean = false;

// Modal variaveis
const divPokemonImg = document.getElementById('pokemonImg')
const idModal = document.getElementById('idModal');
const imgModal = document.getElementById('imgModal');
const nomePokemon = document.getElementById('nomePokemon')
var typeModalStyle;


async function carregarPokemons() {
    showLoading();
    for (let i = 1; i <= 20; i++) {
        let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        pokemon = await pokemon.json();
        pokemonList.push(pokemon);
    }
    closeLoading();
    console.log(pokemonList);
    mostrarPokemons();
}

function mostrarPokemons() {
    pokemonList.forEach((item, y) => {
        listPokemon.innerHTML += `
    <ion-item onclick="abrirModal(${y})">
        <ion-thumbnail slot="start">
            <img alt="Silhouette of mountains" class="imagem" src="${item.sprites.other.dream_world.front_default}" />
        </ion-thumbnail>
        <ion-label style="text-transform:capitalize;">${item.name}</ion-label>
    </ion-item>
    `
    })
}

function abrirModal (id) {

    idModal.innerHTML = pokemonList[id].id;
    imgModal.setAttribute('src', pokemonList[id].sprites.other.dream_world.front_default);

    if(!boolean) {
        typeModalStyle = pokemonList[id].types[0].type.name;
    } else {
        divPokemonImg.classList.remove(typeModalStyle);
        typeModalStyle = pokemonList[id].types[0].type.name;
    }
    divPokemonImg.classList.add(typeModalStyle);

    nomePokemon.innerHTML = pokemonList[id].name;
    

    modal.isOpen = true;

    
    
    boolean = true;
}












async function showLoading() {
    const loading = await document.createElement('ion-loading');
    loading.message = 'Carregando';
    // loading.duration = 2000;
    document.body.appendChild(loading);
    await loading.present();
}

function closeLoading() {
    const carregando = document.querySelector('ion-loading');
    carregando.remove();
}

// Lista do que precisa aparecer como caminhos
// Nome: pokemonList[1].name
// Imagem: 
// ID: pokemonList[1].id