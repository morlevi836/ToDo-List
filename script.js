const txtArea = document.querySelector(".Header__Textarea");
const btnV = document.querySelector(".Header__Button");
const items = document.querySelector(".List__Items");

getTasks().forEach((task) => {
  const taskEl = createTaskEl(task.id, task.content);
  items.appendChild(taskEl);
});

document.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  },
  true
);

function createTaskEl(id, content) {
  if (content != "") {
    const div = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const text = document.createElement("h4");
    const button = document.createElement("button");
    const firstLetter = content.slice(0, 1).toUpperCase();
    const otherLetters = content.slice(1);

    div.classList.add("List__Flex");
    label.classList.add("List__Label");
    input.classList.add("List__Input");
    input.type = "checkbox";
    text.classList.add("List__Text");
    text.textContent = firstLetter + otherLetters;
    button.classList.add("List__Button");
    button.textContent = "X";

    label.appendChild(input);
    div.appendChild(label);
    div.appendChild(text);
    div.appendChild(button);

    button.addEventListener("click", () => {
      if (confirm("Do you want to delete this task?")) {
        deleteTask(id, div);
      }
    });

    input.addEventListener("change", (event) => {
      if (event.target.checked) {
        text.style.textDecoration = "line-through";
      } else {
        text.style.textDecoration = "none";
      }
    });

    txtArea.value = "";
    return div;
  } else {
    alert("Textarea cannot be empty. Please enter some text.");
  }
}

function deleteTask(id, element) {
  const tasks = getTasks().filter((task) => task.id !== id);
  saveTask(tasks);
  items.removeChild(element);
}

function addTask() {
  const tasks = getTasks();
  const taskObj = {
    id: Math.floor(Math.random() * 100000),
    content: txtArea.value,
  };
  const taskEl = createTaskEl(taskObj.id, taskObj.content);
  items.appendChild(taskEl);

  tasks.push(taskObj);
  saveTask(tasks);
}

function saveTask(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

btnV.addEventListener("click", addTask);
