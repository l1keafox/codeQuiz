// Quiz data strucutre:
/*
    {   
        question: "Why", // 
        answers: ["ask","why"], // 
        correctAnswer: 1, // 0-1 
    }

*/
// Global scope variables. 
let allQuestions =  [
    {   
        question: "Why", // 
        answers: ["ask","why"], // 
        correctAnswer: 1, // 0-1 
    },
    {   
        question: "To do or not to do", // 
        answers: ["todo","not"], // 
        correctAnswer: 1, // 0-1 
    },
    
];
let questionIndex = 0;
let currentScore;
let currentQuestionTimer;
const qTimer = 5;

let startButton = document.querySelector('#startButton');
let quizQuestion = document.querySelector('#question');
let answersList = document.querySelector('#answers');
let startScreen = document.querySelector('#startQuizScreen');
let quizScreen = document.querySelector('#quizScreen');
let results = document.querySelector('#results');

function startQuiz(event){
    console.log(event,"Starting Quiz");

    /*
    Doesn't work this doesn't
    */
    currentScore = 0;
    startScreen.style.display = 'none';
    quizScreen.style.display = 'flex';
    printQuestion();
    restartTimer();
    var imageContainer = document.querySelector('#answers');
    imageContainer.addEventListener("click",answerQuiz);
    console.log(imageContainer ,'answer container');
}

function restartTimer(){
    currentQuestionTimer = qTimer;
    var timerDisplay = document.querySelector('#currentTime');
    timerDisplay.textContent = 'timer:'+currentQuestionTimer;
    var timerInterval = setInterval(function(){
        currentQuestionTimer--;
        timerDisplay.textContent = 'timer:'+currentQuestionTimer;
        if(!currentQuestionTimer ){
            currentQuestionTimer = qTimer;
            questionAnswer(false);
            clearInterval(timerInterval);
        }
    },1000);
}

function questionAnswer(answer){
    if(questionIndex === allQuestions.length-1){
        console.log("FINISHED QUIZ!");  
        recordHighScore();
        showHighScore();
        startScreen.style.display = 'flex';
        quizScreen.style.display = 'none';
    
    }else if(answer){
        console.log("GOOD ANSWER");
        questionIndex++;
        printQuestion();
        restartTimer();
    } else {
        console.log("BAD ANSWER/TIMER");
        questionIndex++;
        printQuestion();
        restartTimer();
    }
}


function recordHighScore(){
    
}
function showHighScore(){
    
}

function printQuestion(){
    // answersList needs to clear of any buttons
    let oldButtons = document.querySelectorAll('.anAnswer');
    for(let i = 0; i < oldButtons.length;i++){
        oldButtons[i].remove();
    }
    let oneQuestion = allQuestions[questionIndex];
    quizQuestion.textContent = oneQuestion.question;

    for(let i = 0;i < oneQuestion.answers.length;i++){
        console.log('Adding questions');
        var answerButton = document.createElement('button');
        answerButton.textContent = oneQuestion.answers[i];
        console.log(answerButton);
        answerButton.setAttribute('data-buttonID',i);
        answerButton.setAttribute('class','anAnswer');
        answersList.appendChild(answerButton);
        // now we want to add an event listener to all the buttons
        // when that button is clicked it will check against the oneQuestion.answer;
    }
}

function answerQuiz(event){
    var element = event.target;
    var buttonAnswer = element.getAttribute('data-buttonID');
    let oneQuestion = allQuestions[questionIndex];
    let thisAnswer;
    if( oneQuestion.correctAnswer == buttonAnswer){
        thisAnswer = true;
    } else {
        thisAnswer = false;
    }

    //After answer let's figure out if this is end of the quiz?

    questionAnswer(thisAnswer);
}


startButton.addEventListener("click", startQuiz);