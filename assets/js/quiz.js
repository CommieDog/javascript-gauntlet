const quizQuestionElement = document.querySelector("#quiz-question");
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