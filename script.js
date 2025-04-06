const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load tasks on page load
window.addEventListener("load", loadTasks);
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = {
    text: taskText,
    completed: false
  };

  addTaskToDOM(task);
  saveTask(task);
  taskInput.value = "";
}

function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.className = "task-item";
  if (task.completed) {
    li.classList.add("completed");
  }

  const span = document.createElement("span");
  span.textContent = task.text;
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    toggleTaskCompleted(task.text);
  });

  const actions = document.createElement("div");
  actions.className = "actions";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    deleteTask(task.text);
  });

  actions.appendChild(deleteBtn);
  li.appendChild(span);
  li.appendChild(actions);
  taskList.appendChild(li);
}

// === Local Storage Functions ===

function saveTask(task) {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach(task => addTaskToDOM(task));
}

function getTasksFromStorage() {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : [];
}

function deleteTask(taskText) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleTaskCompleted(taskText) {
  let tasks = getTasksFromStorage();
  tasks = tasks.map(task =>
    task.text === taskText
      ? { ...task, completed: !task.completed }
      : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
