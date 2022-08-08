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
let currentTimerID;
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
    document.querySelector('#currentScore').textContent = "score: "+currentScore;
    startScreen.style.display = 'none';
    quizScreen.style.display = 'flex';
    printQuestion();
    
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
            clearInterval(currentTimerID);
        }
    },1000);
    currentTimerID = timerInterval;
    
}

function questionAnswer(answer){
    clearInterval(currentTimerID);

    if(questionIndex === allQuestions.length-1){
        console.log("FINISHED QUIZ!");  
        quizScreen.style.display = 'none';
        recordHighScore();
        return;
    }else if(answer){
        console.log("GOOD ANSWER");
        currentScore += 100;
        questionIndex++;
        printQuestion();
        
    } else {
        console.log("BAD ANSWER/TIMER");
        currentScore -= 50;
        questionIndex++;
        printQuestion();
        
    }
}


function recordHighScore(){
    let enterName = document.querySelector('#enterName');
    enterName.style.display = 'flex';
    document.querySelector('#submitName').addEventListener("click", function(){
        // this is where we add the name and setup for new game.
        showHighScore();
        enterName.style.display = 'none';
        questionIndex = 0;
    });
    
}

function showHighScore(){
    startScreen.style.display = 'flex';
    console.log("SHow high Score?");
}

function printQuestion(){
    restartTimer();
    // answersList needs to clear of any buttons
    let oldButtons = document.querySelectorAll('.anAnswer');
    for(let i = 0; i < oldButtons.length;i++){
        oldButtons[i].remove();
    }
    let oneQuestion = allQuestions[questionIndex];
    quizQuestion.textContent = oneQuestion.question;
    document.querySelector('#currentScore').textContent = "score: "+currentScore;
    for(let i = 0;i < oneQuestion.answers.length;i++){
        var answerButton = document.createElement('button');
        answerButton.textContent = oneQuestion.answers[i];
        answerButton.setAttribute('data-buttonID',i);
        answerButton.setAttribute('class','anAnswer');
        answersList.appendChild(answerButton);
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

function showScoreHideEverything(event){
    console.log('score button pressed');
    showHighScore();
}


startButton.addEventListener("click", startQuiz);

document.querySelector('#highScore').addEventListener("click",showScoreHideEverything);
