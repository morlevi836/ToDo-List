const txtArea = document.querySelector(".Header__Textarea");
const btnV = document.querySelector(".Button__V");
const btnSearch = document.querySelector(".Button__Search");
const items = document.querySelector(".List__Items");
let flag = true;

getTasks().forEach((task) => {
  createTaskEl(task.id, task.content);
});

document.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Enter" && flag) {
      event.preventDefault();
      addTask();
    }
  },
  true
);

function createTaskEl(id, content) {
  const div = document.createElement("div");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const text = document.createElement("h4");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");
  const confirmEditButton = document.createElement("button");
  const deleteImg = document.createElement("img");
  const editImg = document.createElement("img");
  const confirmEditImg = document.createElement("img");
  const firstLetter = content.slice(0, 1).toUpperCase();
  const otherLetters = content.slice(1);

  div.classList.add("List__Flex");

  label.classList.add("List__Label");

  input.classList.add("List__Input");
  input.type = "checkbox";

  text.classList.add("List__Text");
  text.textContent = firstLetter + otherLetters;

  deleteButton.classList.add("List__Button");

  deleteImg.classList.add("Img");
  deleteImg.src = "./assets/delete.png";

  editButton.classList.add("List__Button");
  editButton.classList.add("Button__Edit");

  editImg.classList.add("Img");
  editImg.src = "./assets/edit.png";

  confirmEditButton.classList.add("List__Button");
  confirmEditButton.classList.add("Button__Edit");

  confirmEditImg.classList.add("Img");
  confirmEditImg.src = "./assets/ok.png";

  label.appendChild(input);
  deleteButton.appendChild(deleteImg);
  editButton.appendChild(editImg);
  confirmEditButton.appendChild(confirmEditImg);
  div.appendChild(label);
  div.appendChild(text);
  div.appendChild(deleteButton);
  div.appendChild(editButton);

  deleteButton.addEventListener("click", (id, div) => {});

  editButton.addEventListener("click", () => {
    text.contentEditable = true;
    text.classList.add("List__TextEdit");
    div.removeChild(editButton);
    div.appendChild(confirmEditButton);
  });

  confirmEditButton.addEventListener("click", () => {
    text.contentEditable = false;
    text.classList.remove("List__TextEdit");
    div.removeChild(confirmEditButton);
    div.appendChild(editButton);
    if (text.textContent !== "") {
      editTask(id, text.textContent);
    } else {
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
  items.appendChild(div);
}

function deleteTask(id, element) {
  if (confirm("Do you want to delete this task?")) {
    const tasks = getTasks().filter((task) => task.id !== id);
    saveTask(tasks);
    removeElement(element);
  }
}

function removeElement(element) {
  items.removeChild(element);
}

function editTask(id, content) {
  const tasks = getTasks();
  const target = tasks.filter((task) => task.id === id)[0];
  target.content = content;
  saveTask(tasks);
}

function addTask() {
  if (txtArea.value != "") {
    const tasks = getTasks();
    const taskObj = {
      id: Math.floor(Math.random() * 100000),
      content: txtArea.value.toLowerCase(),
    };
    createTaskEl(taskObj.id, taskObj.content);
    tasks.push(taskObj);
    saveTask(tasks);
  } else {
    alert("Textarea cannot be empty. Please enter some text.");
  }
}

function saveTask(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function searchTask() {
  flag = false;
  btnV.style.display = "none";
  txtArea.placeholder = "What do you want to search...";
  const content = txtArea.value.toLowerCase().trim();
  const tasks = getTasks().filter((task) => task.content == content);
  const otherTasks = getTasks();
  console.log(tasks);
  console.log(otherTasks);
  otherTasks.forEach((task) => {
    console.log(task);
    // removeElement(task.content);
  });
  tasks.forEach((task) => {
    createTaskEl((task.id = 0), task.content);
  });
}

if (flag) {
  btnV.addEventListener("click", addTask);
}

btnSearch.addEventListener("click", searchTask);
