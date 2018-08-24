// an array of questions and answers, including the correct answer
var questionBank = [
    {
        question: "Question 1",
        answers: ["a", "b", "c", "d"],
        correctAnswer: 0
    },
    {
        question: "Question 2",
        answers: ["a", "b", "c", "d"],
        correctAnswer: 1
    }
]

window.onload = function() {
    $('#start-button').on("click", game.startQuestion);
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
    numIncorrect: 0,
    numUnanswered: 0,
    lastCorrect: false,
    timedOut: false,

    startQuestion: function() {
        var current = questionBank[game.questionIndex];
        $('#trivia').html("<p>Time Remaining: <span id='time-rem'>" + game.questionWait + "</span> Seconds</p>");
        $('#trivia').append("<p id='question'>" + current.question + "</p>");
        $('#trivia').append("<div id='answers'><div>")
        for (var i = 0; i < current.answers.length; i++) {
            $('#answers').append("<button id='button" + i + "'>" + current.answers[i] + "</button>");
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

    startClockForAnswer: function() {
        if (!clockTicking) {
          game.time = game.answerWait;
          intervalId = setInterval(game.countDownAnswer, 1000);
          clockTicking = true;
        }
    },

    countDown: function() {
        console.log('counting');
        game.time--;
        console.log(game.time);
        $('#time-rem').html(game.time);

        if (game.time === 0) {
            // stop counting down
            game.stopClock();
            game.timedOut = true;
            game.numUnanswered++;
            game.showAnswer();
            game.startClockForAnswer();
        }
    },

    countDownAnswer: function() {
        console.log('counting');
        game.time--;
        console.log(game.time);
        
        if (game.time === 0) {
            // stop counting down
            game.stopClock();
            game.questionIndex++;
            if (game.questionIndex < questionBank.length) {
                game.startQuestion();
            }
            else {
                game.showQuizResults();
            }
            
        }
    },

    stopClock: function() {
        clearInterval(intervalId);
        clockTicking = false;
    },

    getAnswer0: function() {
        var current = questionBank[game.questionIndex];
        if (current.correctAnswer === 0) {
            game.score++;
            game.lastCorrect = true;
        }
        else {
            game.lastCorrect = false;
            game.numIncorrect++;
        }
        game.stopClock();
        game.showAnswer();
        game.startClockForAnswer();
    },

    getAnswer1: function() {
        var current = questionBank[game.questionIndex];
        if (current.correctAnswer === 1) {
            game.score++;
            game.lastCorrect = true;
        }
        else {
            game.lastCorrect = false;
            game.numIncorrect++;
        }
        game.stopClock();
        game.showAnswer();
        game.startClockForAnswer();
    },

    getAnswer2: function() {
        var current = questionBank[game.questionIndex];
        if (current.correctAnswer === 2) {
            game.score++;
            game.lastCorrect = true;
        }
        else {
            game.lastCorrect = false;
            game.numIncorrect++;
        }
        game.stopClock();
        game.showAnswer();
        game.startClockForAnswer();
    },

    getAnswer3: function() {
        var current = questionBank[game.questionIndex];
        if (current.correctAnswer === 3) {
            game.score++;
            game.lastCorrect = true;
        }
        else {
            game.lastCorrect = false;
            game.numIncorrect++;
        }
        game.stopClock();
        game.showAnswer();
        game.startClockForAnswer();
    },

    showAnswer: function() {
        if (game.timedOut) {
            console.log('out of time');
            $('#question').html("Out of time!");
            $('#answers').empty();
            var current = questionBank[game.questionIndex];
            var correct = current.answers[current.correctAnswer];
            $('#answers').html("The correct answer was: " + correct);
            game.timedOut = false;
        }
        else {
            if (game.lastCorrect) {
                // let the user know that he or she picked the correct answer
                console.log('correct');
                $('#question').html("Correct!");
                $('#answers').empty();
            }
            else {
                // let the user know that he or she picked an incorrect answer and 
                // show the user the correct answer
                console.log('incorrect');
                $('#question').html("Incorrect!");
                $('#answers').empty();
            }
        }
    },

    showQuizResults: function() {
        console.log('done');
        $('#question').html("<p>Done! Here's how you did...<p>");
        
        $('#answers').empty();
        $('#answers').html("<p class='stats'>Correct Answers: " + game.score + "<p>");
        $('#answers').append("<p class='stats'>Incorrect Answers: " + game.numIncorrect + "<p>");
        $('#answers').append("<p class='stats'>Unanswered: " + game.numUnanswered + "<p>");
        $('#answers').append("<button id='start-over'>Start Over</button>");

        $('#start-over').on("click", function() {
            game.time = 0;
            game.questionIndex = 0;
            game.score = 0;
            game.numIncorrect = 0;
            game.numUnanswered = 0;
            game.lastCorrect = false;
            game.timedOut = false;
            game.startQuestion();
        });
        
    }
}


