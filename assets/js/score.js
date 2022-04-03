var finalScore = 0;

finalScore = window.sessionStorage.getItem("FinalScore") || 0.5;
//alert("Your final score is: " + finalScore);
window.sessionStorage.removeItem("FinalScore");

const scoreTableElement = document.querySelector("#score-table-body") // Technically this is just the body of the table, but this is where we add our data.

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

addToScoreTable("NEW", "50");
addToScoreTable("OMG", "25");