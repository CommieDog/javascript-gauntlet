const quizQuestionElement = document.querySelector("#quiz-question");
const scoreValueElement = document.querySelector("#score-value");
const timeValueElement = document.querySelector("#timer-value");
const choicesElement = document.querySelector("#choices")
const choiceAElement = document.querySelector("#choice-a-text");
const choiceBElement = document.querySelector("#choice-b-text");
const choiceCElement = document.querySelector("#choice-c-text");
const choiceDElement = document.querySelector("#choice-d-text");

const testQuestion = {
    questionText: "What is 1 + 1?",
    choiceA: "2",
    choiceB: "4",
    choiceC: "5",
    choiceD: "11",
    correctChoice: 0
}

var time = 20;
var score = 0;

//questionBank.getNextQuestion();
updateQuestionElements();
updateScoreElement();
var timeIntervalId = window.setInterval(function()
{
    time--;
    updateTimeElement();
    checkTime();
}, 1000);
updateTimeElement();

function updateQuestionElements()
{
    quizQuestionElement.textContent = questionBank.currentQuestion.questionText;
    choiceAElement.textContent = questionBank.currentQuestion.choiceA;
    choiceBElement.textContent = questionBank.currentQuestion.choiceB;
    choiceCElement.textContent = questionBank.currentQuestion.choiceC;
    choiceDElement.textContent = questionBank.currentQuestion.choiceD;
}

choicesElement.addEventListener("click", function(event)
{
    var selectedChoiceElement = event.target;
    if(selectedChoiceElement.matches("div"))
    {
        selectChoice(selectedChoiceElement.dataset.choice);
    }
});

function selectChoice(choice)
{
    if(choice == questionBank.currentQuestion.correctChoice)
    {
        score++;
        updateScoreElement();
    }
    else
    {
        applyTimePenalty()
    }
    questionBank.selectNextQuestion();
    updateQuestionElements();
}

function updateScoreElement()
{
    scoreValueElement.textContent = score;
}

function updateTimeElement()
{
    timeValueElement.textContent = time;
}

function applyTimePenalty()
{
    time -= 4;
    time = Math.max(0, time); // Don't allow negative values
    updateTimeElement();
    checkTime();
}

function checkTime()
{
    if(time <= 0)
    {
        window.clearInterval(timeIntervalId);
        window.location.href = "score.html";
    }
}