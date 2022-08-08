// Quiz data strucutre:

// questions : "What do you do?";
// answers : ['something','everything','nothing','your mom'];
// correctAnswer : 4;
let allQuestions =  [
    {   
        question: "Why",
        answers: ["ask","why"],
        correctAnswer: 1,
    }
];

let startButton = document.querySelector('#startButton');
function startQuiz(event){
    console.log(event,"Starting Quiz");
    let startScreen = document.querySelector('#startQuizScreen');

    let quizScreen = document.querySelector('#quizScreen');
    let quizQuestion = document.querySelector('#question');
    let answersList = document.querySelector('#answers');
    let results = document.querySelector('#results');

    /*
    Doesn't work this doesn't
    */
    startScreen.style.display = 'none';
    quizScreen.style.display = 'flex';

    let oneQuestion = allQuestions[0];

    quizQuestion.textContent = oneQuestion.question;
    

    for(let i = 0;i < oneQuestion.answers.length;i++){
        console.log('Adding questions');
        var answerButton = document.createElement('button');
        answerButton.textContent = oneQuestion.answers[i];
        console.log(answerButton);
        answersList.appendChild(answerButton);

    }

    for(let i in allQuestions){
        console.log(i,allQuestions[i]);
    }
    console.log(allQuestions[0]);
    // quizScreen.textContent
}

console.log(startButton);
startButton.addEventListener("click", startQuiz);