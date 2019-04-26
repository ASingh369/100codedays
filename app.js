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
const daysLeft = document.querySelector("#days-left");
const totalTimeSpent = document.querySelector("#total-time-spent");
const progress = document.querySelector("#progress");
const leftArrow = document.querySelector("#left-arrow");
const rightArrow = document.querySelector("#right-arrow");
const restart = document.querySelector("#restart");
const addTag = document.querySelector("#add-tag");

let selectedDay; // used when user selects a particular day

// position left and right arrows
positionArrows();

// update days list
updateDaysList();

function updateDaysList() {
  let days;
  if (localStorage.getItem("days") === null) {
    days = [];
  } else {
    days = JSON.parse(localStorage.getItem("days"));
  }

  for (let i = 1; i <= 100; i++) {
    // Create day element
    const day = document.createElement("div");

    // Add class
    day.className = "d-inline pointer bg-light text-dark m-1 px-2 py-1 rounded";

    // Change class of the already done days
    days.forEach(function(storedDay) {
      if (storedDay[0] == i) {
        day.className =
          "d-inline pointer bg-success text-light m-1 px-2 py-1 rounded";
      }
    });

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

  // Position arrows on window resize
  window.addEventListener("resize", positionArrows);

  // Scroll events
  leftArrow.addEventListener("click", scrollLeft);
  rightArrow.addEventListener("click", scrollRight);

  // remove and add arrows display
  setInterval(leftCursor, 100);
  setInterval(rightCursor, 100);

  // clear local storage
  restart.addEventListener("click", clearLocalStorage);
}

// Get days data from local storage
function getDaysData() {
  let days;
  if (localStorage.getItem("days") === null) {
    days = [];
  } else {
    days = JSON.parse(localStorage.getItem("days"));
  }

  // Sort days by day number
  for (let i = 0; i < days.length; i++) {
    let max = i;
    for (let j = i + 1; j < days.length; j++) {
      if (days[max][0] < days[j][0]) {
        max = j;
      }
    }
    let temp = days[max];
    days[max] = days[i];
    days[i] = temp;
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
    dayDescription.className =
      "day-description shadow py-2 mb-2 rounded border px-2";

    dayDescription.innerHTML = day[1];

    mainDiv.appendChild(dayDescription);

    // Create time spent node
    const timeSpent = document.createElement("div");

    timeSpent.innerHTML = "Time spent: " + day[2] + "h " + day[3] + "min";

    mainDiv.appendChild(timeSpent);

    // append mainDiv to menu
    menu.appendChild(mainDiv);
  });

  // update footer data

  daysLeft.innerHTML = 100 - days.length;
  progress.style.width = days.length + "%";

  // Calculate total time spent
  let totalMinutes = 0;
  days.forEach(function(day) {
    totalMinutes += parseInt(day[2]) * 60;
    totalMinutes += parseInt(day[3]);
  });
  totalTimeSpent.innerHTML =
    parseInt(totalMinutes / 60) + "h " + (totalMinutes % 60) + "min";

  // hide add tag if all 100 days are completed
  if (days.length == 100) {
    addTag.style.display = "none";
  }
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
    // add to local storage as well
    storeDayDataInLocalStorage(
      selectedDay,
      taskInput.value,
      hoursInput.value,
      minutesInput.value
    );

    location.reload();
  }

  e.preventDefault();
}

// select day
function selectDay(e) {
  if (e.target.classList.contains("pointer")) {
    selectedDay = parseInt(e.target.innerHTML);
    document.querySelector("#day-to-add").innerHTML = "Day " + selectedDay;
    $("#daysModal").modal("hide");

    let days;
    if (localStorage.getItem("days") === null) {
      days = [];
    } else {
      days = JSON.parse(localStorage.getItem("days"));
    }

    // Make default form values empty
    taskInput.value = "";
    hoursInput.value = "";
    minutesInput.value = "";

    // if day is already stored, prefill form value
    days.forEach(function(storedDay) {
      if (storedDay[0] == selectedDay) {
        taskInput.value = storedDay[1];
        hoursInput.value = storedDay[2];
        minutesInput.value = storedDay[3];
      }
    });

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

// position left and right arrows
function positionArrows() {
  // Position left arrow
  leftArrow.style.left = menu.offsetLeft - 32 + "px";
  leftArrow.style.top = menu.offsetTop + menu.offsetHeight / 2 - 25 + "px";

  // Position right arrow
  rightArrow.style.top = menu.offsetTop + menu.offsetHeight / 2 - 25 + "px";
  rightArrow.style.left = menu.offsetLeft + menu.offsetWidth - 16 + "px";
}

// Controlling left movement
function scrollLeft(e) {
  let movingLeft = setInterval(moveLeft, 1);
  setTimeout(stopMoveLeft, 265, movingLeft);
  e.preventDefault();
}

function stopMoveLeft(movingLeft) {
  clearInterval(movingLeft);
}

function moveLeft() {
  menu.scrollLeft -= 10;
}

// Controlling Right Movement
function scrollRight(e) {
  let movingRight = setInterval(moveRight, 1);
  setTimeout(stopMoveRight, 265, movingRight);
  e.preventDefault();
}

function stopMoveRight(movingRight) {
  clearInterval(movingRight);
}

function moveRight() {
  menu.scrollLeft += 10;
}

// Hide and display left cursor when needed
function leftCursor() {
  let beforeScroll = menu.scrollLeft;
  menu.scrollLeft -= 1;
  if (beforeScroll == menu.scrollLeft) {
    leftArrow.style.display = "none";
  } else {
    leftArrow.style.display = "inline";
  }
  menu.scrollLeft = beforeScroll;
}

// Hide and display right cursor when needed
function rightCursor() {
  let beforeScroll = menu.scrollLeft;
  menu.scrollLeft += 1;
  if (beforeScroll == menu.scrollLeft) {
    rightArrow.style.display = "none";
  } else {
    rightArrow.style.display = "inline";
  }
  menu.scrollLeft = beforeScroll;
}

// clear Local Storage
function clearLocalStorage(e) {
  if (confirm("Are You Sure?")) {
    localStorage.clear();

    location.reload();
  }
  e.preventDefault();
}
