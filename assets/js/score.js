var finalScore = window.sessionStorage.getItem("FinalScore");

window.sessionStorage.removeItem("FinalScore");

const scoresStorageKey = "JSGauntletScores";

const scoreTableElement = document.querySelector("#score-table-body"); // Technically this is just the body of the table, but this is where we add our data.
const submitScoreForm = document.querySelector("#submit-score-form");
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
    scoreTableEntries.push({
        initials: initials,
        score: score
    });
    window.localStorage.setItem(scoresStorageKey, JSON.stringify(scoreTableEntries))
}

function loadScoresFromStorage()
{
    scoreTableEntries = JSON.parse(window.localStorage.getItem(scoresStorageKey));
    if(scoreTableEntries === null)
    {
        scoreTableEntries = []; // Fallback in case scores fail to load
    }
}

loadScoresFromStorage();

populateScoreTable();

submitScoreForm.addEventListener("submit", function(event)
{
    event.preventDefault(); // default behavior is to reload page
    saveScoreToStorage(initialsInputElement.value, finalScore);
    clearScoreTable();
    loadScoresFromStorage();
    populateScoreTable();
    submitScoreForm.style.visibility = "hidden"; // Oh, you wanted to spam the scoreboard with your score through multiple subissions? I don't think so!
});

clearScoresButtonElement.addEventListener("click", function()
{
    scoreTableEntries = [];
    window.localStorage.setItem(scoresStorageKey, JSON.stringify(scoreTableEntries))

    clearScoreTable();
    loadScoresFromStorage();
    populateScoreTable();
})