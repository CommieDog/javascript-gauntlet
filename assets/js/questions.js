var questionBank =
{
    questions: [],
    currentQuestion: null,
    selectNextQuestion: function()
    {
        var possibleNextQuestions = this.questions.slice(); // Any question can be a possible next question...
        possibleNextQuestions = possibleNextQuestions.filter(isNotCurrentQuestion); // ...except for the current question!
        this.currentQuestion = getRandomItem(possibleNextQuestions);
    }
}

function isNotCurrentQuestion(question)
{
    return question !== questionBank.currentQuestion;
}

function getRandomItem(array)
{
    var index = Math.random();
    index *= array.length;
    index = Math.floor(index)
    return array[index];
}

// Begin questions
questionBank.questions.push({
    questionText: "What is 1 + 1?",
    choiceA: "2",
    choiceB: "4",
    choiceC: "5",
    choiceD: "11",
    correctChoice: 0
});

questionBank.questions.push({
    questionText: "What is the answer to everything?",
    choiceA: "7",
    choiceB: "The Game",
    choiceC: "42",
    choiceD: "I dunno lol",
    correctChoice: 2
});

questionBank.selectNextQuestion();