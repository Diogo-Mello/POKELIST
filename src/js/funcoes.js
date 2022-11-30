var modal = document.querySelector('ion-modal');
const body = document.querySelector('body');
const pokemonList = [];
const listPokemon = document.getElementById('listPokemon');
var boolean = false;
var tipos = [];
var habilidades = [];
var statusPokemons = [];
var descricaoHabilidades = []
var peso;
var altura;
var porcentagem;
var quantidade1 = 1;

// Modal variaveis
const divPokemonImg = document.getElementById('pokemonImg')
const idModal = document.getElementById('idModal');
const imgModal = document.getElementById('imgModal');
const nomePokemon = document.getElementById('nomePokemon')
var typeModalStyle;
const tipoModal = document.getElementById('tipo');
const pesoModal = document.getElementById('peso');
const alturaModal = document.getElementById('altura');
const habilidadesModal = document.getElementById('habilidade');
const statusModal = document.getElementById('status');
const colorTypes = document.querySelectorAll('.contentGraphic, #habilidadeCard, #tipoCard, .contentPesoAltura');
const contentGraphicModalStatus = document.querySelectorAll('.graphicHP, .graphicAttack, .graphicDefense, .graphicSAttack, .graphicSDefense, .graphicSpeed');
const numbersStatusGraphic = document.querySelectorAll('#numberHPStatus, #numberAttackStatus, #numberDefenseStatus, #numberSAttackStatus, #numberSDefenseStatus, #numberSpeedStatus');


async function carregarPokemons(quantidade) {
    showLoading();
    for (let i = quantidade1; i <= quantidade ; i++) {
        let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        pokemon = await pokemon.json();
        pokemonList.push(pokemon);
    }
    closeLoading();
    mostrarPokemons();
}

function mostrarPokemons() {
    listPokemon.innerHTML = '';
    pokemonList.forEach((item, y) => {
        listPokemon.innerHTML += `
    <ion-item onclick="abrirModal(${y})">
        <ion-thumbnail slot="start">
            <img class="imagem" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${y+1}.png" />
        </ion-thumbnail>
        <ion-label class="capitalize" ">${item.name}</ion-label>
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
        colorTypes.forEach((item) => {
            item.classList.remove(typeModalStyle);
        });
        divPokemonImg.classList.remove(typeModalStyle);
        typeModalStyle = pokemonList[id].types[0].type.name;
    }

    colorTypes.forEach((item) => {
        item.classList.add(typeModalStyle);
    });
    divPokemonImg.classList.add(typeModalStyle);
    boolean = true;

    // Mudar o nome do pokémon

    nomePokemon.innerHTML = pokemonList[id].name;

    // Adicionar os tipos

    tipos = [];
    tipoModal.innerHTML = '';
    Object.keys(pokemonList[id].types).forEach((item) => {
        tipos.push(pokemonList[id].types[item].type.name);
        tipoModal.innerHTML += `<spam class="capitalize">${tipos[item]}</spam><br>`
    })

    // Adicionar as habilidades
    habilidades = [];

    habilidadesModal.innerHTML = '';
    Object.keys(pokemonList[id].abilities).forEach((item) => {
        habilidades.push(pokemonList[id].abilities[item].ability.name);
        habilidadesModal.innerHTML += `<spam class="capitalize">${habilidades[item]}</spam><br>`
    })

    // Adicionar os status

    statusPokemons = [];
    Object.keys(pokemonList[id].stats).forEach((item) => {
        statusPokemons.push(pokemonList[id].stats[item].base_stat);
    })

    numbersStatusGraphic.forEach((item, x) => {
        item.innerHTML = statusPokemons[x]
    })

    statusPorcentagem (statusPokemons);

    // Pegar peso

    peso = pokemonList[id].weight;
    pesoModal.innerHTML = `${peso.toFixed(1) / 10}Kg`;

    // Pegar altura

    altura = pokemonList[id].height;
    alturaModal.innerHTML = `${altura.toFixed(1) / 10}M`;
}

function statusPorcentagem (status) {
    contentGraphicModalStatus.forEach((item, posicao) => {
        porcentagem = (status[posicao] * 100) / 200;
        item.style.height = `${porcentagem}%`
    })
}

function carregarMais () { 
    quantidade1 += 101;
    carregarPokemons(quantidade1+100) 
}


async function showLoading() {
    const loading = await document.createElement('ion-loading');
    loading.message = 'Aguarde...';
    document.body.appendChild(loading);
    await loading.present();
}

function closeLoading() {
    const carregando = document.querySelector('ion-loading');
    carregando.remove();
};