// ============================================================
// 🏠  localStorage — HOMEWORK
// ============================================================
// Mini Project: Persistent Task Board
//
// The Task Board from Event Listeners — now with persistence.
// Every change is saved to localStorage automatically.
// Refreshing the page restores exactly where the user left off.
//
// STORAGE KEY: "taskBoardData"
// Store the full tasks array under this key.
// ============================================================

// ============================================================
// DEFAULT TASKS — used only when nothing is saved yet
// ============================================================
const defaultTasks = [
  {
    id: 1,
    title: "Design landing page",
    assignee: "Alex",
    priority: "high",
    status: "todo",
  },
  {
    id: 2,
    title: "Set up project repo",
    assignee: "Sofia",
    priority: "high",
    status: "done",
  },
  {
    id: 3,
    title: "Write API docs",
    assignee: "Liam",
    priority: "medium",
    status: "inprogress",
  },
  {
    id: 4,
    title: "Fix login bug",
    assignee: "Alex",
    priority: "high",
    status: "inprogress",
  },
  {
    id: 5,
    title: "Add dark mode",
    assignee: "Maya",
    priority: "low",
    status: "todo",
  },
];

// This is your working tasks array — start it empty.
// loadTasks() will fill it from localStorage (or from defaultTasks).
let tasks = [];

// ----------------------------------------------------------
// TASK 1 — saveTasks
// ----------------------------------------------------------
// Declare a function called saveTasks.
// No parameters.
//
// Inside:
//   1. Save tasks to localStorage:
//      localStorage.setItem("taskBoardData", JSON.stringify(tasks))
//
//   2. Flash the save indicator:
//      Select #save-indicator
//      Add class "visible"
//      After 1500ms, remove class "visible":
//        setTimeout(function() {
//          saveIndicator.classList.remove("visible");
//        }, 1500);
//
// This function will be called after EVERY change.

function saveTasks() {
  localStorage.setItem("taskBoardData", JSON.stringify(tasks));

  const saveIndicator = document.querySelector("#save-indicator");
  saveIndicator.classList.add("visible");

  setTimeout(function () {
    saveIndicator.classList.remove("visible");
  }, 1500);
}

// ----------------------------------------------------------
// TASK 2 — loadTasks
// ----------------------------------------------------------
// Declare a function called loadTasks.
// No parameters. Returns nothing — populates the tasks array.
//
// Inside:
//   1. const raw = localStorage.getItem("taskBoardData")
//
//   2. IF raw is null (nothing saved yet):
//      Set tasks = [...defaultTasks]  (copy the defaults)
//      Call saveTasks() to save them immediately
//      Return early
//
//   3. ELSE:
//      Set tasks = JSON.parse(raw)
//
// ⚠️  Always check for null before parsing.

function loadTasks() {
  const raw = localStorage.getItem("taskBoardData");

  if (raw === null) {
    tasks = [...defaultTasks];
    saveTasks();
    return;
  } else {
    tasks = JSON.parse(raw);
  }
}

// ----------------------------------------------------------
// TASK 3 — createTaskCard (returns a DOM element)
// ----------------------------------------------------------
// Carried from Event Listeners — same structure, restated here
// so you don't have to flip back to that file.
// Parameter: task (object)
//
// Build and return a <li> with:
//   1. class "task-card"
//      dataset.id = task.id
//      dataset.priority = task.priority
//   2. A title <p class="task-title"> — textContent: task.title
//   3. A meta <div class="task-meta"> with two spans:
//      a) priority span — textContent: task.priority.toUpperCase()
//         add class: "priority-" + task.priority
//         (e.g. class="priority-high" for high priority)
//      b) assignee span — textContent: "👤 " + task.assignee
//   4. An actions <div class="card-actions"> with two buttons:
//      a) <button class="complete-btn"> textContent: "✅ Complete"
//      b) <button class="remove-btn">   textContent: "🗑️ Remove"
//   5. If task.status === "done" → add class "completed" to the <li>
//   6. Append title, meta, and actions to the <li>
//
// Return the <li> — do NOT append it here.

function createTaskCard(task) {
  const li = document.createElement("li");
  li.classList.add("task-card");
  li.dataset.id = task.id;
  li.dataset.priority = task.priority;

  const title = document.createElement("p");
  title.classList.add("task-title");
  title.textContent = task.title;

  const meta = document.createElement("div");
  meta.classList.add("task-meta");
  const priority = document.createElement("span");
  priority.textContent = task.priority.toUpperCase();
  priority.classList.add(`priority-${task.priority}`);
  const assignee = document.createElement("span");
  assignee.textContent = `👤 ${task.assignee}`;
  meta.append(priority, assignee);

  const actions = document.createElement("div");
  actions.classList.add("card-actions");
  const completeButton = document.createElement("button");
  completeButton.classList.add("complete-btn");
  completeButton.textContent = "✅ Complete";
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-btn");
  removeButton.textContent = "🗑️ Remove";
  actions.append(completeButton, removeButton);

  if (task.status === "done") {
    li.classList.add("completed");
  }

  li.append(title, meta, actions);

  return li;
}

