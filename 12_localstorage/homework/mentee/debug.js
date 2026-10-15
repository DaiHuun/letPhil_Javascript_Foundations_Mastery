// ============================================================
// 🐛  localStorage — HOMEWORK  |  DEBUG TASKS
// ============================================================

// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This saves a task array to localStorage and reads it back.
// But tasks.length logs 1 instead of 3, and tasks[0] is a string.
// What's wrong?

const tasksToSave = [
  { id: 1, title: "Task A" },
  { id: 2, title: "Task B" },
  { id: 3, title: "Task C" },
];

localStorage.setItem("tasks", JSON.stringify(tasksToSave));

// const tasks = localStorage.getItem("tasks");
// console.log(tasks.length);   // logs a large number — wrong
// console.log(tasks[0]);       // logs "{" — wrong, expected an object

// What's wrong ↓
// const tasks isnt converted back into an array

// Your fix ↓

const tasks = localStorage.getItem("tasks");
const pTasks = JSON.parse(tasks);
console.log(pTasks.length);
console.log(pTasks[0]);

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This function should save the task board state and show
// a save indicator. The save works but the indicator never appears.
// What's wrong?

function saveBoardState(taskList) {
  localStorage.setItem("board", JSON.stringify(taskList));

  const indicator = document.getElementById("save-indicator");
  indicator.classList.add("visible");

  setTimeout(function () {
    indicator.classList.remove("visible");
  }, 1500);
}

// The indicator element has this CSS:
// .save-indicator { opacity: 0; transition: opacity 0.3s; }
// .save-indicator.visible { opacity: 1; }
//
// saveBoardState() is being called from inside another function
// that also does heavy DOM work immediately after.
// Think about what could prevent the class from taking visual effect.

// What's wrong ↓
// the heavy DOM work after is probably re-rendering the board, so the save-indicator is being reset.

// Your fix — conceptual explanation is enough here ↓
// Moving saveBoardState() after the DOM work, or even outside the other function would let the save indicator work visually.

// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This loads tasks and renders them.
// It crashes on first load AND has a second bug that causes
// duplicate tasks on every subsequent load.
// Find both bugs.

let taskList = [];

// function loadAndRender() {
//   const raw = localStorage.getItem("boardTasks");
//   taskList = JSON.parse(raw);

//   taskList.forEach(function (task) {
//     const li = document.createElement("li");
//     li.textContent = task.title;
//     document.getElementById("list-todo").appendChild(li);
//   });
// }

// // Saving some tasks so the second bug can be demonstrated:
// localStorage.setItem(
//   "boardTasks",
//   JSON.stringify([
//     { id: 1, title: "Task A", status: "todo" },
//     { id: 2, title: "Task B", status: "todo" },
//   ]),
// );

// loadAndRender();
// loadAndRender(); // called again — what happens?

// Bug 1 (crash on first load) ↓
// crashes because first load has nothing saved so returns null.

// Bug 2 (duplicates) ↓
// todolist is not being cleared before re-rendering.

// Your fix ↓
function loadAndRender() {
  const raw = localStorage.getItem("boardTasks");
  taskList = raw ? JSON.parse(raw) : []; // Bug 1 Fix

  const todoList = document.getElementById("list-todo"); // Bug 2 Fix
  todoList.textContent = "";

  taskList.forEach(function (task) {
    const li = document.createElement("li");
    li.textContent = task.title;
    todoList.appendChild(li);
  });
}

// Saving some tasks so the second bug can be demonstrated:
localStorage.setItem(
  "boardTasks",
  JSON.stringify([
    { id: 1, title: "Task A", status: "todo" },
    { id: 2, title: "Task B", status: "todo" },
  ]),
);

loadAndRender();
loadAndRender(); // called again — what happens?
