// JavaScript (script.js)
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Load tasks from local storage on page load
window.addEventListener("load", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToList(task.text, task.completed);
    });
});

addTaskButton.addEventListener("click", addTask);
taskList.addEventListener("change", handleCheckboxChange);
taskList.addEventListener("click", handleDeleteClick);

function addTaskToList(taskText, completed = false) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <label>
            <input type="checkbox" ${completed ? "checked" : ""}>
            <span>${taskText}</span>
        </label>
        <button class="delete">Delete</button>
    `;
    if (completed) {
        taskItem.classList.add("completed");
    }
    taskList.appendChild(taskItem);
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTaskToList(taskText);
        saveTasksToLocalStorage();
        taskInput.value = "";
        taskInput.focus();
    }
}

function handleCheckboxChange(event) {
    const checkbox = event.target;
    const taskItem = checkbox.closest("li");
    
    if (checkbox.checked) {
        taskItem.classList.add("completed");
    } else {
        taskItem.classList.remove("completed");
    }

    saveTasksToLocalStorage();
}

function handleDeleteClick(event) {
    const clickedElement = event.target;
    if (clickedElement.classList.contains("delete")) {
        if (confirm("Are you sure you want to delete this task?")) {
            deleteTask(clickedElement);
            saveTasksToLocalStorage();
        }
    }
}

function deleteTask(deleteButton) {
    const taskItem = deleteButton.parentElement;
    taskList.removeChild(taskItem);
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.children).map(taskItem => ({
        text: taskItem.querySelector("span").textContent,
        completed: taskItem.classList.contains("completed")
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
