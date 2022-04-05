const scoresStorageKey = "JSGauntletScores";

const scoreTableElement = document.querySelector("#score-table-body"); // Technically this is just the body of the table, but this is where we add our data.
const submitScoreForm = document.querySelector("#submit-score-form");
const initialsInputElement = document.querySelector("#initials-input");
const clearScoresButtonElement = document.querySelector("#clear-scores");

var finalScore;
var scoreTableEntries = [];

/**
 * Initializes page for displaying previous scores
 */
function init()
{
    finalScore = window.sessionStorage.getItem("FinalScore");
    window.sessionStorage.removeItem("FinalScore");
    loadScoresFromStorage();
    populateScoreTable();
}

/**
 * Adds a score table entry (consisting of initials and score) to the table
 * @param {*} initials the entry's initials
 * @param {*} score the entry's score
 */
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

/**
 * Refresh the elements on the page to correspond to the score entries in local memory
 */
function populateScoreTable()
{
    for(var i = 0; i < scoreTableEntries.length; i++)
    {
        addToScoreTable(scoreTableEntries[i].initials, scoreTableEntries[i].score)
    }
}

/**
 * Remove all elements inside the score table element
 */
function clearScoreTable()
{
    scoreTableElement.replaceChildren([]);
}

/**
 * Creates a score table entry and writes it to local storage
 * @param {*} initials the entry's initials
 * @param {*} score the entry's score
 */
function saveScoreToStorage(initials, score)
{
    scoreTableEntries.push({
        initials: initials,
        score: score
    });
    window.localStorage.setItem(scoresStorageKey, JSON.stringify(scoreTableEntries))
}

/**
 * Load scores from browser's local storage into local memory
 */
function loadScoresFromStorage()
{
    scoreTableEntries = JSON.parse(window.localStorage.getItem(scoresStorageKey));
    if(scoreTableEntries === null)
    {
        scoreTableEntries = []; // Fallback in case scores fail to load
    }
}

/**
 * Adds a submit listener to the score form to save to browser's local storage and updates display
 */
submitScoreForm.addEventListener("submit", function(event)
{
    event.preventDefault(); // default behavior is to reload page
    saveScoreToStorage(initialsInputElement.value, finalScore);
    clearScoreTable();
    loadScoresFromStorage();
    populateScoreTable();
    submitScoreForm.style.visibility = "hidden"; // Oh, you wanted to spam the scoreboard with your score through multiple subissions? I don't think so!
});

/**
 * Adds a click listener to the "Clear Scores" button that clears the entries in the browser's local storage and updates the display
 */
clearScoresButtonElement.addEventListener("click", function()
{
    scoreTableEntries = [];
    window.localStorage.setItem(scoresStorageKey, JSON.stringify(scoreTableEntries))

    clearScoreTable();
    loadScoresFromStorage();
    populateScoreTable();
});

init();