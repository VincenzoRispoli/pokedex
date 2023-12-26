
function showBasicStats(i) {
    let infosContainer = document.getElementById(`infos-container-features${i}`);
    infosContainer.classList.remove('d-none');
    document.getElementById(`infos-container${i}`).style.minHeight = '400px'
    setBasicStatsBorderBottom()
    infosContainer.innerHTML = /*html*/ `
    <div id="basic-stats-container${i}" class="basic-stats-container"></div>
    `;
    setBasicStatsElements(i);
}
function setBasicStatsElements(i) {
    let basicStatsContainer = document.getElementById(`basic-stats-container${i}`);
    let basicStats = currentPokemon['stats'];
    basicStatsLoop(basicStatsContainer, basicStats);
}

function basicStatsLoop(basicStatsContainer, basicStats) {
    let totalPower = 0;
    for (let i = 0; i < basicStats.length; i++) {
        let statName = basicStats[i]['stat']['name'];
        let formattedStatName = capitalizeFirstLetter(statName);
        let baseStat = basicStats[i]['base_stat'];
        totalPower += baseStat;
        barsColor = (baseStat < 50) ? 'red' : 'green';
        if (backgroundColorIsWhite()) {
            bgCardColor = '#000'
        }
        setStatNameBaseStatAndBarColors(basicStatsContainer, formattedStatName, baseStat, barsColor);
    }
    barsColor = (totalPower < 200) ? 'red' : 'green';
    setTotalPower(basicStatsContainer, totalPower, barsColor);
}

function setBasicStatsBorderBottom() {
    document.getElementById('about').style.borderBottom = '';
    document.getElementById('evolution').style.borderBottom = '';
    document.getElementById('moves').style.borderBottom = '';
    if (backgroundColorIsWhite()) {
        document.getElementById('basic-state').style.borderBottom = '3px solid #000'
    } else {
        document.getElementById('basic-state').style.borderBottom = `3px solid ${bgCardColor}`
    }
}
