
function showAbout(i) {
    let infosContainer = document.getElementById(`infos-container-features${i}`);
    infosContainer.classList.remove('d-none');
    let species = currentSpeciesPokemon['shape']['name'];
    let formattedSpecies = capitalizeFirstLetter(species);
    let height = currentPokemon['height'] * 10;
    let weight = currentPokemon['weight'] / 10 + ' kg';
    gender = currentSpeciesPokemon['gender_rate'];
    formatGender(gender);
    infosContainer.innerHTML = getShowAboutHTML(i, formattedSpecies, weight, height, formattedGender)
    setDarkBackgroundForTheAboutElements(i)
    setAboutBorderBottom()
    setAbilities(i);
    setEggGroup(i);
    setGrowthRate(i);
}

function formatGender(gender){
 if(gender == 4){formattedGender = '<div class="gendersContainer"><span class="maleContainer"><img class="genderIcon" src="./icons/mars-solid.svg" alt=""> <span class="male">90%</span></span><span class="femaleContainer"><img class="genderIcon" src="./icons/venus-solid.svg" alt=""> <span class="female">10%</span></span></div>'}
 if(gender == 3){formattedGender = '<div class="gendersContainer"><span class="maleContainer"><img class="genderIcon" src="./icons/mars-solid.svg" alt=""> <span class="male">80%</span></span><span class="femaleContainer"><img class="genderIcon" src="./icons/venus-solid.svg" alt=""> <span class="female">20%</span></span></div>'}
 if(gender == 2){formattedGender = '<div class="gendersContainer"><span class="maleContainer"><img class="genderIcon" src="./icons/mars-solid.svg" alt=""> <span class="male">60%</span></span><span class="femaleContainer"><img class="genderIcon" src="./icons/venus-solid.svg" alt=""> <span class="female">40%</span></span></div>'}
 if(gender == 1){formattedGender = '<div class="gendersContainer"><span class="maleContainer"><img class="genderIcon" src="./icons/mars-solid.svg" alt=""> <span class="male">50%</span></span><span class="femaleContainer"><img class="genderIcon" src="./icons/venus-solid.svg" alt=""> <span class="female">50%</span></span></div>'}
}
// remove the border bottom color from other options(basic-state, evolution and moves), then set
// the border bottom color on the About button. 
function setAboutBorderBottom() {
    document.getElementById('basic-state').style.borderBottom = '';
    document.getElementById('evolution').style.borderBottom = '';
    document.getElementById('moves').style.borderBottom = '';
    if (backgroundColorIsWhite()) {
        document.getElementById('about').style.borderBottom = '3px solid #000'
    } else {
        document.getElementById('about').style.borderBottom = `3px solid ${bgCardColor}`
    }
}