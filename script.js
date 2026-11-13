
const input = document.getElementById("taskInput");
const button = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// Get saved tasks or start with an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateStats() {

  // Total number of tasks
  const total = tasks.length;

  // Count completed tasks
  const completed = tasks.filter(function(task) {
    return task.completed;
  }).length;

  // Count unfinished tasks
  const remaining = total - completed;

  // Calculate completion percentage
  const percentage = total === 0
    ? 0
    : Math.round((completed / total) * 100);

  // Update numbers on the webpage
  document.getElementById("totalTasks").textContent = total;

  document.getElementById("completedTasks").textContent = completed;

  document.getElementById("remainingTasks").textContent = remaining;

  // Update progress percentage
  document.getElementById("progressPercent").textContent =
    percentage + "%";

  // Update progress bar width
  document.getElementById("progressFill").style.width =
    percentage + "%";

  // Update accessibility information
  document.getElementById("progressBar")
    .setAttribute("aria-valuenow", percentage);
}

let currentFilter = "all";
// Save tasks in browser storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display all tasks
function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function(task, index) {


 if (currentFilter === "active" && task.completed) {
  return;
}

if (currentFilter === "completed" && !task.completed) {
  return;
}

    // Create list item
    const listItem = document.createElement("li");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    // Create task text
    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    // Style completed tasks
    
 if (task.completed) {
  taskText.classList.add("completed");
}


    // Update completion status
    checkbox.addEventListener("change", function() {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      displayTasks();
    });

    // Create Delete button
    const deleteButton = document.createElement("button");
    
deleteButton.innerHTML = '<i data-lucide="trash-2"></i>';
deleteButton.setAttribute("aria-label", "Delete task");
deleteButton.title = "Delete task";



const editButton = document.createElement("button");

editButton.innerHTML = '<i data-lucide="pencil"></i>';
editButton.setAttribute("aria-label", "Edit task");
editButton.title = "Edit task";

editButton.addEventListener("click", function() {
  const updatedText = prompt("Edit your task:", task.text);

  if (updatedText !== null && updatedText.trim() !== "") {
    tasks[index].text = updatedText.trim();
    saveTasks();
    displayTasks();
  }
});


    // Delete with confirmation
    deleteButton.addEventListener("click", function() {
      const confirmation = confirm(
        "Are you sure you want to delete this task?"
      );

      if (confirmation) {
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
      }
    });

    // Attach elements
    
listItem.appendChild(checkbox);
listItem.appendChild(taskText);
listItem.appendChild(editButton);
listItem.appendChild(deleteButton);


    taskList.appendChild(listItem);
  });

lucide.createIcons();
updateStats();

}

// Add a new task
function addTask() {
  const task = input.value.trim();

  if (task === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({
    text: task,
    completed: false
  });

  saveTasks();
  displayTasks();

  input.value = "";
}

// Add using button
button.addEventListener("click", addTask);

// Add using Enter key
input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Display saved tasks when page loads
displayTasks();

document.getElementById("allBtn").addEventListener("click", function() {
    console.log("Active button clicked!");
  currentFilter = "all";
  displayTasks();
});

document.getElementById("activeBtn").addEventListener("click", function() {
  currentFilter = "active";
  displayTasks();
});

document.getElementById("completedBtn").addEventListener("click", function() {
  currentFilter = "completed";
  displayTasks();
});

const themeToggle = document.getElementById("themeToggle");

// Load previously saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️ Light Mode";
}

// Switch theme when button is clicked
themeToggle.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");

  if (isDark) {
    themeToggle.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});
