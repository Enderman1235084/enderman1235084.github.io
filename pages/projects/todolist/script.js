const themeToggle = document.getElementById("themeToggle");
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
let allTasks = [];

// Theme Functions
if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "dark");
}
else if (localStorage.getItem("theme") == "light") {
    document.documentElement.classList.add("lightTheme");
    themeToggle.children[0].classList.add("hidden");
    themeToggle.children[1].classList.remove("hidden");
}

themeToggle.onclick = function () {
    switch (localStorage.getItem("theme")) {
        case "dark":
            localStorage.setItem("theme", "light");
            document.documentElement.classList.add("lightTheme");
            themeToggle.children[0].classList.add("hidden");
            themeToggle.children[1].classList.remove("hidden");
            break;
        case "light":
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.remove("lightTheme");
            themeToggle.children[0].classList.remove("hidden");
            themeToggle.children[1].classList.add("hidden");
            break;
    }
}

// Load Items From localStorage
if (Boolean(localStorage.getItem("toDoTasks"))) {
    JSON.parse(localStorage.getItem("toDoTasks")).forEach(addTask);
}

// Storing of tasks
function updateTasks() {
    localStorage.setItem("toDoTasks", JSON.stringify(allTasks))
}

// Task Functions
function anyTasks() {
    if (taskList.children.length == 0) {
        const noTasksMsg = document.createElement("p");
        noTasksMsg.textContent = "No tasks.";
        noTasksMsg.id = "noTasksMsg";
        taskList.appendChild(noTasksMsg);
    }
    else if (Boolean(document.getElementById("noTasksMsg"))) {
        document.getElementById("noTasksMsg").remove();
    }
}

function addTask(task) {
    if (Boolean(task)) {
        const li = document.createElement("li");
        li.innerHTML = task + '<br><button onclick="removeTask(this)"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';
        taskList.appendChild(li);
        anyTasks();
        allTasks.push(task);
        updateTasks();
        if (task == taskInput.value) {
             taskInput.value = "";
        }
    }
}

function removeTask(self) {
    allTasks.splice(allTasks.indexOf(self.parentElement.textContent), 1)
    self.parentElement.remove();
    anyTasks();
    updateTasks();
}



anyTasks();