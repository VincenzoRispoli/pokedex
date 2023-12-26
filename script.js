let currentPokemon;
let currentSpeciesPokemon;
let bgCardColor;
let barsColor;
let gender;
let formattedGender;
let mainUrl = 'https://pokeapi.co/api/v2/pokemon/';
let evolutionChainUrl = 'https://pokeapi.co/api/v2/evolution-chain/'
let currentPokemonEvolution;
let pokemon = [];
let pokemonEvolutionsNames = [];
let pokemonEvolutionsImages = [];
let currentSlide = 0;
const movesPerSlide = 12;
let startFrom = 0;
let limitPokemon = 10;

// inizializzation function
async function init() {
    startFrom = 0;
    pokemon = [];
    document.getElementById('pokedex').innerHTML = '';
    // startLoadingCurtain()
    await includeHTML();
    await takeAllPokemon();
    hideStartLoadingCurtain()
    document.getElementById('load-more-poke-button').disabled = false;
}
// take all pokemon with the main link from the Api
async function takeAllPokemon() {
    let url = mainUrl + `?offset=${startFrom}&limit=${limitPokemon}`
    let response = await fetch(url);
    let allPokemon = await response.json();
    await loadPokemon(allPokemon);
    await loadPokemonInthePokedex();
}

// pick all pokemon Names from the Array allPokemon['results'] and push into the array Pokemon
async function loadPokemon(allPokemon) {
    let pokemonNames = await allPokemon['results']
    // pokemon = []; // svuoto l'array prima di caricare altri 30 pokemon, altrimenti i gia presenti 30 pokemon
    // verranno sommati ai nuovi 60 che arrivano con la funzione loadMorePokemon() e mi troverei dei doppioni nel pokedex.
    for (let i = 0; i < pokemonNames.length; i++) {
        let name = pokemonNames[i]['name'];
            pokemon.push(name);
    }
}

async function loadPokemonInthePokedex() {
    let pokedex = document.getElementById('pokedex');
    for (let i = startFrom; i < pokemon.length; i++) {
        let url = mainUrl + pokemon[i];
        let response = await fetch(url);
        currentPokemon = await response.json();
        let name = currentPokemon['name'];
        let formatName = capitalizeFirstLetter(name)
        let image = currentPokemon['sprites']['other']['dream_world']['front_default'];
        let id = (currentPokemon['id'] / 100);
        let formattedId = id.toFixed(2).replace('.', '').padStart(3, '0');
        pokedex.innerHTML += loadPokedexCardsHTML(i, formatName, formattedId, image);
        getPokedexCardTypes(i, currentPokemon);
        await getOtherPokemonInfos(i, currentPokemon);

    }
}

