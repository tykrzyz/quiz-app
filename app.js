/**
 * Example store structure
 */
'use strict';
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What color is broccoli?',
      answers: [
        'red',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: [
        '1970',
        '2015',
        '2020',
        '2005'
      ],
      correctAnswer: '2020'
    },
    {
      question: 'What is the answer to life, the universe, and everything?',
      answers: [
        '42',
        'Nothing',
        'What?',
        'Brownies'
      ],
      correctAnswer: '42'
    },
    {
      question: 'Question 4',
      answers: [
        '1970',
        '2015',
        '2019',
        '2005'
      ],
      correctAnswer: '2019'
    },
    {
      question: 'Question 5',
      answers: [
        '1970',
        '2015',
        '2019',
        '2005'
      ],
      correctAnswer: '2019'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  gotRight: false,
  goToCheck: false
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

function generateMainPage(){
  return `<div class='main-page'>
            <p>Answer my questions!</p>
            <button type='button'>Start!</button>
          </div>`;
}

function generateQuestionPage(){
  let question = store.questions[store.questionNumber];
  let html = '<div class= "question-page">';
  html +=      `<h2>Question ${store.questionNumber + 1}</h2>
                <p>${question.question}</p>
                <ul>`;
  for(let i = 0; i < 4; i++){
    html +=       `<li><input type="radio" required="required" id="Choice ${i+1}" name="Answer" value="${question.answers[i]}"`;
    html +=       `<label>${question.answers[i]}</label><br></li>`;
  }
  html +=      '</ul>';
  html+= '<button type="submit">Check</button>';
  store.goToCheck = true;
  return html;

}

function generateWrongAnswerPage(){
  store.goToCheck = false;
  return `<div class="result-page">
            <h2>Wrong</h2>
            <p>The correct answer was:</p>
            <p>${store.questions[store.questionNumber].correctAnswer}</p>
            <br>
            <p><b>CORRECT:</b> ${store.score}</p>
            <p><b>INCORRECT:</b> ${store.questionNumber-store.score+1}</p>
            <button type="button">Next</button>
          </div>`;
}

function generateCorrectAnswerPage(){
  store.goToCheck = false;
  store.score++;
  return `<div class="result-page">
            <h2>CORRECT!</h2>
            <p>The correct answer was:</p>
            <p>${store.questions[store.questionNumber].correctAnswer}</p>
            <br>
            <p><b>CORRECT:</b> ${store.score}</p>
            <p><b>INCORRECT:</b> ${store.questionNumber-store.score + 1}</p>
            <button type="button">Next</button>
          </div>`;
}

function generateScorePage(){
  return `<div class="final-results-page">
            <h2>Final Results</h2>
            <p><b>CORRECT:</b> ${store.score}</p>
            <p><b>INCORRECT:</b> ${store.questionNumber-store.score}</p>
            <button type="button">Retry?</button>
          </div>`;
}

/********** RENDER FUNCTION(S) **********/

function render(){
  if(!store.quizStarted){
    $('main').html(generateMainPage());
    handleStartClick();
  }
  else if(store.goToCheck){
    if(store.gotRight){
      $('main').html(generateCorrectAnswerPage());
    }
    else{
      $('main').html(generateWrongAnswerPage());
    }
    store.questionNumber++;
    handleNextQuestionClick();
  }
  else if(store.questionNumber < store.questions.length){
    $('main').html(generateQuestionPage());
    handleCheckClick();
  }
  else{
    $('main').html(generateScorePage());
    handleRetryClick();
  }
}


/********** EVENT HANDLER FUNCTIONS **********/

function handleStartClick(){
  $('.main-page').on('click', 'button', e =>{
    store.quizStarted = true;
    render();
  });
}

function handleCheckClick(){
  $('.question-page').on('click', 'button[type="submit"]', e =>{
    console.log($('input:checked').val());
    if($('input:checked').val() === store.questions[store.questionNumber].correctAnswer){
      store.gotRight = true;
    }
    else{
      store.gotRight = false;
    }
    render();
  });
}

function handleNextQuestionClick(){
  $('.result-page').on('click', 'button', e =>{
    render();
  });
}

function handleRetryClick(){
  $('.final-results-page').on('click', 'button', e =>{
    store.score = 0;
    store.quizStarted = false;
    store.questionNumber = 0;
    render();
  });
}

function main(){
  render();
}
$(main);