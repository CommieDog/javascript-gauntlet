const quizQuestionElement = document.querySelector("#quiz-question");
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

loadTestQuestion();

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
    alert("You selected choice " + choice + "\nThe correct choice was " + testQuestion.correctChoice);
    if(choice == testQuestion.correctChoice)
    {
        alert("You were correct!");
    }
    else
    {
        alert("You were wrong!!!");
    }
}