var finalScore = 0;

finalScore = window.sessionStorage.getItem("FinalScore") || 0.5;
//alert("Your final score is: " + finalScore);
window.sessionStorage.removeItem("FinalScore");

const scoreTableElement = document.querySelector("#score-table-body") // Technically this is just the body of the table, but this is where we add our data.

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

var savedScoreCount = 0;

function saveScore(initials, score)
{
    var saveScoreKey = "JSGauntletScore_" + savedScoreCount;
    var saveScoreValue = {
        initials: initials,
        score: score
    };
    saveScoreValue = JSON.stringify(saveScoreValue);
    window.localStorage.setItem(saveScoreKey, saveScoreValue);

    savedScoreCount++;
}

function loadScores()
{
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
    }
}

saveScore("WOW", "20");
saveScore("WTF", "3");

loadScores();

populateScoreTable();