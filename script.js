const quizData = [
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Colorful Style Script", "Computer Style System"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which language is used for web apps?",
    options: ["Python", "JavaScript", "Java"],
    answer: "JavaScript"
  },
  {
    question: "HTML is used to?",
    options: ["Structure content", "Style pages", "Connect databases"],
    answer: "Structure content"
  },
  {
    question: "What is the purpose of the <head> tag in HTML?",
    options: [
      "To display the header on the page",
      "To store metadata and links to scripts/styles",
      "To show the title inside the body"
    ],
    answer: "To store metadata and links to scripts/styles"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["// comment", "/* comment */", "# comment"],
    answer: "// comment"
  }
];

let currentQuestion = 0;
let score = 0;
let jokes = [];

const quizContainer = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const resultContainer = document.getElementById("result");
const jokeList = document.getElementById("jokeList");

function loadQuiz() {
  const q = quizData[currentQuestion];
  quizContainer.innerHTML = `
    <p>${q.question}</p>
    <div class="options">
      ${q.options.map(opt => `
        <label><input type="radio" name="option" value="${opt}"> ${opt}</label>
      `).join('')}
    </div>
  `;

  // Show corresponding joke
  displayJoke(currentQuestion);
}

function displayJoke(index) {
  const joke = jokes[index];
  if (joke) {
    jokeList.innerHTML = `<li>${joke.setup} - ${joke.punchline}</li>`;
  } else {
    jokeList.innerHTML = `<li>😅 No joke available</li>`;
  }
}

function showResult() {
  quizContainer.innerHTML = "";
  resultContainer.innerHTML = `<strong>You scored ${score} out of ${quizData.length}</strong>`;
  nextBtn.style.display = "none";
  jokeList.innerHTML = "<li>Thanks for playing! 🎉</li>";
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an option!");
    return;
  }

  if (selected.value === quizData[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
});

function loadJokes() {
  fetch("https://official-joke-api.appspot.com/jokes/programming/ten")
    .then(res => res.json())
    .then(data => {
      jokes = data.slice(0, 5); // Only need 5 jokes
      loadQuiz(); // Load first quiz only after jokes are fetched
    })
    .catch(err => {
      console.error("Joke fetch failed", err);
      jokes = Array(5).fill({ setup: "Oops!", punchline: "No joke available." });
      loadQuiz();
    });
}

// Initialize everything
loadJokes();
