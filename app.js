/**
 * Example store structure
 */
'use strict';
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What is Audi\'s all-wheel drive system called?',
      answers: [
        'Audi 4x4',
        'Allroad',
        'Audi Quattro',
        'Audi Allwheel'
      ],
      correctAnswer: 'Audi Quattro'
    },
    {
      question: 'When was the original Audi Quattro (First AWD car) introduced?',
      answers: [
        '1970',
        '1980',
        '1990',
        '2000'
      ],
      correctAnswer: '1980'
    },
    {
      question: 'The Name of Audi\'s street legal supercar is:',
      answers: [
        'R8',
        'RS3',
        'A4',
        'Q5'
      ],
      correctAnswer: 'R8'
    },
    {
      question: 'Which company owns Audi?',
      answers: [
        'BMW',
        'Toyota',
        'Volkswagen',
        'Lexus'
      ],
      correctAnswer: 'Volkswagen'
    },
    {
      question: 'What does the Audi Logo represent?',
      answers: [
        'The racing history behind Audi',
        'Audi\'s former history with the Olympics',
        'The four pillars of Audi\'s mission',
        'The four companies that started Audi'
      ],
      correctAnswer: 'The four companies that started Audi'
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
  return `<div class='main-page box'>
            <div><h2>How well do you know Audi?</h2>
            <h2>Click start to find out!</h2>
            <button type='button'>Start!</button></div>
          </div>`;
}

function generateQuestionPage(){
  let question = store.questions[store.questionNumber];
  let html = '<div class= "question-page box">';
  html +=      `<div><h2>Question ${store.questionNumber + 1}</h2>
                <p>${question.question}</p>
                <form>
                <ul>`;
  for(let i = 0; i < 4; i++){
    html +=       `<li><input type="radio" required="required" id="Choice ${i+1}" name="Answer" value="${question.answers[i]}"`;
    html +=       `<label>${question.answers[i]}</label><br></li>`;
  }
  html +=      '</ul>';
  html += '<input type="submit" value="Check"></form>';
  html += '</div></div>';
  store.goToCheck = true;
  return html;

}

function generateWrongAnswerPage(){
  store.goToCheck = false;
  return `<div class="result-page box">
            <div><h2>Wrong</h2>
            <p>The correct answer was:</p>
            <p>${store.questions[store.questionNumber].correctAnswer}</p>
            <p><b>CORRECT:</b> ${store.score}</p>
            <p><b>INCORRECT:</b> ${store.questionNumber-store.score+1}</p>
            <button type="button">Next</button>
          </div></div>`;
}

function generateCorrectAnswerPage(){
  store.goToCheck = false;
  store.score++;
  return `<div class="result-page box">
            <div><h2>CORRECT!</h2>
            <p>The correct answer was:</p>
            <p>${store.questions[store.questionNumber].correctAnswer}</p>
            <p><b>CORRECT:</b> ${store.score}</p>
            <p><b>INCORRECT:</b> ${store.questionNumber-store.score + 1}</p>
            <button type="button">Next</button>
          </div></div>`;
}

function generateScorePage(){
  return `<div class="final-results-page box">
            <div><h2>Final Results</h2>
            <p><b>CORRECT:</b> ${store.score}</p>
            <p><b>INCORRECT:</b> ${store.questionNumber-store.score}</p>
            <button type="button">Retry?</button>
          </div></div>`;
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
  $('.question-page').on('submit', e =>{
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