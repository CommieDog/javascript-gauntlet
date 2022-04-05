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
    questionText: "What is the name of the array function that adds a given item to the end of the array?",
    choiceA: "pop()",
    choiceB: "push()",
    choiceC: "shift()",
    choiceD: "unshift()",
    correctChoice: 1
});

questionBank.questions.push({
    questionText: "What is the name of the array function that removes and returns the first item the array?",
    choiceA: "pop()",
    choiceB: "push()",
    choiceC: "shift()",
    choiceD: "unshift()",
    correctChoice: 2
});

questionBank.questions.push({
    questionText: "Which of the following values is not stored as a constant in JavaScript's math library?",
    choiceA: "Euler's number",
    choiceB: "Pi",
    choiceC: "√2",
    choiceD: "√3",
    correctChoice: 3
});

questionBank.questions.push({
    questionText: "Which of the following functions does not exist in JavaScript's math library?",
    choiceA: "asin()",
    choiceB: "ln()",
    choiceC: "pow()",
    choiceD: "sinh()",
    correctChoice: 1
});

questionBank.questions.push({
    questionText: "Given an array named \"arr\", which statement will return the last element of the array?",
    choiceA: "arr.pop()",
    choiceB: "arr[arr.length]",
    choiceC: "arr[arr.length - 1]",
    choiceD: "arr[1]",
    correctChoice: 0
});

questionBank.questions.push({
    questionText: "Which of the following is not a loop construct in JavaScript?",
    choiceA: "for()",
    choiceB: "until()",
    choiceC: "while()",
    choiceD: "do...while()",
    correctChoice: 1
});

questionBank.questions.push({
    questionText: "Which of the following values is truthy?",
    choiceA: "0",
    choiceB: "\"\"",
    choiceC: "{isTruthy: false}",
    choiceD: "NaN",
    correctChoice: 2
});

questionBank.questions.push({
    questionText: "Which of the following values is falsey?",
    choiceA: "[]",
    choiceB: "{isFalsey: true}",
    choiceC: "-1",
    choiceD: "undefined",
    correctChoice: 3
});

questionBank.selectNextQuestion();