async function getOtherPokemonInfos(i, currentPokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon[i]}/`;
    let response = await fetch(url);
    currentSpeciesPokemon = await response.json();
    bgCardColor = currentSpeciesPokemon['color']['name'];
    prettierCardColors()
    if (backgroundColorIsWhite()) {
        setInTheWhiteCard_DarkText(i, currentPokemon)
    }
    document.getElementById(`pokedex-card${i}`).style.backgroundColor = bgCardColor;
}


// function getOtherPokemonInfos(): prendi le informazioni da species che a sua volta ha un altro url;
// quindi tramite for loop, per tutti i pokemon presenti nell'array pokemon, prendi l'url con le altre informazioni
// adesso la nuova variabile currentSpeciesPokemon conterrá il json del'url species.

// if the background of a pokemon card in the pokedex is white, set dark text when the app load
function setInTheWhiteCard_DarkText(i, currentPokemon) {
    document.getElementById(`poke-name${i}`).style.color = '#000';
    document.getElementById(`id${i}`).style.color = '#000';
    let typesContainer = document.getElementById(`types-container${i}`);
    typesContainer.innerHTML = '';
    for (let j = 0; j < currentPokemon['types'].length; j++) {
        let type = currentPokemon['types'][j]['type']['name'];
        typesContainer.innerHTML += `
        <span id="type${j}" class="type" style="background:#000; color:#fff;">${type}</span>
        `
    }
}
async function loadMorePokemon(event) {
    if(startFrom == 0){
        startFrom = pokemon.length;
    } else{
        startFrom += 10;
    }
    showLoadingMorePokemonCurtain();
    await takeAllPokemon();
    hideLoadingMorePokemonCurtain();
    event.preventDefault();
}

// Searching Pokemon Functions ---------------------------------------------->
async function takeSearchedPokemon() {
    let input = document.getElementById('input').value;
    input = input.toLowerCase();
    let pokedex = document.getElementById('pokedex');
    pokedex.innerHTML = '';
    renderSearchedPokemon(pokedex, input)
}

async function renderSearchedPokemon(pokedex, input) {
    for (let i = 0; i < pokemon.length; i++) {
        let url = mainUrl + pokemon[i];
        let response = await fetch(url);
        currentPokemon = await response.json();
        let name = currentPokemon['name'];
        let formatName = capitalizeFirstLetter(name)
        let image = currentPokemon['sprites']['other']['dream_world']['front_default'];
        let id = (currentPokemon['id'] / 100);
        let formattedId = id.toFixed(2).replace('.', '').padStart(3, '0');
        if (name.toLowerCase().includes(input)) {
            pokedex.innerHTML = loadPokedexCardsHTML(i, formatName, formattedId, image);
            await getTypesOfTheSearchedPokemon(i, currentPokemon);
            await getColorInTheSearchedPokemon(i, currentPokemon);
        }
    }
    document.getElementById('load-more-poke-button').disabled = true

}

async function getTypesOfTheSearchedPokemon(i, currentPokemon) {
    let typeSearchedPokeContainer = document.getElementById(`types-container${i}`);
    for (let j = 0; j < currentPokemon['types'].length; j++) {
        let type = currentPokemon['types'][j]['type']['name'];
        typeSearchedPokeContainer.innerHTML += `
        <span id="type${j}" class="type">${type}</span>
        `
    }
}

async function getColorInTheSearchedPokemon(i, currentPokemon) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon[i]}/`
    let response = await fetch(url);
    let searchedSpeciesPokemon = await response.json();
    bgCardColor = searchedSpeciesPokemon['color']['name'];
    prettierCardColors();
    if (backgroundColorIsWhite()) {
        setInTheWhiteSearchedPokemonCard_DarkText(i, currentPokemon)
    }
    document.getElementById(`pokedex-card${i}`).style.background = bgCardColor
}

function setInTheWhiteSearchedPokemonCard_DarkText(i, currentPokemon) {
    document.getElementById(`id${i}`).style.color = '#000';
    document.getElementById(`poke-name${i}`).style.color = '#000';
    let typeSearchedPokeContainer = document.getElementById(`types-container${i}`);
    typeSearchedPokeContainer.innerHTML = '';
    for (let j = 0; j < currentPokemon['types'].length; j++) {
        let type = currentPokemon['types'][j]['type']['name'];
        typeSearchedPokeContainer.innerHTML += `
        <span id="type${j}" class="type" style="background: #000; color:#fff">${type}</span>
        `
    }
}
function checkInput() {
    let input = document.getElementById('input').value;
    let inputButton = document.getElementById('input-button');
    if (input > '') {
        inputButton.disabled = false; // riabilita il button di ricerca se l'input ha un valore maggiore di 0;
    }
}

function backToAllPokemon(){
    document.getElementById('pokedex').innerHTML = '';
    startFrom = 0;
    loadPokemonInthePokedex();
    document.getElementById('load-more-poke-button').disabled = false;
}

// End Searching Pokemon Functions --------------------------------------------------->

// function show Card in the Dialog Background
async function showCard(i) {
    let dialogCard = document.getElementById('dialog-bg');
    dialogCard.classList.remove('d-none');
    let url = mainUrl + pokemon[i];
    let response = await fetch(url);
    currentPokemon = await response.json();
    let name = currentPokemon['name'];
    let formattedName = capitalizeFirstLetter(name)
    let image = currentPokemon['sprites']['other']['dream_world']['front_default']
    let id = currentPokemon['id'] / 100;
    let formattedId = id.toFixed(2).replace('.', '').padStart(3, '0');
    dialogCard.innerHTML = showCardHTML(i, formattedName, formattedId, image);
    getTypesDialogCard(i);
}

function whiteBgColorFunctions(i, typeDialogContainer) {
    setInTheDialogWhiteCard_DarkText(i, typeDialogContainer);
    setDarkBackgroundForTheAboutElements(i);
    setAboutBorderBottom()
}

function normalBgColorFunctions(i, card, infosContainer) {
    card.style.background = bgCardColor
    infosContainer.style.border = `2px solid ${bgCardColor}`
    setBgColorsForTheShowAboutElements(i);
    setAboutBorderBottom()
}

