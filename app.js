// Define UI Vars

const form = document.querySelector("#day-form");
const taskInput = document.querySelector("#task");
const hoursInput = document.querySelector("#hours");
const minutesInput = document.querySelector("#minutes");
const day = document.querySelector("#day");
const menu = document.querySelector("#menu");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Add day data event
  form.addEventListener("submit", addDayData);
}

// Add Day Data
function addDayData(e) {
  if (taskInput.value === "") {
    alert("Add tasks done");
  }
  if (hoursInput.value === "") {
    alert("Add hours");
  }
  if (hoursInput.value === "") {
    alert("Add minutes");
  }

  // Create new Data element
  const mainDiv = document.createElement("div");
  // Add class
  mainDiv.className = "bg-light text-dark rounded m-2 p-2";

  // Create h6 node
  const h6 = document.createElement("h6");
  // Add class
  h6.className = "font-weight-bold";
  h6.innerHTML = "Day " + day.value;

  mainDiv.appendChild(h6);

  // Create day description node
  const dayDescription = document.createElement("div");
  // Add class
  dayDescription.className = "day-description py-2 mb-2 rounded border px-2";

  dayDescription.innerHTML = taskInput.value;

  mainDiv.appendChild(dayDescription);

  // Create time spent node
  const timeSpent = document.createElement("div");

  timeSpent.innerHTML =
    "Time spent: " + hoursInput.value + "h " + minutesInput.value + "min";

  mainDiv.appendChild(timeSpent);

  // append mainDiv to menu
  menu.appendChild(mainDiv);

  console.log(mainDiv);

  e.preventDefault();
}
