function moves(i) {
    let infosContainer = document.getElementById(`infos-container-features${i}`);
    infosContainer.classList.remove('d-none');
    document.getElementById(`infos-container${i}`).style.minHeight = '400px'
    setMovesBorderBottom()
    if (backgroundColorIsWhite()) {
        bgCardColor = '#000';
    }
    setColorOfMovesButtons(infosContainer);
    showMoves(currentSlide);
}

function setColorOfMovesButtons(infosContainer) {
    infosContainer.innerHTML = /*html*/`
        <div class="buttons-container">
            <a id="change-slide-button1" class="change-slide-button" onclick="changeSlide(-1)" style="background:${bgCardColor}">Previous Moves</a>
            <a id="change-slide-button2" class="change-slide-button" onclick="changeSlide(+1)" style="background:${bgCardColor}">Next Moves</a>
        </div>
        <div id="moves-container" class="moves-container"></div>
        `
}

function showMoves(slideIndex) {
    let movesCont = document.getElementById('moves-container');
    movesCont.innerHTML = '';
    for (let i = slideIndex * movesPerSlide; i < Math.min(currentPokemon['moves'].length, (slideIndex + 1) * movesPerSlide); i++) {
        let move = currentPokemon['moves'][i]['move']['name'];
        movesCont.innerHTML += /*html*/ `
                <div class="move-wrapper" style="background:${bgCardColor};">
                    <b class="moves" style="color:#fff">${move}</b>
                </div>
            `;
    }
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) {
        currentSlide = Math.floor(currentPokemon['moves'].length / movesPerSlide) - 1;
    } else if (currentSlide >= Math.floor(currentPokemon['moves'].length / movesPerSlide)) {
        currentSlide = 0;
    }
    showMoves(currentSlide);
}
function setMovesBorderBottom() {
    document.getElementById('about').style.borderBottom = '';
    document.getElementById('evolution').style.borderBottom = '';
    document.getElementById('basic-state').style.borderBottom = '';
    if (backgroundColorIsWhite()) {
        document.getElementById('moves').style.borderBottom = '3px solid #000';
    } else {
        document.getElementById('moves').style.borderBottom = `3px solid ${bgCardColor}`
    }
}