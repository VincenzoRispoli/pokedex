async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

// load pokemon in the pokedex HTML function
function loadPokedexCardsHTML(i, formatName, formattedId, image) {
    return  /*html*/ `
        <div onclick="showCard(${i})" id="pokedex-card${i}" class="pokedex-card">
            <span class="name-and-id-cont">
                <h2 id="poke-name${i}" class="poke-name">${formatName}</h2>
                <span id="id${i}" class="id">#${formattedId}</span>
            </span>
            <div id="types-container${i}" class="types-container"></div>
            <div class="poke-img-cont">
                <img class="poke-img" src="${image}" alt="">
                <img class="pokemon-logo-card" src="./img/pokemon.png" alt="">
            </div>
        </div>
            `
}

// for every type container of a pokemon card, set the types
async function getPokedexCardTypes(i, currentPokemon) {
    let typeContainer = document.getElementById(`types-container${i}`);
    for (let j = 0; j < currentPokemon['types'].length; j++) {
        let type = currentPokemon['types'][j]['type']['name'];
        typeContainer.innerHTML += `
    <span id="type${j}" class="type">${type}</span>
    `
    }
}

// onclick on the pokedex card, show the dialog card
function showCardHTML(i, formattedName, formattedId, image) {
    return ( /*html*/ `
    <div onclick="previuosPokemonCard(${i}, event)" onmouseover="arrowLeftHover(${i})" onmouseleave="arrowLeftNormal(${i})" id="arrow-left-container${i}" class="arrow-left-container">
       <img id="arrow-left${i}" class="arrow-left" src="./icons/angleLeft.svg" alt="">
    </div>
        <div onclick="doNotClose(event)" id="dialog-card${i}" class="dialog-card">
                <div id="name-types-img-container${i}" class="name-types-img-container">
                    <span class="arrow-and-heart-icons-cont">
                        <img onclick="hideDialogBg()" id="arrow${i}" class="arrow" src="./icons/arrow-left-solid.svg" alt="">
                        <img onclick="showFullHeartOnClick(${i})" id="heart${i}" class="heart" src="./icons/heart-regular.svg" alt="">
                        <img onclick="showFullRegularOnClick(${i})" id="fullHeart${i}" class="heart d-none" src="./icons/heart-solid.svg" alt="">
                    </span>
                    <span class="name-and-id-cont">
                        <h2 id="poke-name-dialog-card${i}" class="poke-name-dialog-card">${formattedName}</h2>
                        <span id="dialog-id${i}" class="dialog-card-id">#${formattedId}</span>
                    </span>
                    <div id="types-card-container${i}" class="types-container"></div>
                    <div id="dialog-poke-img-container" class="dialog-poke-img-container">
                        <img class="pokemon-logo-dialog-card" src="./img/pokemon.png" alt="">
                        <img id="dialog-poke-img" class="dialog-poke-img" src="${image}" alt="">
                    </div>
                </div>
                <div onclick="doNotClose(event)" id="infos-container${i}" class="infos-container">
                    <div class="title-container">
                        <span onclick="showAbout(${i})" id="about" class="infos-title">About</span>
                        <span onclick="showBasicStats(${i})" id="basic-state" class="infos-title">Basic State</span>
                        <span onclick="evolutionChain(${i})" id="evolution" class="infos-title">Evolution</span>
                        <span onclick="moves(${i})" id="moves" class="infos-title">Moves</span>
                    </div>
                    <div id="infos-container-features${i}" class="infos-container-features d-none"></div>
                </div>
        </div>
            
        <div onclick="nextPokemonCard(${i}, event)" onmouseover="arrowRightHover(${i})" onmouseleave="arrowRightNormal(${i})" id="arrow-right-container${i}" class="arrow-right-container">
           <img id="arrow-right${i}" class="arrow-right" src="./icons/angleRight.svg" alt="">
        </div>
        `)
}
// get the types and for every `type-card-container${i}` in the dialog card,  set the types inside
function getTypesDialogCard(i) {
    let typeDialogContainer = document.getElementById(`types-card-container${i}`)
    typeDialogContainer.innerHTML = '';
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        let type = currentPokemon['types'][i]['type']['name'];
        typeDialogContainer.innerHTML += /*html*/ `
        <span id="type-dialog-card${i}" class="type-dialog-card">${type}</span>
          `
    }
    showAbout(i);
    getPokemonCardColor(i, typeDialogContainer);
}


