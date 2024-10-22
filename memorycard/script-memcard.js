const cardsContainer = document.getElementById("cards-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const currentElement = document.getElementById("current");
const submitAnswerButton = document.getElementById("submitAnswer");
const userAnswerInput = document.getElementById("userAnswer");

let currentActiveCard = 0;
const cardsElement = [];

// The digital ethics questions and answers
const cardsData = [
  { question: "What is digital privacy?", answer: "Protecting data" },
  { question: "What does cyberbullying involve?", answer: "Online harassment" },
  { question: "What is plagiarism?", answer: "Copying without credit" },
  { question: "What is online consent?", answer: "Agreeing to terms" },
  { question: "What is netiquette?", answer: "Online etiquette" },
  { question: "What is data misuse?", answer: "Unauthorized use" },
  { question: "What is digital footprint?", answer: "Online activity trail" }
];

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index === 0) card.classList.add("active");
  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${data.question}</p>
      </div>
      <div class="inner-card-back">
        <p>${data.answer}</p>
      </div>
    </div>
  `;
  cardsElement.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
}

// Update the current card number display
function updateCurrentText() {
  currentElement.innerText = `${currentActiveCard + 1}/${cardsElement.length}`;
}

// Show the answer by flipping the card after submission
submitAnswerButton.addEventListener("click", () => {
  const userAnswer = userAnswerInput.value.trim().toLowerCase();
  const correctAnswer = cardsData[currentActiveCard].answer.toLowerCase();

  

  // Flip the card to reveal the correct answer
  cardsElement[currentActiveCard].classList.add("show-answer");
});

// Next/Prev buttons to navigate through cards
nextButton.addEventListener("click", () => {
  cardsElement[currentActiveCard].className = "card left";
  currentActiveCard++;
  if (currentActiveCard > cardsElement.length - 1) {
    currentActiveCard = 0;
  }
  cardsElement[currentActiveCard].className = "card active";
  updateCurrentText();
});

prevButton.addEventListener("click", () => {
  cardsElement[currentActiveCard].className = "card right";
  currentActiveCard--;
  if (currentActiveCard < 0) {
    currentActiveCard = cardsElement.length - 1;
  }
  cardsElement[currentActiveCard].className = "card active";
  updateCurrentText();
});

// Initialize the cards
createCards();


const resultText = document.getElementById("result");

// Modify the submitAnswer function
submitButton.addEventListener("click", () => {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = cardsData[currentActiveCard].answer.toLowerCase();

  if (userAnswer === correctAnswer) {
    resultText.innerText = "Correct!";
    resultText.style.color = "green"; // Change the color to green for correct answers
    cardsElement[currentActiveCard].classList.add("show-answer"); // Flip the card to show the answer
  } else {
    resultText.innerText = `Incorrect! The correct answer is: ${cardsData[currentActiveCard].answer}`;
    resultText.style.color = "red"; // Change the color to red for incorrect answers
    cardsElement[currentActiveCard].classList.add("show-answer"); // Flip the card to show the answer
  }
});