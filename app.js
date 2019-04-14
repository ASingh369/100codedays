// Define UI Vars

const form = document.querySelector("#day-form");
const taskInput = document.querySelector("#task");
const hoursInput = document.querySelector("#hours");
const minutesInput = document.querySelector("#minutes");
const menu = document.querySelector("#menu");
const allDays = document.querySelector("#all-days");
const ifNoTasks = document.querySelector("#if-no-task");
const ifNoHours = document.querySelector("#if-no-hours");
const ifNoMinutes = document.querySelector("#if-no-minutes");

let selectedDay; // used when user selects a particular day

// update days list
updateDaysList();

function updateDaysList() {
  for (let i = 1; i <= 100; i++) {
    // Create day element
    const day = document.createElement("div");
    // Add class
    day.className = "d-inline pointer bg-light text-dark m-1 px-2 py-1 rounded";

    day.innerHTML = i;

    // add to list of all days
    allDays.appendChild(day);
  }
}

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load Event
  document.addEventListener("DOMContentLoaded", getDaysData);

  // Add day data event
  form.addEventListener("submit", addDayData);

  // select day
  allDays.addEventListener("click", selectDay);
}

// Get days data from local storage
function getDaysData() {
  let days;
  if (localStorage.getItem("days") === null) {
    days = [];
  } else {
    days = JSON.parse(localStorage.getItem("days"));
  }

  days.forEach(function(day) {
    // Create new Data element
    const mainDiv = document.createElement("div");
    // Add class
    mainDiv.className = "bg-light text-dark rounded m-2 p-2";

    // Create h6 node
    const h6 = document.createElement("h6");
    // Add class
    h6.className = "font-weight-bold";
    h6.innerHTML = "Day " + day[0];

    mainDiv.appendChild(h6);

    // Create day description node
    const dayDescription = document.createElement("div");
    // Add class
    dayDescription.className = "day-description py-2 mb-2 rounded border px-2";

    dayDescription.innerHTML = day[1];

    mainDiv.appendChild(dayDescription);

    // Create time spent node
    const timeSpent = document.createElement("div");

    timeSpent.innerHTML = "Time spent: " + day[2] + "h " + day[3] + "min";

    mainDiv.appendChild(timeSpent);

    // append mainDiv to menu
    menu.appendChild(mainDiv);
  });
}

// Add Day Data
function addDayData(e) {
  ifNoTasks.style.display = "none";
  ifNoHours.style.display = "none";
  ifNoMinutes.style.display = "none";
  if (
    taskInput.value === "" ||
    hoursInput.value === "" ||
    minutesInput.value === ""
  ) {
    if (taskInput.value === "") {
      ifNoTasks.style.display = "block";
    }
    if (hoursInput.value === "") {
      ifNoHours.style.display = "block";
    }
    if (minutesInput.value === "") {
      ifNoMinutes.style.display = "block";
    }
  } else {
    // Create new Data element
    const mainDiv = document.createElement("div");
    // Add class
    mainDiv.className = "bg-light text-dark rounded m-2 p-2";

    // Create h6 node
    const h6 = document.createElement("h6");
    // Add class
    h6.className = "font-weight-bold";
    h6.innerHTML = "Day " + selectedDay;

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

    // add to local storage as well
    storeDayDataInLocalStorage(
      selectedDay,
      taskInput.value,
      hoursInput.value,
      minutesInput.value
    );

    // reset variables
    taskInput.value = "";
    hoursInput.value = "";
    minutesInput.value = "";

    $("#formModal").modal("hide");
  }

  e.preventDefault();
}

// select day
function selectDay(e) {
  if (e.target.classList.contains("pointer")) {
    selectedDay = parseInt(e.target.innerHTML);
    document.querySelector("#day-to-add").innerHTML = "Day " + selectedDay;
    $("#daysModal").modal("hide");

    // hide no input errors and open add day modal
    ifNoTasks.style.display = "none";
    ifNoHours.style.display = "none";
    ifNoMinutes.style.display = "none";
    $("#formModal").modal();
  }
}

// Store day data in local storage
function storeDayDataInLocalStorage(selectedDay, task, hours, minutes) {
  let days;
  if (localStorage.getItem("days") === null) {
    days = [];
  } else {
    days = JSON.parse(localStorage.getItem("days"));
  }

  days.push([selectedDay, task, hours, minutes]);

  localStorage.setItem("days", JSON.stringify(days));
}
