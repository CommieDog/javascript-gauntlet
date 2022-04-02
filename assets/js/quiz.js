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
var question = questionBank.getNextQuestion();

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
    quizQuestionElement.textContent = question.questionText;
    choiceAElement.textContent = question.choiceA;
    choiceBElement.textContent = question.choiceB;
    choiceCElement.textContent = question.choiceC;
    choiceDElement.textContent = question.choiceD;
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
    if(choice == question.correctChoice)
    {
        score++;
        updateScoreElement();
    }
    else
    {
        applyTimePenalty()
    }
    question = questionBank.getNextQuestion();
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
        alert("Time's up!")
        window.clearInterval(timeIntervalId);
    }
}