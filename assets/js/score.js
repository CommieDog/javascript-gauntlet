var finalScore = 0;

finalScore = window.sessionStorage.getItem("FinalScore");
alert("Your final score is: " + finalScore);
window.sessionStorage.removeItem("FinalScore");