// take the color of any pokemon and set then in every choiced dialog card------------------>
async function getPokemonCardColor(i, typeDialogContainer) {
    let card = document.getElementById(`name-types-img-container${i}`);
    let infosContainer = document.getElementById(`infos-container${i}`);
    let url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon[i]}/`;
    let response = await fetch(url);
    currentSpeciesPokemon = await response.json();
    bgCardColor = currentSpeciesPokemon['color']['name'];
    prettierCardColors();
    if (backgroundColorIsWhite()) {
        whiteBgColorFunctions(i, typeDialogContainer)
    }
    else {
        normalBgColorFunctions(i, card, infosContainer)
    }
}

// functions of About elemnts---------------------------------------------------------------->
function getShowAboutHTML(i, formattedSpecies, weight, height, formattedGender) {
    return /*html*/ `
    <div id="about-container" class="about-container">
        <div id="species-cont" class="species-cont pl-8 b-radius mb2" style="background:${bgCardColor}">
            <span class="text-white fz1">Species : </span><span class="text-white fz1"><b>${formattedSpecies}</b></span>
        </div>
        <div id="height-cont" class="height-cont pl-8 b-radius mb2" style="background:${bgCardColor}">
            <span class="text-white fz1">Height : </span><span class="text-white fz1"><b>${height} cm</b></span>
        </div>
        <div id="weight-cont" class="weight-cont pl-8 b-radius mb2" style="background:${bgCardColor}">
            <span class="text-white fz1">Weight : </span><span class="text-white fz1"><b>${weight}</b></span>
        </div>
        <div id="abilities${i}" class="abilities-cont pl-8 b-radius mb2" style="background:${bgCardColor}">
            <span class="text-white fz1">Abilities : </span>
        </div>
        <span id="breeding-title" class="breeding-title pl-8 b-radius mb2" style="border:3px solid ${bgCardColor}; color:${bgCardColor}">Breeding</span>
        <div id="gender" class="gender pl-8 b-radius mb2" style="background:${bgCardColor}">
            <span class="text-white fz1">Gender : </span> <span class="text-white">${formattedGender}</span>
        </div>
        <div id="egg-group-cont${i}" class="egg-group-cont pl-8 b-radius mb2" style="background:${bgCardColor}">
            <span class="text-white fz1">Egg Group : </span>
        </div>
        <div id="growth-rate${i}" class="growth-rate pl-8 b-radius mb2" style="background:${bgCardColor}">
            <span class="text-white fz1">Growth-Rate : </span>
        </div>
    </div>
    `
}

function setDarkBackgroundForTheAboutElements(i) {
    if (backgroundColorIsWhite()) {
        document.getElementById('species-cont').style.background = '#000';
        document.getElementById('height-cont').style.background = '#000';
        document.getElementById('weight-cont').style.background = '#000';
        document.getElementById(`abilities${i}`).style.background = '#000';
        document.getElementById('breeding-title').style.background = '#000';
        document.getElementById('breeding-title').style.border = '3px solid #000';
        document.getElementById('breeding-title').style.color = '#fff';
        document.getElementById(`gender`).style.background = '#000';
        document.getElementById(`egg-group-cont${i}`).style.background = '#000';
        document.getElementById(`growth-rate${i}`).style.background = '#000';
    }
}
//  if the background of a pokemon card in the Dialog is white, set dark text, when the client click of a card to show it;
function setInTheDialogWhiteCard_DarkText(i, typeDialogContainer) {
    document.getElementById(`name-types-img-container${i}`).style.backgroundColor = '#fff';
    document.getElementById(`poke-name-dialog-card${i}`).style.color = '#000';
    document.getElementById(`dialog-id${i}`).style.color = '#000';
    document.getElementById(`arrow${i}`).style.filter = 'invert(0)';
    document.getElementById(`heart${i}`).style.filter = 'invert(0)';
    typeDialogContainer.innerHTML = '';
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        let type = currentPokemon['types'][i]['type']['name'];
        typeDialogContainer.innerHTML += /*html*/ `
        <span id="type-dialog-card${i}" class="type-dialog-card" style="background:#000;color:#fff">${type}</span>
          `
    }
}

// set a color on the arrow for next or previous pokemon------------------------------->
function arrowLeftHover(i) {
    if (backgroundColorIsWhite()) {
        document.getElementById(`arrow-left-container${i}`).style.background = '#000';
    } else {
        document.getElementById(`arrow-left-container${i}`).style.background = bgCardColor;
    }
}

function arrowLeftNormal(i) {
    document.getElementById(`arrow-left-container${i}`).style.background = '';
}

function arrowRightHover(i) {
    if (backgroundColorIsWhite()) {
        document.getElementById(`arrow-right-container${i}`).style.background = '#000';
    } else {
        document.getElementById(`arrow-right-container${i}`).style.background = bgCardColor;
    }
}
function arrowRightNormal(i) {
    document.getElementById(`arrow-right-container${i}`).style.background = '';
}
//-------------------------------------------------------------------------------------------->

function setAbilities(i) {
    let abilitiesContainer = document.getElementById(`abilities${i}`);
    let abilities = currentPokemon['abilities'];
    for (let i = 0; i < abilities.length; i++) {
        let ability = abilities[i]['ability']['name'];
        abilitiesContainer.innerHTML += /*html*/ `
        <span class="text-white fz1"><b>${ability};</b></span>
        `
    }
}

function setEggGroup(i) {
    let eggGroupContainer = document.getElementById(`egg-group-cont${i}`);
    let eggGroups = currentSpeciesPokemon['egg_groups'];
    for (let i = 0; i < eggGroups.length; i++) {
        let eggGroup = eggGroups[i]['name'];
        eggGroupContainer.innerHTML += /*html*/ `
        <span class="text-white fz1"><b>${eggGroup};</b></span>
        `
    }
}
function setGrowthRate(i) {
    let growthRateCont = document.getElementById(`growth-rate${i}`);
    let growthRate = currentSpeciesPokemon['growth_rate']['name']
    growthRateCont.innerHTML += /*html*/ `
     <span class="text-white fz1"><b>${growthRate}</b></span>
    `
}

// end of About elements functions---------------------------------------------------------->

// start function Basic-Stats--------------------------------------------------------->
function setStatNameBaseStatAndBarColors(basicStatsContainer, formattedStatName, baseStat, barsColor) {
    basicStatsContainer.innerHTML += /*html*/ `
        <div id="stat-container" class="stat-container" style="background:${bgCardColor}">
          <span class="w45 fz1 text-white">${formattedStatName}</span> 
          <span class="w10 fz1 text-white"><b>${baseStat}</b></span>
          <span class="powerBar" style="background:${barsColor}; min-width:${baseStat}px"></span>
        </div>
        `
}
function setTotalPower(basicStatsContainer, totalPower, barsColor) {
    basicStatsContainer.innerHTML += /*html*/ `
    <div class="total-power-container" style="background:${bgCardColor}">
       <span class="total-power fwBold w45 text-white">Total Power: </span>
       <span class="fz1 w10 fwBold text-white">${totalPower}</span>
       <span class="fz1 powerBar" style="background:${barsColor};width:${totalPower / 2}px"></span>
    </div>
     `
}

// end function of Basic-Stats elements--------------------------------------------------------->

function showFullHeartOnClick(i) {
    document.getElementById(`heart${i}`).classList.add('d-none')
    document.getElementById(`fullHeart${i}`).classList.remove('d-none')
    let name = document.getElementById(`poke-name-dialog-card${i}`).innerText;
    alert('Du magst ' + name)
}

function showFullRegularOnClick(i) {
    document.getElementById(`fullHeart${i}`).classList.add('d-none')
    document.getElementById(`heart${i}`).classList.remove('d-none')
}