// ----------------------------------------------------------
// TASK 4 — renderBoard + updateCounts
// ----------------------------------------------------------
// Declare a function called renderBoard.
// No parameters — uses the global tasks array.
//
// Clear all three lists (innerHTML = "").
// Loop through tasks, call createTaskCard, append to correct list.
// Call updateCounts() after.
//
// ---
// Declare a function called updateCounts.
// No parameters.
//
// Use filter to get four groups from the tasks array:
//   done        → status === "done"
//   pending     → status !== "done"
//   todo        → status === "todo"
//   inprogress  → status === "inprogress"
//
// Set textContent on six elements:
//   #task-count       → tasks.length + " tasks"
//   #completed-count  → "✅ " + done.length + " done"
//   #pending-count    → "⏳ " + pending.length + " pending"
//   #count-todo       → todo.length          (just the number — no label)
//   #count-inprogress → inprogress.length    (just the number — no label)
//   #count-done       → done.length          (just the number — no label)

function updateCounts() {
  const done = tasks.filter((task) => task.status === "done");
  const pending = tasks.filter((task) => task.status !== "done");
  const todo = tasks.filter((task) => task.status === "todo");
  const inprogress = tasks.filter((task) => task.status === "inprogress");

  const taskCount = document.querySelector("#task-count");
  taskCount.textContent = `${tasks.length} tasks`;
  const completedCount = document.querySelector("#completed-count");
  completedCount.textContent = `✅ ${done.length} done`;
  const pendingCount = document.querySelector("#pending-count");
  pendingCount.textContent = `⏳ ${pending.length} pending`;
  const todoCount = document.querySelector("#count-todo");
  todoCount.textContent = todo.length;
  const inprogressCount = document.querySelector("#count-inprogress");
  inprogressCount.textContent = inprogress.length;
  const doneCount = document.querySelector("#count-done");
  doneCount.textContent = done.length;
}

function renderBoard() {
  const todoList = document.querySelector("#list-todo");
  const inprogressList = document.querySelector("#list-inprogress");
  const doneList = document.querySelector("#list-done");

  todoList.innerHTML = "";
  inprogressList.innerHTML = "";
  doneList.innerHTML = "";

  tasks.forEach(function (task) {
    const newCard = createTaskCard(task);
    if (task.status === "todo") {
      todoList.append(newCard);
    } else if (task.status === "inprogress") {
      inprogressList.append(newCard);
    } else if (task.status === "done") {
      doneList.append(newCard);
    }
  });

  updateCounts();
}

// ----------------------------------------------------------
// TASK 5 — handleAddTask
// ----------------------------------------------------------
// Declare a function called handleAddTask.
//
// Inside:
//   1. Read the four input values:
//      - #task-title-input    (.value.trim())
//      - #task-assignee-input (.value.trim())
//      - #task-priority-input (.value)
//      - #task-status-input   (.value)
//   2. If title is empty → return early
//   3. Create a new task object:
//      { id: Date.now(), title,
//        assignee: assignee || "Unassigned",
//        priority, status }
//      ⚠️ The assignee fallback matters — an empty assignee field
//         would otherwise render as "👤 " with nothing after it.
//   4. Push to tasks array
//   5. Call saveTasks()     ← persist immediately
//   6. Call renderBoard()   ← update the view
//   7. Clear title and assignee inputs
//
// Wire it up:
//   document.getElementById("add-task-btn")
//     .addEventListener("click", handleAddTask)

function handleAddTask() {
  const titleInput = document.querySelector("#task-title-input");
  const title = titleInput.value.trim();

  const assigneeInput = document.querySelector("#task-assignee-input");
  const assignee = assigneeInput.value.trim();

  const priorityInput = document.querySelector("#task-priority-input");
  const priority = priorityInput.value;

  const statusInput = document.querySelector("#task-status-input");
  const status = statusInput.value;

  if (title === "") {
    return;
  }

  const newTask = {
    id: Date.now(),
    title,
    assignee: assignee || "Unassigned",
    priority,
    status,
  };

  tasks.push(newTask);

  saveTasks();
  renderBoard();
  titleInput.value = "";
  assigneeInput.value = "";
}

