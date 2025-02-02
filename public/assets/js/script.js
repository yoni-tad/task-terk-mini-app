// Telegram id
const userId = 12345678;
const categoryColors = {
  Work: "purple",
  Personal: "green",
  Shopping: "red",
  Health: "pink",
};

document.addEventListener("DOMContentLoaded", listTasks);
document.getElementById("task-form").addEventListener("submit", function (e) {
  e.preventDefault();
  addTask();
});

document
  .getElementById("task-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("task-form").dispatchEvent(new Event("submit"));
    }
  });

async function addTask() {
  const taskInput = document.getElementById("task-input");
  const categorySelect = document.getElementById("category-select");

  const taskText = taskInput.value.trim();
  const category = categorySelect.value;

  if (!taskText) return;

  const taskData = {
    title: taskText,
    category: category,
    userId: userId,
  };

  try {
    const response = await fetch("/api/task/addTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      listTasks();
      showToast("Task added successfully!", "success");
      taskInput.value = "";
    } else {
      showToast("Failed to add task!", "error");
    }
  } catch (e) {
    console.error("Error:", error);
  }
}

async function listTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  try {
    const response = await fetch(`api/task/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasks = await response.json();
    tasks.forEach((task) => {
      const taskItem = document.createElement("div");
      const color = categoryColors[task.category] || "blue";

      taskItem.innerHTML = `<div
            class="bg-white px-4 py-2 rounded-lg flex flex-row justify-between items-center mb-3"
          >
            <div class="flex justify-center items-center">
              <input
                id="checkbox-${task.id}"
                type="checkbox"
                value=""
                class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500 focus:ring-2"
                ${task.completed ? "checked" : ""}
                />
              <label
                for="checkbox-${task.id}"
                class="ms-4 text-md font-medium text-gray-900 ${task.completed ? "line-through" : "none"}"
                >${task.title}</label
              >
            </div>
            <svg
              class="h-5 text-${color}-400"
              data-tooltip-target="tooltip-${task.id}"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z"
                clip-rule="evenodd"
              />
            </svg>
            <div
              id="tooltip-${task.id}"
              role="tooltip"
              class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip"
            >
            ${task.category}
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
          `;
      taskList.appendChild(taskItem);

      const checkbox = document.getElementById(`checkbox-${task.id}`);
      checkbox.addEventListener("change", async () => {
        const completed = checkbox.checked;
        await updateTaskStatus(task.id, completed);

        const taskLabel = checkbox.nextElementSibling;
        taskLabel.style.textDecoration = completed ? "line-through" : "none";
      });
    });
  } catch (e) {
    showToast("Failed to get tasks!", "error");
    console.error("Error:", error);
  }
}

async function updateTaskStatus(taskId, completed) {
  try {
    const response = await fetch(`api/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });

    if (!response.ok) {
      throw new Error("Task update failed");
    }
  } catch (e) {
    console.error("Error updating task:", error);
  }
}

function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = `flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white rounded-lg shadow-md transition-opacity duration-500 opacity-100`;

  toast.innerHTML = `
    <svg class="w-5 h-5 ${
      type === "success" ? "text-green-600" : "text-red-600"
    }"
      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="${
          type === "success"
            ? "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            : "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        }"
      />
    </svg>
    <div class="ps-2 text-sm font-normal">${message}</div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
