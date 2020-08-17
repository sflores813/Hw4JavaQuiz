var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')

var shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
var selectedButton = e.target
var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<html>", correct: false },
      { text: "<script>", correct: true },
      { text: "<div>", correct: false },
    ]
  },
  {
    question: "What should appear at the very end of your JavaScript?",
    answers: [
      { text: "</script>", correct: true },
      { text: "script", correct: false },
      { text: "<script/>", correct: false },
      { text: "*script*", correct: false },
    ]
  },
  {
    question: " What are variables used for in JavaScript Programs?",
    answers: [
      { text: "Storing numbers, dates, or other values", correct: true },
      { text: "Varying randomly", correct: false },
      { text: "Causing high-school algebra flashbacks", correct: false },
      { text: "None of the above", correct: false },
    ]
  },
  {
    question: 'When a user views a page containing a JavaScript program, which machine actually executes the script?',
    answers: [
      { text: "The User's machine running a Web browser", correct: true },
      { text: "The web server", correct: false },
      { text: "A central machine deep within Netscape's corporate offices", correct: false },
      { text: "None of the Above", correct: false },
    ]
  }
]
