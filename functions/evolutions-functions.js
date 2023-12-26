async function evolutionChain() {
    let url = currentSpeciesPokemon['evolution_chain']['url'];
    let response = await fetch(url);
    currentPokemonEvolution = await response.json();
    console.log(currentPokemonEvolution);
    if (theAreThreeEvolutions(currentPokemonEvolution)) {
        takeAll3PokeNameAndPushInArray();
    } else {
        takeAll2PokeNameAndPushInArray();
    }
    await getPokemonEvolutionsImages();
    await displayEvolutionNamesAndImages()
}

function theAreThreeEvolutions(currentPokemonEvolution) {
    return (currentPokemonEvolution['chain'] &&
        currentPokemonEvolution['chain']['species'] &&
        currentPokemonEvolution['chain']['evolves_to'] &&
        currentPokemonEvolution['chain']['evolves_to'][0] &&
        currentPokemonEvolution['chain']['evolves_to'][0]['species'] &&
        currentPokemonEvolution['chain']['evolves_to'][0]['evolves_to'] &&
        currentPokemonEvolution['chain']['evolves_to'][0]['evolves_to'][0] &&
        currentPokemonEvolution['chain']['evolves_to'][0]['evolves_to'][0]['species'])
}

function takeAll3PokeNameAndPushInArray() {
    littlePokeName = currentPokemonEvolution['chain']['species']['name'];
    middlePokeName = currentPokemonEvolution['chain']['evolves_to'][0]['species']['name'];
    lastEvolutionPokeName = currentPokemonEvolution['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];
    pokemonEvolutionsNames = []
    pokemonEvolutionsNames.push(littlePokeName);
    pokemonEvolutionsNames.push(middlePokeName);
    pokemonEvolutionsNames.push(lastEvolutionPokeName);
}
function takeAll2PokeNameAndPushInArray() {
    littlePokeName = currentPokemonEvolution['chain']['species']['name'];
    middlePokeName = currentPokemonEvolution['chain']['evolves_to'][0]['species']['name'];
    pokemonEvolutionsNames = [];
    pokemonEvolutionsNames.push(littlePokeName);
    pokemonEvolutionsNames.push(middlePokeName);
}

async function getPokemonEvolutionsImages() {
    pokemonEvolutionsImages = []; // svuota l´array fuori dal loop prima di ciclare le immagini dei pokemon dentro il container. Altrimenti 
    // troverai nell'array pokemonEvolutionsImages, non solo i tre pokemon interessati, ma anche quelli 
    // che sono stati precedentemente selezionati
    for (let i = 0; i < pokemonEvolutionsNames.length; i++) {
        let url = mainUrl + pokemonEvolutionsNames[i];
        let response = await fetch(url);
        currentPokemonEvolution = await response.json();
        let evolutionImage = currentPokemonEvolution['sprites']['other']['dream_world']['front_default'];
        pokemonEvolutionsImages.push(evolutionImage)
    }
}

async function displayEvolutionNamesAndImages() {
    let evolutionsContainer = document.getElementById('evolutions-curtain');
    evolutionsContainer.classList.remove('d-none');
    setEvolutionBorderBottom();
    evolutionsContainer.style.background = bgCardColor;
    evolutionsContainer.innerHTML = '';
    if (backgroundColorIsWhite()) {
        setDarkButtonAndHover(evolutionsContainer);
    } else {
        setNormalButtonAndHover(evolutionsContainer);
    }
    setEvolutionsCardsAndButtonContainer();
}

function setDarkButtonAndHover(evolutionsContainer) {
    evolutionsContainer.innerHTML += /*html*/ `
    <div id="evolutions-card-and-button-container" class="evolutions-card-and-button-container">
        </div>
        <a onmouseover="buttonHoverBlack()" onmouseleave="buttonNormalBlack()" id="curtain-button" onclick="hideEvolutionCurtain(event)" class="close-curtain-button" style="background:rgba(0,0,0,0.5)" href="">Back to Card</a>
    `
}
function setNormalButtonAndHover(evolutionsContainer) {
    evolutionsContainer.innerHTML += /*html*/ `
    <div id="evolutions-card-and-button-container" class="evolutions-card-and-button-container">
    </div>
    <a onmouseover="buttonHover()" onmouseleave="buttonNormal()" onclick="hideEvolutionCurtain(event)" id="curtain-button" class="close-curtain-button" href="">Back to Card</a>
    `
}
function setEvolutionsCardsAndButtonContainer() {
    let evoCardAndButtonContainer = document.getElementById('evolutions-card-and-button-container');
    for (let i = 0; i < pokemonEvolutionsNames.length; i++) {
        let name = pokemonEvolutionsNames[i];
        let formattedName = capitalizeFirstLetter(name)
        let image = pokemonEvolutionsImages[i];
        if (backgroundColorIsWhite()) {
            setPokeNameWithDarkText(formattedName, image, evoCardAndButtonContainer);
        } else {
            setPokeNameWithNormalText(formattedName, image, evoCardAndButtonContainer);
        }
    }
}

function setPokeNameWithDarkText(formattedName, image, evoCardAndButtonContainer) {
    evoCardAndButtonContainer.innerHTML += /*html*/ `
            <div class="name-and-img-evolution-container">
                <img class="evolution-image" src="${image}" alt="">
                <span class="evolution-name" style="color:#000">${formattedName}</span>
            </div>`
}

function setPokeNameWithNormalText(formattedName, image, evoCardAndButtonContainer) {
    evoCardAndButtonContainer.innerHTML += /*html*/ `
    <div class="name-and-img-evolution-container">
        <img class="evolution-image" src="${image}" alt="">
        <span class="evolution-name" style="color:#fff">${formattedName}</span>
    </div>
    `
}

function setEvolutionBorderBottom() {
    document.getElementById('about').style.borderBottom = '';
    document.getElementById('moves').style.borderBottom = '';
    document.getElementById('basic-state').style.borderBottom = '';
    if (backgroundColorIsWhite()) {
        document.getElementById('evolution').style.borderBottom = '3px solid #000'
    } else {
        document.getElementById('evolution').style.borderBottom = `3px solid ${bgCardColor}`
    }
}