document
  .getElementById("add-task-btn")
  .addEventListener("click", handleAddTask);

// ----------------------------------------------------------
// TASK 6 — handleBoardClick (delegation for complete + remove)
// ----------------------------------------------------------
// Declare a function called handleBoardClick.
// Parameter: event
//
// Use event.target.closest(".task-card") to get the card.
// Guard: if no card → return.
//
// Get taskId: parseInt(card.dataset.id)
// Find the task in tasks using find.
//
// IF complete button clicked:
//   - Update task.status = "done" in the array
//   - Call saveTasks()
//   - Call renderBoard()
//
// IF remove button clicked:
//   - Remove from tasks: tasks.splice(tasks.findIndex(...), 1)
//   - Call saveTasks()
//   - Call renderBoard()
//
// Wire it up to document.querySelector(".board")

function handleBoardClick(event) {
  const card = event.target.closest(".task-card");
  if (!card) {
    return;
  }

  const taskId = parseInt(card.dataset.id);
  const foundTask = tasks.find((task) => task.id === taskId);

  if (event.target.classList.contains("complete-btn")) {
    foundTask.status = "done";
    saveTasks();
    renderBoard();
  }

  if (event.target.classList.contains("remove-btn")) {
    tasks.splice(
      tasks.findIndex((task) => task.id === taskId),
      1,
    );
    saveTasks();
    renderBoard();
  }
}

document.querySelector(".board").addEventListener("click", handleBoardClick);

// ----------------------------------------------------------
// TASK 7 — handleClearAll
// ----------------------------------------------------------
// Declare a function called handleClearAll.
//
// Inside:
//   1. Confirm the user wants to clear:
//      if (!confirm("Clear all tasks? This cannot be undone.")) return;
//   2. Clear localStorage: localStorage.removeItem("taskBoardData")
//   3. Reset tasks: tasks = [...defaultTasks]
//   4. Call saveTasks() to save the defaults
//   5. Call renderBoard()
//
// Wire it up:
//   document.getElementById("clear-btn")
//     .addEventListener("click", handleClearAll)

function handleClearAll() {
  if (!confirm("Clear all tasks? This cannot be undone.")) {
    return;
  }

  localStorage.removeItem("taskBoardData");
  tasks = [...defaultTasks];
  saveTasks();
  renderBoard();
}

document.getElementById("clear-btn").addEventListener("click", handleClearAll);

// ----------------------------------------------------------
// TASK 8 — init
// ----------------------------------------------------------
// Declare a function called init.
// Inside:
//   1. Call loadTasks()    ← loads from localStorage or defaults
//   2. Call renderBoard()  ← renders whatever loadTasks set up
//
// Call init() at the bottom.

function init() {
  loadTasks();
  renderBoard();

  // added for stretch goal
  const savedFilter = loadFilter();
  const savedButton = document.querySelector(`[data-filter="${savedFilter}"]`);
  if (savedButton) {
    savedButton.click();
  }
}

// init(); // called again in stretch goal

// ----------------------------------------------------------
// ⭐ STRETCH GOAL — persist filter preference
// ----------------------------------------------------------
// The board currently loses the active filter on refresh.
// Add persistence for the current filter setting.
//
// Declare a function called saveFilter.
// Parameter: filterValue (string)
// Saves: localStorage.setItem("taskFilter", filterValue)
//
// Declare a function called loadFilter.
// Returns the saved filter or "all" as default:
//   return localStorage.getItem("taskFilter") || "all"
//
// In your filter click handler:
//   - After applying the filter, call saveFilter(filterValue)
//
// In init():
//   - After renderBoard(), call:
//       const savedFilter = loadFilter()
//       Apply the saved filter (update active button + show/hide cards)
//
// Write a comment: what other UI state might be worth persisting?
// selected sort order, light/dark theme mode, a search box

// ============================================================
// START
// ============================================================

function saveFilter(filterValue) {
  localStorage.setItem("taskFilter", filterValue);
}

function loadFilter() {
  return localStorage.getItem("taskFilter") || "all";
}

// added from 11_event-listeners, including index.html, and style.css
function handleFilterClick(event) {
  const clickFilter = event.target.dataset.filter;
  if (!clickFilter) return;

  const removeActive = document.querySelectorAll(".filter-btn");
  removeActive.forEach(function (btn) {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  const cardfilter = document.querySelectorAll(".task-card");
  cardfilter.forEach(function (card) {
    if (clickFilter === "all") {
      card.classList.remove("hidden");
    } else if (card.dataset.priority === clickFilter) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
  saveFilter(clickFilter);
}

// wire up here
document
  .querySelector(".header-right")
  .addEventListener("click", handleFilterClick);

init();
