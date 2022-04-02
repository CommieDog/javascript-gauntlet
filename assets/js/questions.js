var questionBank = {
    questions: [],
    getNextQuestion: function()
    {
        //var currentQuestionId = currentQuestion.questionId;
        return getRandomItem(this.questions);
    }
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
    questionId: questionBank.questions.length,
    questionText: "What is 1 + 1?",
    choiceA: "2",
    choiceB: "4",
    choiceC: "5",
    choiceD: "11",
    correctChoice: 0
});

questionBank.questions.push({
    questionId: questionBank.questions.length,
    questionText: "What is the answer to everything?",
    choiceA: "7",
    choiceB: "The Game",
    choiceC: "42",
    choiceD: "I dunno lol",
    correctChoice: 2
});