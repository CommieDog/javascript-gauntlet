var finalScore = 0;

finalScore = window.sessionStorage.getItem("FinalScore") || 0.5;
alert("Your final score is: " + finalScore);
window.sessionStorage.removeItem("FinalScore");