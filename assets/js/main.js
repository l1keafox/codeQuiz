// Global scope variables. 

let allQuestions =  [
// Quiz data strucutre:
/*
    {   
        question: "Why", // 
        answers: ["ask","why"], // 
        correctAnswer: 1, // 0-1 
        images: url 
        context: after answer text.
    }
*/
    {   
        question: "Would you rather own a horse the size of a cat or a cat the size of a horse", // 
        answers: ["horse the size of a cat","cat the size of a horse","why?"], 
        image: "https://assets3.thrillist.com/v1/image/2542967/600x460/scale;webp=auto;jpeg_quality=60.jpg",
        context: "think of the kids!",
        correctAnswer: 2, // 0-1 
    },
    {   
        question: "Are there birds in Canada?", // 
        image:"https://static01.nyt.com/images/2021/12/10/business/10birds2-inyt/merlin_198728667_3ed9327d-a539-460d-8038-36880f6bb39a-mobileMasterAt3x.jpg",
        answers: ["True","False"], // 
        context: "who knows if canada is even real",
        correctAnswer: 2, // 0-1 
    },
    {   
        question: "Do rainbows Exist in North Korea?", // 
        image:"https://media.gettyimages.com/photos/the-end-of-a-rainbow-with-a-field-in-the-foreground-picture-id104637612?s=612x612",
        answers: ["True","False","Rainbows"], // 
        correctAnswer: 1, // 0-1 
    },
    {   
        question: "Do car tires get tired? Do they have to retire?", // 
        image:"https://www.hankooktire.com/content/dam/hankooktire/local/img/main/promoted-product/H750A-2.jpg",
        answers: ["True","False","tired?","retire"], // 
        context: " The tire is 80 feet tall and weighs 12 tons.",
        correctAnswer: 3, // 0-1 
    },
    
];


let questionIndex = 0; // tracks which question is current
let currentScore; // tracks current score of player
let currentQuestionTimer; // Tracks time left
let currentTimerID; // Timer ID that needs to be cleared
const qTimer = 60; // Const game timer.


/*
    DOM objects
*/
let startButton = document.querySelector('#startButton');
let quizQuestion = document.querySelector('#question');
let quizImage = document.querySelector('#questionImage');
let answersList = document.querySelector('#answers');
let startScreen = document.querySelector('#startQuizScreen');
let quizScreen = document.querySelector('#quizScreen');
let results = document.querySelector('#results');
let context = document.querySelector('#context');
let timerDisplay = document.querySelector('#currentTime');
let enterName = document.querySelector('#enterName');
let scorePrint = document.querySelector('#printScore');


function startQuiz(event){
    /*
         Start of the game, starts from an "click" on the start button
    */
    console.log(event,"Starting Quiz");
    // Clear game text and reset game stats.
    currentScore = 0;
    currentQuestionTimer = 60;
    results.textContent = " ";
    context.textContent = " ";
    document.querySelector('#currentScore').textContent = "score: "+currentScore;
    startScreen.style.display = 'none'; // Remove start screen
    quizScreen.style.display = 'flex'; // Add in quiz screen
    printQuestion(); // Display Questions
    timerDisplay.textContent = 'timer:'+currentQuestionTimer; // Display Timer

    var timerInterval = setInterval(function(){ // This is adding the timer and Game over condidtion.
        currentQuestionTimer--;
        timerDisplay.textContent = 'timer:'+currentQuestionTimer;
        if(!currentQuestionTimer ){
            console.log('Game over!');
            quizScreen.style.display = 'none';
            recordHighScore();
        }
    },1000);
    currentTimerID = timerInterval; // stores timerID for removal later
    answersList.addEventListener("click",answerQuiz); // Adds listener for answer buttons
}


function printQuestion(){
    // answersList needs to clear of any old buttons.
    let oldButtons = document.querySelectorAll('.anAnswer');
    for(let i = 0; i < oldButtons.length;i++){
        oldButtons[i].remove();
    }

    let oneQuestion = allQuestions[questionIndex];
    quizQuestion.textContent = oneQuestion.question;

    if( oneQuestion.image ){ // Add image other wise
        quizImage.setAttribute("src",oneQuestion.image );
    } else { // clear image
        quizImage.setAttribute("src"," " );
    }

    document.querySelector('#currentScore').textContent = "score: "+currentScore;
    for(let i = 0;i < oneQuestion.answers.length;i++){
        var answerButton = document.createElement('button');
        answerButton.textContent = oneQuestion.answers[i];
        answerButton.setAttribute('data-buttonID',i);
        answerButton.setAttribute('class','anAnswer');
        answersList.appendChild(answerButton);
    }
}


function answerQuiz(event){ // Event 
    var element = event.target;
    var buttonAnswer = element.getAttribute('data-buttonID'); // get data-buttonID for this button
    let oneQuestion = allQuestions[questionIndex]; // Get current question data
    let thisAnswer;

    if( oneQuestion.correctAnswer == buttonAnswer){
        thisAnswer = true;
    } else {
        thisAnswer = false;
    }

    if(thisAnswer){
        console.log("GOOD ANSWER");
        currentScore += 100;
        results.textContent = thisAnswer + '+100 points';
        context.textContent = allQuestions[questionIndex].context;
    } else {
        console.log("BAD ANSWER/TIMER");
        currentScore -= 50;
        currentQuestionTimer-=5;
        results.textContent = thisAnswer + '-50 points, -5 sec';
        context.textContent = allQuestions[questionIndex].context;
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
    clearInterval(currentTimerID);
    
    enterName.style.display = 'flex';
    let finalScore = currentScore + (currentQuestionTimer*100) ;
    if(currentScore < 0){
        finalScore = 1;
    }
    scorePrint.textContent = "Your score is : "+finalScore;
    
        document.querySelector('#submitName').addEventListener("click", function(){
            // this is where we add the name and setup for new game.
            let nameEntered = document.querySelector('#scoreName');
            
            let rawHighScore = localStorage.getItem("highScore");
            let pHighScore;
            if(!rawHighScore){
                pHighScore =  [ ] ;
            } else {
                pHighScore = JSON.parse (rawHighScore);
            }
            if(nameEntered.value === "" || finalScore <= 1 ){
                console.log("NOTHING entered");
            } else {
                pHighScore.push( {
                    name:nameEntered.value,
                    score:finalScore,
                });
            }
    
            localStorage.setItem("highScore",JSON.stringify(pHighScore));
            showHighScore();
            enterName.style.display = 'none';
            questionIndex = 0;
        },{once:true});
    

}

function showHighScore(scoreList){
    let fakeList = [
        {
            name:'NOT',
            score: 100,
        },
        {
            name:'WORKING',
            score: 1000,
        },
        {
            name:'LIST',
            score: 500,
        },
    ];
    let rawHighScore = localStorage.getItem("highScore");
    if(rawHighScore){
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
}


function showScoreHideEverything(event){
    let rawHighScore = localStorage.getItem("highScore");
    let pHighScore;
    if(!rawHighScore){
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
