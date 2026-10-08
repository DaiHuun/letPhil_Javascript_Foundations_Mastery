// ============================================================
// 🐛  DOM MANIPULATION — HOMEWORK  |  DEBUG TASKS
// ============================================================
// To test: swap <script src="app.js"> with <script src="debug.js">
// in index.html.
// ============================================================

// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This should set the board title but logs a TypeError. Why?

// function renderBoardTitle() {
//   const titleEl = document.querySelector(".board-title");
//   titleEl.textContent = "My Task Board";
// }

// renderBoardTitle();

// What's wrong ↓
// for querySelector, need to do #board-title instead of .board-title.
// the "." is searching for a class instead of "#" which is searching for an id

// Your fix ↓
function renderBoardTitle() {
  const titleEl = document.querySelector("#board-title");
  titleEl.textContent = "My Task Board";
}

renderBoardTitle();
// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This loop should create a card for every task and append
// it to the list. But only the last card appears. Why?

// function renderTasks() {
//   const list = document.getElementById("list-todo");
//   const tasks = ["Design page", "Write tests", "Fix bug"];

//   tasks.forEach(function (taskTitle) {
//     const li = document.createElement("li");
//     li.textContent = taskTitle;
//     list.innerHTML = li.outerHTML;
//   });
// }

// renderTasks();

// What's wrong ↓
// these is no .append() to add to list
// list.innerHTML = li.outerHTML is also causing to replace the list with one li
// also for debug 3 needs task cards so added a li.classList.add("task-card", "priority-high");

// Your fix ↓
function renderTasks() {
  const list = document.getElementById("list-todo");
  const tasks = ["Design page", "Write tests", "Fix bug"];

  tasks.forEach(function (taskTitle) {
    const li = document.createElement("li");
    li.textContent = taskTitle;
    li.classList.add("task-card", "priority-high");
    // list.innerHTML = li.outerHTML;
    list.append(li);
  });
}

renderTasks();

// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This function should add a "highlighted" class to all
// high-priority cards, but nothing changes on the page.
// There are TWO bugs.

// function highlightTasks() {
//   const highCards = document.querySelectorAll(".priority-high");

//   for (let i = 0; i <= highCards.length; i++) {
//     highCards[i].classList.add("highlighted");
//   }
// }

// highlightTasks();

// Bug 1 ↓
// in the for loop, should use < instead of <= since .length would put it off by 1

// Bug 2 ↓
// theres no highlight class, added to style.css

// BUG 3
// no task cards with priority-high even exists, so added it above in debug 2

// Your fix ↓
function highlightTasks() {
  const highCards = document.querySelectorAll(".priority-high");

  for (let i = 0; i < highCards.length; i++) {
    highCards[i].classList.add("highlighted");
  }
}

highlightTasks();
