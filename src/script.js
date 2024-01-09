const questions = [
    {
        question: "What is the best programming language?",
        answers: [
            {text: "Java", correct: false},
            {text: "JavaScript", correct: true},
            {text: "Python", correct: false},
            {text: "C++", correct: false},
        ]
    },
    {
        question: "The best JS framework",
        answers: [
            {text: "React", correct: true},
            {text: "Angular", correct: false},
            {text: "Vue", correct: false},
            {text: "Other:)", correct: false},
        ]
    },
    {
        question: "Where you can find the best JS tutors?",
        answers: [
            {text: "Google", correct: true},
            {text: "GitHub", correct: false},
            {text: "YouTube", correct: false},
            {text: "LinkedIn", correct: false},
        ]
    },
    {
        question: "Choose the best type of learning programming",
        answers: [
            {text: "Chilling", correct: false},
            {text: "Theory", correct: false},
            {text: "Reading Books", correct: false},
            {text: "Write Code", correct: true},
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answers');
const nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion();
}

const showQuestion = () => {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add("border-2", "pl-3", "pt-3", "pb-3", "w-full", "mb-3", "border-gray-600", "rounded-xl", "text-left", "hover:enabled:bg-gray-700", "hover:enabled:text-white", "hover:enabled:transition", "hover:enabled:duration-500", "hover:disabled:cursor-not-allowed")
        answerButton.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

const resetState = () => {
    nextButton.classList.add('hidden')
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}

const selectAnswer = (e) => {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"
    console.log(selectedBtn)
    if (isCorrect) {
        selectedBtn.classList.add("bg-green-300")
        score++
    } else {
        selectedBtn.classList.add("bg-red-300")
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("bg-green-300")
        }
        button.disabled = true;
    })
    nextButton.classList.remove("hidden")
    nextButton.classList.add("block")
}

const showScore = () => {
    resetState()
    questionElement.innerHTML = `Your score - ${score} of ${questions.length}!`
    nextButton.innerHTML = "Replay"
    nextButton.classList.remove("hidden")
    nextButton.classList.add("block")
}
const handleNextButton = () => {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener("click", (e) => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }

})

startQuiz()


