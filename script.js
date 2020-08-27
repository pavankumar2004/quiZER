// code by webdevtrick (https://webdevtrick.com)
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}


function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score*10 + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new Question("if 1/2 of 5x is 3, what is 1/3 of 10x", ["3", "5","4", "2"], "4"),
    new Question("if you have a cake, how many pieces of cake can you form with 3 cuts?", ["8", "9", "7", "4"], "8"),
    new Question("what number do you get when you multiply all of the numbers in a telephone numberpad" , ["346", "1567","876", "0"], "0"),
    new Question("if you have two twins,three triplets and four quadrants,how many people do you have?", ["29", "20", "10", "9"], "9"),
    new Question("mr.surya has two children. if the older child is a boy ,what is the odds that other child is a boy?", ["50%", "60%", "68%", "75%"], "50%"),
    new Question("Find the median of the given data: 13, 16, 12, 14, 19, 12, 14, 13, 14.", ["19.", "14.", "12", "14.5"], "14."),
    new Question("What should be added to 53/7 to get 12?", ["7/25", "9/34", "2/59", "46/7"], "46/7"),
    new Question("Each side of a square is 62/3 m long. Find its Area.", ["444/9 m2", "123/2 m2", " 65 1/2 m2", " None of these."], "444/9 m2"),
    new Question("A car can cover a distance of 522 km on 36 liters of petrol. How far can it travel on 14 liters of petrol?", ["213 km.", "223 km.", "203 km.", "302 km."], "203 km.")

];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
