const quizQuestionElement = document.querySelector("#quiz-question");
const scoreValueElement = document.querySelector("#score-value");
const timeValueElement = document.querySelector("#timer-value");
const choicesElement = document.querySelector("#choices")
const choiceAElement = document.querySelector("#choice-a-text");
const choiceBElement = document.querySelector("#choice-b-text");
const choiceCElement = document.querySelector("#choice-c-text");
const choiceDElement = document.querySelector("#choice-d-text");
const previousChoiceFeedbackElement = document.querySelector("#previous-choice-feedback");

var time = 50;
var score = 0;
var quizTimeIntervalId;
var feedbackTimerId;

/**
 * Initializes page for giving quiz
 */
function init()
{
    updateQuestionElements();
    updateScoreElement();
    updateTimeElement();
    setQuizTimer();
}

/**
 * Updates score display
 */
function updateScoreElement()
{
    scoreValueElement.textContent = score;
}

/**
 * Updates time display
 */
function updateTimeElement()
{
    timeValueElement.textContent = time;
}

/**
 * Updates question and answer display
 */
function updateQuestionElements()
{
    quizQuestionElement.textContent = questionBank.currentQuestion.questionText;
    choiceAElement.textContent = questionBank.currentQuestion.choiceA;
    choiceBElement.textContent = questionBank.currentQuestion.choiceB;
    choiceCElement.textContent = questionBank.currentQuestion.choiceC;
    choiceDElement.textContent = questionBank.currentQuestion.choiceD;
}

/**
 * Updates feedback display based on correctness of the user's answer
 * @param {*} correct whether the user answered the last question correctly or not
 */
function updateFeedbackElement(correct)
{
    if(correct)
    {
        previousChoiceFeedbackElement.textContent = "Correct!";
        previousChoiceFeedbackElement.className = "correct";
    }
    else
    {
        previousChoiceFeedbackElement.textContent = "Wrong!";
        previousChoiceFeedbackElement.className = "incorrect";
    }
    clearTimeout(feedbackTimerId); // If the timer hasn't expired yet because the user answered the next question too quickly, go ahead and cancel the last timer
    feedbackTimerId = setTimeout(function()
    {
        previousChoiceFeedbackElement.textContent = "";
    }, 1000); // And set a new one
}

/**
 * Starts the interval that counts down the time left on the quiz
 */
function setQuizTimer()
{
    quizTimeIntervalId = window.setInterval(function()
    {
        time--;
        updateTimeElement();
        checkTimeRemaining();
    }, 1000);
}

/**
 * Checks the remaining time to see if the quiz should be stopped and stops it if time is up
 */
function checkTimeRemaining()
{
    if(time <= 0)
    {
        window.clearInterval(quizTimeIntervalId);
        window.sessionStorage.setItem("FinalScore", score);
        window.location.href = "score.html";
    }
}

/**
 * Add a click event listener to the <div> hosting all of the possible clickable answers on the page
 * The event listener is placed here but delegated to the element that was actually clicked on
 */
choicesElement.addEventListener("click", function(event)
{
    var userChoice = getUserChoice(event.target);
    processUserChoice(userChoice);

    /**
     * Digs through the DOM to grab the user choice code represented in a given element
     * @param {*} targetElement the element whose corresponding user choice index to look up
     * @returns the user choice code
     */
    function getUserChoice(targetElement)
    {
        targetElement = getContainingDivElement(targetElement);
        return targetElement.dataset.choice;

        /**
         * Climbs up through the DOM tree to get the closest containing <div> element. This is useful
         * as the closest <div> is expected to have the user choice index assigned to it
         * @param {*} element the element where to start the search
         * @returns 
         */
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
    }

    /**
     * Check to see if an answer choice is correct and acts accordingly
     * @param {*} choice the user's choice index
     */
    function processUserChoice(choice)
    {
        var choseCorrectly = (choice == questionBank.currentQuestion.correctChoice);
        if(choseCorrectly)
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
        updateFeedbackElement(choseCorrectly);
        questionBank.selectNextQuestion();
        updateQuestionElements();
    }

    /**
     * Deducts 4 seconds from the user's remaining time
     */
    function applyTimePenalty()
    {
        time -= 4;
        time = Math.max(0, time); // Don't allow negative values
        updateTimeElement();
        checkTimeRemaining();
    }
});

init(); // Get the ball rolling