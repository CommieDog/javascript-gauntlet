const quizQuestionElement = document.querySelector("#quiz-question");
const scoreValueElement = document.querySelector("#score-value");
const timeValueElement = document.querySelector("#timer-value");
const choicesElement = document.querySelector("#choices")
const choiceAElement = document.querySelector("#choice-a-text");
const choiceBElement = document.querySelector("#choice-b-text");
const choiceCElement = document.querySelector("#choice-c-text");
const choiceDElement = document.querySelector("#choice-d-text");
const previousChoiceFeedbackElement = document.querySelector("#previous-choice-feedback");

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
    selectedChoiceElement = getContainingDivElement(selectedChoiceElement)
    if(selectedChoiceElement.matches("div"))
    {
        selectChoice(selectedChoiceElement.dataset.choice);
    }

    function getContainingDivElement(element)
    {
        if(element.matches("div"))
        {
            return element;
        }
        if(element === choicesElement)
        {
            return null;
        }
        return getContainingDivElement(element.parentNode);
    }
});

function selectChoice(choice)
{
    if(choice == questionBank.currentQuestion.correctChoice)
    {
        score++;
        updateScoreElement();
        previousChoiceFeedbackElement.textContent = "Correct!";
        previousChoiceFeedbackElement.className = "correct";
    }
    else
    {
        applyTimePenalty();
        previousChoiceFeedbackElement.textContent = "Wrong!";
        previousChoiceFeedbackElement.className = "incorrect";
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
        window.sessionStorage.setItem("FinalScore", score);
        window.location.href = "score.html";
    }
}