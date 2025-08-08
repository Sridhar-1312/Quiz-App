 
    const questions = [
      {
        question: "Which planet is known as the Red Planet?",
        answers: [
          { text: "Earth", correct: "false" },
          { text: "Mars", correct: "true" },
          { text: "Jupiter", correct: "false" },
          { text: "Venus", correct: "false" }
        ]
      },
      {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
          { text: "William Wordsworth", correct: "false" },
          { text: "William Shakespeare", correct: "true" },
          { text: "Leo Tolstoy", correct: "false" },
          { text: "Charles Dickens", correct: "false" }
        ]
      },
      {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: [
          { text: "Oxygen", correct: "false" },
          { text: "Carbon Dioxide", correct: "true" },
          { text: "Nitrogen", correct: "false" },
          { text: "Hydrogen", correct: "false" }
        ]
      },
      {
        question: "Which country won the FIFA World Cup in 2018?",
        answers: [
          { text: "Germany", correct: "false" },
          { text: "Brazil", correct: "false" },
          { text: "France", correct: "true" },
          { text: "Argentina", correct: "false" }
        ]
      },
      {
        question: "What is the boiling point of water at sea level?",
        answers: [
          { text: "90°C", correct: "false" },
          { text: "100°C", correct: "true" },
          { text: "80°C", correct: "false" },
          { text: "70°C", correct: "false" }
        ]
      }
    ];

    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");

    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      nextButton.innerHTML = "Next";
      showQuestion();
    }

    function showQuestion() {
      resetState();
      let currentQuestion = questions[currentQuestionIndex];
      let questionNo = currentQuestionIndex + 1;
      questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

      currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
          button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
      });
    }

    function resetState() {
      nextButton.style.display = "none";
      while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
      }
    }

    function selectAnswer(e) {
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";

      if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
      } else {
        selectedBtn.classList.add("incorrect");
      }

      Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }
        button.disabled = true;
      });

      nextButton.style.display = "inline-block";
    }

    function showScore() {
      resetState();
      questionElement.innerHTML = `Your Score: ${score} out of ${questions.length}!`;
      nextButton.innerHTML = "Play Again";
      nextButton.style.display = "inline-block";
    }

    function handleNextButton() {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        showScore();
      }
    }

    nextButton.addEventListener("click", () => {
      if (currentQuestionIndex < questions.length) {
        handleNextButton();
      } else {
        startQuiz();
      }
    });

    startQuiz();
 