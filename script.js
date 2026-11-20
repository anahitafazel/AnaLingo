const questions = [
    {
        question: "She _____ to school every day.",
        answers: ["go", "goes", "going", "gone"],
        correct: 1
    },
    {
        question: "I _____ a movie yesterday.",
        answers: ["watch", "watches", "watched", "watching"],
        correct: 2
    },
    {
        question: "They _____ playing football now.",
        answers: ["is", "are", "was", "be"],
        correct: 1
    },
    {
        question: "He has _____ his homework.",
        answers: ["finish", "finished", "finishing", "finishes"],
        correct: 1
    },
    {
        question: "If I have time, I _____ you tomorrow.",
        answers: ["call", "called", "will call", "calling"],
        correct: 2
    }
];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
const questionNumber = document.querySelector(".question-number");
const questionTitle = document.querySelector(".test-card h2");
const questionText = document.querySelector(".question");
const answersContainer = document.querySelector(".answers");
const nextButton = document.querySelector(".next-btn");
const progressBar = document.querySelector(".progress-bar");
function loadQuestion() {
    const question = questions[currentQuestion];
    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;
    questionTitle.textContent =
        "Choose the correct answer:";
    questionText.textContent =
        question.question;
    answersContainer.innerHTML = "";
    selectedAnswer = null;
    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.classList.add("answer");
        button.textContent =
            `${String.fromCharCode(65 + index)}) ${answer}`;
        button.addEventListener("click", function () {
            document.querySelectorAll(".answer").forEach(btn => {
                btn.style.borderColor = "transparent";
                btn.style.background = "#f7f8fc";
            });
            button.style.borderColor = "#5b4bdb";
            button.style.background = "#eeeaff";
            selectedAnswer = index;
        });
        answersContainer.appendChild(button);
    });
    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;
    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Finish Test ✓";
    } else {
        nextButton.textContent = "Next Question →";
    }
}
nextButton.addEventListener("click", function () {
    if (selectedAnswer === null) {
        alert("Please choose an answer first.");
        return;
    }
    if (selectedAnswer === questions[currentQuestion].correct) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});
function showResult() {
    let level;
    if (score <= 1) {
        level = "A1 - Beginner";
    } else if (score === 2) {
        level = "A2 - Elementary";
    } else if (score === 3) {
        level = "B1 - Intermediate";
    } else if (score === 4) {
        level = "B2 - Upper Intermediate";
    } else {
        level = "C1 - Advanced";
    }
    document.querySelector(".test-card").innerHTML = `
        <div class="result">
            <div style="font-size: 60px;">
                🎉
            </div>
            <h2>
                Test Completed!
            </h2>
            <p>
                Your score is
                <strong>${score} / ${questions.length}</strong>
            </p>
            <h3>
                Your English Level
            </h3>
            <div class="level-result">
                ${level}
            </div>
            <a href="courses.html" class="course-btn">
                View Recommended Courses
            </a>
        </div>
    `;
}
loadQuestion();