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
        answers: ["ask","why","why","why"], // 
        correctAnswer: 1, // 0-1 
    },
    {   
        question: "To do or not to do", // 
        image:null,//

        answers: ["todo","not"], // 
        correctAnswer: 1, // 0-1 
    },
    
];
let questionIndex = 0;
let currentScore;
let currentQuestionTimer;
let currentTimerID;
const qTimer = 60;
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
    currentQuestionTimer = 60;
    results.textContent = " ";
    document.querySelector('#currentScore').textContent = "score: "+currentScore;
    startScreen.style.display = 'none';
    quizScreen.style.display = 'flex';
    printQuestion();

    var timerDisplay = document.querySelector('#currentTime');
    timerDisplay.textContent = 'timer:'+currentQuestionTimer;
    var timerInterval = setInterval(function(){
        currentQuestionTimer--;
        timerDisplay.textContent = 'timer:'+currentQuestionTimer;
        if(!currentQuestionTimer ){
            console.log('Game over!');
            quizScreen.style.display = 'none';
            recordHighScore();
        }
    },1000);
    currentTimerID = timerInterval;
        
    var imageContainer = document.querySelector('#answers');
    imageContainer.addEventListener("click",answerQuiz);
    console.log(imageContainer ,'answer container');
}

function questionAnswer(answer){

    if(answer){
        console.log("GOOD ANSWER");
        currentScore += 100;
        results.textContent = answer + '+100 points';
    } else {
        console.log("BAD ANSWER/TIMER");
        currentScore -= 50;
        currentQuestionTimer-=5;
        results.textContent = answer + '-50 points';
    }
    document.querySelector('#currentScore').textContent = "score: "+currentScore;

    if(questionIndex === allQuestions.length-1){
        console.log("FINISHED QUIZ!");  
        quizScreen.style.display = 'none';
        recordHighScore();
        return;
    } else {
        questionIndex++;
        printQuestion();
    }     
}


function recordHighScore(){
    let enterName = document.querySelector('#enterName');
    let scorePrint = document.querySelector('#printScore');
    clearInterval(currentTimerID);
    
    enterName.style.display = 'flex';
    let finalScore = currentScore + (currentQuestionTimer*100) ;
    scorePrint.textContent = "Your score is :"+finalScore;
    document.querySelector('#submitName').addEventListener("click", function(){
        // this is where we add the name and setup for new game.
        
        let nameEntered = document.querySelector('#scoreName');
        console.log(nameEntered.value,'namedEnter Score is',finalScore);
        
        let rawHighScore = localStorage.getItem("highScore");
        let pHighScore;
        if(!rawHighScore){
            console.log("create new ");
            pHighScore =  [ ] ;
        } else {
            pHighScore = JSON.parse (rawHighScore);
        }

        pHighScore.push( {
            name:nameEntered.value,
            score:finalScore,
        });
        localStorage.setItem("highScore",JSON.stringify(pHighScore));

        showHighScore();
        enterName.style.display = 'none';
        questionIndex = 0;
    },{once:true});
    
}

function showHighScore(scoreList){
    let fakeList = [
        {
            name:'foy',
            score: 100,
        },
        {
            name:'foxy',
            score: 1000,
        },
        {
            name:'foxy',
            score: 500,
        },
    ];
    let rawHighScore = localStorage.getItem("highScore");
    if(rawHighScore){
        console.log('Found list so using that instead!');
        fakeList = JSON.parse (rawHighScore);
    }

    fakeList.sort((a,b) => (a.score * -1) - (b.score * -1) );
    /*
    // let's clear these elements
    listEl
    */
    var listEl = document.getElementById("playerScoreList");
    let i = listEl.children.length;
    while(i--){
        listEl.removeChild( listEl.children[i] );
    }

    for(let i = 0;i<fakeList.length;i++){
        console.log("doing list?")
        
        var list = document.createElement("li");
        list.textContent = fakeList[i].name + "  /  " +fakeList[i].score;
        listEl.appendChild(list);
    }
    
    startScreen.style.display = 'none';
    document.querySelector('#highScoreList').style.display = 'flex';

    document.querySelector('#closeHighScore').addEventListener('click',function(){
        document.querySelector('#highScoreList').style.display = 'none';
        startScreen.style.display = 'flex';
    });
    console.log("SHow high Score?");
}

function printQuestion(){
    //restartTimer();
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
    let rawHighScore = localStorage.getItem("highScore");
    let pHighScore;
    if(!rawHighScore){
        console.log("create new ");
        pHighScore = JSON.stringify( [ ] );
        localStorage.setItem("highScore",pHighScore);
    } else {
        pHighScore = JSON.parse (rawHighScore);
    }
    showHighScore();
}


startButton.addEventListener("click", startQuiz);

document.querySelector('#highScore').addEventListener("click",showScoreHideEverything);
document.querySelector('#clearScore').addEventListener("click", function(){
    localStorage.setItem("highScore",JSON.stringify([]));
    showHighScore();
});
