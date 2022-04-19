# JavaScript Gauntlet

A webpage that presents a timed multiple-choice quiz on the basics of JavaScript


## Introduction 

The JavaScript Gauntlet is a website where JavaScript programmers can come to test their knowledge of JavaScript trivia. Users are given a set amount of time to answer multiple-choice questions; correct answers increase their score, whereas incorrect answers deduct time remaining on the quiz. When the quiz is over, users are invited to save their score alongside their initials for posterity.

![Screenshot of quiz page.](https://github.com/CommieDog/javascript-gauntlet/blob/main/assets/images/readme/javascript-gauntlet-quiz-screenshot.jpg)

A sample deployment of the website is available on [GitHub Pages](https://commiedog.github.io/javascript-gauntlet/).


## Table of Contents

* [Description](#description)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Future Work](#future-work)
* [Author](#author)
* [License](#license)


## Description

The landing page for the JavaScript gauntlet consists of a simple (if somewhat humorous) description of the website and a button that links the the quiz page. Users may use it to navigate to the quiz page, where the action takes place.

### Quiz Page

The quiz starts immediately upon loading the quiz page. The timer is set to 50 seconds and a question is chosen at random from a list of questions hard-coded into JavaScript. The question appears on top and a list of four choices is presented to the user. The user selects an answer from the list of choices by simply clicking on it. Selecting the correct answer increments the score counter. Selecting an incorrect answers subtracts 4 seconds from the timer. Either way, the quiz loads a new question at random but _excluding_ the current question so that no question is asked twice in a row:
```JavaScript
selectNextQuestion: function()
{
    var possibleNextQuestions = this.questions.slice(); // Any question can be a possible next question...
    possibleNextQuestions = possibleNextQuestions.filter(isNotCurrentQuestion); // ...except for the current question!
    this.currentQuestion = getRandomItem(possibleNextQuestions);
}

...

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
```

Every time the time counter changes (either as a result of a second elapsing or as a penalty) The page checks the time remaining and if it reaches 0, then the quiz is stopped. The score is saved into the browser's session storage and the score page loads.

### Score Page

The score pages immediately loads the score from session storage and deletes the record within storage to prevent tampering. The page opens to a table of previously submitted scores with matching initials collected from past users. The previous user scores are saved in the browser's local storage to gain persistance across browser sessions.

![Screenshot of score page.](https://github.com/CommieDog/javascript-gauntlet/blob/main/assets/images/readme/javascript-gauntlet-score-table-screenshot.jpg)

Below the table is a small form that the user can use to enter initials and add the score into local storage. When initials are entered, the are combined with the saved score and appended to the score list. To block multiple submissions from the same quiz session, the form is hidden after its first submission. At the bottom is a link to the landing page where the user can repeat the quiz for a new score to submit.


## Features

* Several multiple-choice questions built-in to the website
  * Educational, subject-relevant material
* Briefly displayed user feedback on answer to minimize distraction
* Ability to save quiz scores for comparison with peers or one's previous self
* Convienient table view of previous scores


## Technologies Used

* HTML
* CSS
* JavaScript
  * DOM API
  * Web Storage API


## Future Work

The biggest potential feature for future work would be the addition of back end support. With a back end, JavaScript Gauntlet could maintain a store of questions on a database for easy manipulation and selection of customized subsets depending on user input. A back end score list could display scores from quizzes taken on other browers, or even lead to worldwide leaderborads for the most competitive.


## Author

John Netzel
* [Portfolio](https://commiedog.github.io/my-portfolio/)
* [LinkedIn](https://www.linkedin.com/in/john-netzel-481112129/)
* [GitHub](https://github.com/CommieDog)

## License
&copy; 2022 John Netzel. All Rights Reserved.

Licensed under the [MIT](LICENSE) License.