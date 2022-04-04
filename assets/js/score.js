var finalScore = window.sessionStorage.getItem("FinalScore");

//alert("Your final score is: " + finalScore);
window.sessionStorage.removeItem("FinalScore");

const scoresStorageKey = "JSGauntletScores";

const scoreTableElement = document.querySelector("#score-table-body") // Technically this is just the body of the table, but this is where we add our data.
const initialsInputElement = document.querySelector("#initials-input");
const clearScoresButtonElement = document.querySelector("#clear-scores");

var scoreTableEntries = [];

function addToScoreTable(initials, score)
{
    var newItem = document.createElement("div");
    var newItemInitials = document.createElement("div");
    var newItemScore = document.createElement("div");

    newItem.classList.add("score-table-row");
    newItemInitials.classList.add("score-table-row-cell");
    newItemScore.classList.add("score-table-row-cell");

    newItemInitials.textContent = initials;
    newItemScore.textContent = score;

    newItem.appendChild(newItemInitials);
    newItem.appendChild(newItemScore);
    scoreTableElement.appendChild(newItem);
}

function populateScoreTable()
{
    for(var i = 0; i < scoreTableEntries.length; i++)
    {
        addToScoreTable(scoreTableEntries[i].initials, scoreTableEntries[i].score)
    }
}

function clearScoreTable()
{
    scoreTableElement.replaceChildren([]);
}

// Saves score to storage
function saveScoreToStorage(initials, score)
{
    /*var saveScoreKey = "JSGauntletScore_" + scoreTableEntries.length;
    var saveScoreValue = {
        initials: initials,
        score: score
    };
    saveScoreValue = JSON.stringify(saveScoreValue);
    window.localStorage.setItem(saveScoreKey, saveScoreValue);*/
    scoreTableEntries.push({
        initials: initials,
        score: score
    });
    window.localStorage.setItem(scoresStorageKey, JSON.stringify(scoreTableEntries))
}

function loadScoresFromStorage()
{
    /*scoreTableEntries = []; // Clear current score array to force reload

    var loadScoreKeySuffix = 0;
    var loadScoreKey = "JSGauntletScore_" + loadScoreKeySuffix.toString();
    var loadScore = window.localStorage.getItem(loadScoreKey);
    while(loadScore)
    {
        loadScore = JSON.parse(loadScore);
        scoreTableEntries.push(loadScore);
        loadScoreKeySuffix++;
        loadScoreKey = "JSGauntletScore_" + loadScoreKeySuffix.toString();
        loadScore = window.localStorage.getItem(loadScoreKey);
    }*/
    scoreTableEntries = JSON.parse(window.localStorage.getItem(scoresStorageKey));
    if(scoreTableEntries === null)
    {
        scoreTableEntries = []; // Fallback in case scores fail to load
    }
}

loadScoresFromStorage();

populateScoreTable();

document.addEventListener("submit", function(event)
{
    event.preventDefault(); // default behavior is to reload page
    saveScoreToStorage(initialsInputElement.value, finalScore);
    clearScoreTable();
    loadScoresFromStorage();
    populateScoreTable();
});

clearScoresButtonElement.addEventListener("click", function()
{
    /*window.localStorage.clear();*/
    scoreTableEntries = [];
    window.localStorage.setItem(scoresStorageKey, JSON.stringify(scoreTableEntries))

    clearScoreTable();
    loadScoresFromStorage();
    populateScoreTable();
})