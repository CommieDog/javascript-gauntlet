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

loadTestQuestion();
updateScoreElement();
var timeIntervalId = window.setInterval(function()
{
    time--;
    updateTimeElement();
    checkTime();
}, 1000);
updateTimeElement();

function loadTestQuestion()
{
    quizQuestionElement.textContent = testQuestion.questionText;
    choiceAElement.textContent = testQuestion.choiceA;
    choiceBElement.textContent = testQuestion.choiceB;
    choiceCElement.textContent = testQuestion.choiceC;
    choiceDElement.textContent = testQuestion.choiceD;
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
    if(choice == testQuestion.correctChoice)
    {
        score++;
        updateScoreElement();
    }
    else
    {
        applyTimePenalty()
    }
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