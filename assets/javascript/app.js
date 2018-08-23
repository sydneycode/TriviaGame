// an array of questions and answers, including the correct answer
var questionBank = [
    {
        question: "Question 1",
        answers: ["a", "b", "c", "d"],
        correctAnswer: "a"
    },
    {
        question: "Question 2",
        answers: ["a", "b", "c", "d"],
        correctAnswer: "b"
    }
]

window.onload = function() {
    $('#start-button').on("click", game.startQuiz);
}

var intervalId;

var quizGoing = false;
var clockTicking = false;

var game = {
    questionWait: 30,
    answerWait: 5,
    time: 0,
    questionIndex: 0,
    score: 0,
    lastCorrect: false,

    startQuiz: function() {
        var current = questionBank[game.questionIndex];
        $('#trivia').html("<p>Time Remaining: <span id='time-rem'>" + game.questionWait + "</span> Seconds</p>");
        $('#trivia').append("<p>" + current.question + "</p>");
        for (var i = 0; i < current.answers.length; i++) {
            $('#trivia').append("<button id='button" + i + "'>" + current.answers[i] + "</button>");
        }

        $('#button0').on("click", game.getAnswer0);
        $('#button1').on("click", game.getAnswer1);
        $('#button2').on("click", game.getAnswer2);
        $('#button3').on("click", game.getAnswer3);

        game.startClock();

    },

    startClock: function() {
        console.log('counting1');
        if (!clockTicking) {
          game.time = game.questionWait;
          intervalId = setInterval(game.countDown, 1000);
          clockTicking = true;
        }
    },

    countDown: function() {
        console.log('counting');
        game.time--;
        $('#time-rem').text(game.time);

        if (game.time === 0) {
            // stop counting down
            game.stopClock();
        }
    },

    stopClock: function() {
        clearInterval(intervalId);
        clockTicking = false;
    },

    getAnswer0: function() {
        var current = questionBank[game.questionIndex];
        if (current.correctAnswer === 'a') {
            game.score++;
            game.lastCorrect = true;
        }
        else {
            lastCorrect = false;
        }
        game.stopClock();
        game.showAnswer();
    },

    getAnswer1: function() {
        var current = questionBank[game.questionIndex];
        if (current.correctAnswer === 'b') {
            game.score++;
            game.lastCorrect = true;
        }
        else {
            game.lastCorrect = false;
        }
        game.stopClock();
        game.showAnswer();
    },

    getAnswer2: function() {
        var current = questionBank[game.questionIndex];
        if (current.correctAnswer === 'c') {
            game.score++;
            game.lastCorrect = true;
        }
        else {
            game.lastCorrect = false;
        }
        game.stopClock();
        game.showAnswer();
    },

    getAnswer3: function() {
        var current = questionBank[game.questionIndex];
        if (current.correctAnswer === 'd') {
            game.score++;
            game.lastCorrect = true;
        }
        else {
            game.lastCorrect = false;
        }
        game.stopClock();
        game.showAnswer();
    },

    showAnswer: function() {
        if (game.lastCorrect) {
            // let the user know that he or she picked the correct answer
            console.log('correct');
        }
        else {
            // let the user know that he or she picked an incorrect answer and 
            // show the user the correct answer
            console.log('incorrect');

        }
    }
}


