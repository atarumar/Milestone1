const cardsContainer = document.getElementById("cards-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const currentElement = document.getElementById("current");
const submitAnswerButton = document.getElementById("submitAnswer");
const userAnswerInput = document.getElementById("userAnswer");

let currentActiveCard = 0;
const cardsElement = [];


const cardsData = [
  { question: "What is digital privacy?", answer: "Protecting data" },
  { question: "What does cyberbullying involve?", answer: "Online harassment" },
  { question: "What is plagiarism?", answer: "Copying without credit" },
  { question: "What is online consent?", answer: "Agreeing to terms" },
  { question: "What is netiquette?", answer: "Online etiquette" },
  { question: "What is data misuse?", answer: "Unauthorized use" },
  { question: "What is digital footprint?", answer: "Online activity trail" }
];


function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}


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


function updateCurrentText() {
  currentElement.innerText = `${currentActiveCard + 1}/${cardsElement.length}`;
}

submitAnswerButton.addEventListener("click", () => {
  const userAnswer = userAnswerInput.value.trim().toLowerCase();
  const correctAnswer = cardsData[currentActiveCard].answer.toLowerCase();

  


  cardsElement[currentActiveCard].classList.add("show-answer");
});


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


createCards();


const resultText = document.getElementById("result");


submitButton.addEventListener("click", () => {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = cardsData[currentActiveCard].answer.toLowerCase();

  if (userAnswer === correctAnswer) {
    resultText.innerText = "Correct!";
    resultText.style.color = "green"; 
    cardsElement[currentActiveCard].classList.add("show-answer"); 
  } else {
    resultText.innerText = `Incorrect! The correct answer is: ${cardsData[currentActiveCard].answer}`;
    resultText.style.color = "red"; 
    cardsElement[currentActiveCard].classList.add("show-answer"); 
  }
});