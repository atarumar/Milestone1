const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const secureHomeNetwork = [
  "Change default router passwords",
  "Enable WPA3 encryption",
  "Set up a guest network",
  "Use a strong password for your Wi-Fi network",
  "Update the router firmware",
  "Disable remote management",
  "Enable firewall protection",
  "Monitor network traffic for unusual activity",
  "Regularly review security settings"
];


const listItems = [];

let dragStartIndex;

function createList() {
  const newList = [...secureHomeNetwork];
  newList
    .map((person) => ({ value: person, sort: Math.random() })) // randomize list
    .sort((a, b) => a.sort - b.sort) // generate new order
    .map((person) => person.value) // retrieve original strings
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });
  addListeners();
}

function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragOver(e) {
  e.preventDefault(); // dragDrop is not executed otherwise
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  // Get Items
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");
  // Swap Items
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable p").innerText.trim();
    if (personName !== secureHomeNetwork[index].trim()) {
      listItem.classList.add("wrong");
      listItem.classList.remove("right");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}


// Event Listeners
function addListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}
const nextButton = document.getElementById("next");

nextButton.addEventListener("click", () => {

  alert("Proceeding to the next challenge!");

});


check.addEventListener("click", checkOrder);

// Init
createList();