function setBgColorsForTheShowAboutElements(i) {
    document.getElementById('species-cont').style.background = bgCardColor;
    document.getElementById('height-cont').style.background = bgCardColor;
    document.getElementById('weight-cont').style.background = bgCardColor;
    document.getElementById(`abilities${i}`).style.background = bgCardColor;
    document.getElementById('breeding-title').style.border = `3px solid ${bgCardColor}`;
    document.getElementById('breeding-title').style.color = bgCardColor;
    document.getElementById('gender').style.background = bgCardColor;
    document.getElementById(`egg-group-cont${i}`).style.background = bgCardColor;
    document.getElementById(`growth-rate${i}`).style.background = bgCardColor;
}

function nextPokemonCard(i, event) {
    i++;
    if (i >= pokemon.length) {
        i = 0;
    }
    showCard(i);
    event.stopPropagation();
}

function previuosPokemonCard(i, event) {
    i--;
    if (i < 0) {
        i = pokemon.length - 1;
    }
    showCard(i);
    event.stopPropagation();
}

// hide the dialog onclick on background
function hideDialogBg() {
    document.getElementById('dialog-bg').classList.add('d-none')
}

function doNotClose(event) {
    event.stopPropagation();
}

// make the default colors of any pokemon, prettier
function prettierCardColors() {
    bgCardColor = (bgCardColor === 'blue') ? '#3581fc' : bgCardColor;
    bgCardColor = (bgCardColor === 'red') ? '#fc4f38' : bgCardColor;
    bgCardColor = (bgCardColor === 'green') ? '#02d66c' : bgCardColor;
    bgCardColor = (bgCardColor === 'brown') ? '#bf4d1d' : bgCardColor;
    bgCardColor = (bgCardColor === 'yellow') ? '#dbc602' : bgCardColor;
    bgCardColor = (bgCardColor === 'purple') ? '#fa5aed' : bgCardColor;
    bgCardColor = (bgCardColor === 'pink') ? '#deadde' : bgCardColor;

}

function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
}

function hideEvolutionCurtain(event) {
    document.getElementById('evolutions-curtain').classList.add('d-none');
    event.preventDefault();
}

function buttonHover() {
    document.getElementById('curtain-button').style.background = '#fff';
    document.getElementById('curtain-button').style.color = bgCardColor;
}
function buttonNormal() {
    document.getElementById('curtain-button').style.background = ''
    document.getElementById('curtain-button').style.color = '';
}

function buttonHoverBlack() {
    document.getElementById('curtain-button').style.background = '#000';
    document.getElementById('curtain-button').style.color = bgCardColor;
}
function buttonNormalBlack() {
    document.getElementById('curtain-button').style.background = 'rgba(0,0,0,0.5)';
    document.getElementById('curtain-button').style.color = bgCardColor;
}

function startLoadingCurtain() {
    let loadingCurtain = document.getElementById('loading-courtain-background');
    loadingCurtain.classList.remove('d-none');
}

function hideStartLoadingCurtain() {
    let loadingCurtain = document.getElementById('loading-courtain-background');
    loadingCurtain.classList.add('d-none');
}


function showLoadingMorePokemonCurtain() {
    let loadingMorePokeCurtain = document.getElementById('loading-more-poke-courtain');
    loadingMorePokeCurtain.classList.remove('d-none');
}

function hideLoadingMorePokemonCurtain() {
    let loadingMorePokeCurtain = document.getElementById('loading-more-poke-courtain');
    loadingMorePokeCurtain.classList.add('d-none');
}

function showArrowOnClick(i) {
    document.getElementById(`arrow-left-container${i}`).classList.remove('d-none');
    document.getElementById(`arrow-right-container${i}`).classList.remove('d-none');
    document.getElementById(`arrow-left${i}`).classList.remove('d-none');
    document.getElementById(`arrow-right${i}`).classList.remove('d-none')
    setTimeout(hideArrowFromTheDialog(i), 2000)
}

function hideArrowFromTheDialog(i) {
    document.getElementById(`arrow-left-container${i}`).classList.add('d-none');
    document.getElementById(`arrow-right-container${i}`).classList.add('d-none');
    document.getElementById(`arrow-left${i}`).classList.add('d-none');
    document.getElementById(`arrow-right${i}`).classList.add('d-none')
}

function backgroundColorIsWhite() {
    return bgCardColor == 'white'
}

