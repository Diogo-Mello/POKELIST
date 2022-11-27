var modal = document.querySelector('ion-modal');
const body = document.querySelector('body');
const pokemonList = [];
const listPokemon = document.getElementById('listPokemon');
var boolean = false;
var tipos = [];
var ataques = [];
var statusPokemons = [];
var peso;
var altura;

// Modal variaveis
const divPokemonImg = document.getElementById('pokemonImg')
const idModal = document.getElementById('idModal');
const imgModal = document.getElementById('imgModal');
const nomePokemon = document.getElementById('nomePokemon')
var typeModalStyle;
const tipoModal = document.getElementById('tipo');
const pesoModal = document.getElementById('peso');
const alturaModal = document.getElementById('altura');
const ataquesModal = document.getElementById('ataques');
const statusModal = document.getElementById('status');


async function carregarPokemons() {
    showLoading();
    for (let i = 1; i <= 100; i++) {
        let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        pokemon = await pokemon.json();
        pokemonList.push(pokemon);
    }
    closeLoading();
    mostrarPokemons();
}

function mostrarPokemons() {
    pokemonList.forEach((item, y) => {
        listPokemon.innerHTML += `
    <ion-item onclick="abrirModal(${y})">
        <ion-thumbnail slot="start">
            <img alt="Silhouette of mountains" class="imagem" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${y+1}.png" />
        </ion-thumbnail>
        <ion-label style="text-transform:capitalize; ">${item.name}</ion-label>
    </ion-item>
    `
    })
}

function abrirModal (id) {
    tratarDados(id);
    modal.isOpen = true;
}

function tratarDados (id) {
    // Mudar o ID
    idModal.innerHTML = pokemonList[id].id;

    // Mudar a foto
    imgModal.setAttribute('src', pokemonList[id].sprites.other.dream_world.front_default);

    // Mudar a cor 
    if(!boolean) {
        typeModalStyle = pokemonList[id].types[0].type.name;
    } else {
        divPokemonImg.classList.remove(typeModalStyle);
        typeModalStyle = pokemonList[id].types[0].type.name;
    }
    divPokemonImg.classList.add(typeModalStyle);
    boolean = true;

    // Mudar o nome do pokémon
    nomePokemon.innerHTML = pokemonList[id].name;

    // Adicionar os tipos
    tipos = [];
    tipoModal.innerHTML = '';
    Object.keys(pokemonList[id].types).forEach((item) => {
        tipos.push(pokemonList[id].types[item].type.name);
        tipoModal.innerHTML += `<spam>${tipos[item]}</spam><br>`
    })

    // Adicionar os ataques
    ataques = [];
    ataquesModal.innerHTML = '';
    Object.keys(pokemonList[id].moves).forEach((item) => {
        ataques.push(pokemonList[id].moves[item].move.name);
        ataquesModal.innerHTML += `<spam>${ataques[item]}</spam><br>`
    })

    // Adicionar os status
    statusPokemons = [];
    statusModal.innerHTML = '';
    Object.keys(pokemonList[id].stats).forEach((item) => {
        statusPokemons.push({
            baseStatus: pokemonList[id].stats[item].base_stat,
            status: pokemonList[id].stats[item].stat.name
        });
        statusModal.innerHTML += `<spam>${statusPokemons[item].status}: ${statusPokemons[item].baseStatus}</spam><br>`
    })

    // Pegar peso
    peso = pokemonList[id].weight;
    pesoModal.innerHTML = peso;

    // Pegar altura
    altura = pokemonList[id].height;
    alturaModal.innerHTML = altura;
    



    
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
// Tipos:
