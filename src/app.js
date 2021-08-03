const listsContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button]");
const listDisplayContainer = document.querySelector(
  "[data-list-display-container]"
);
const listTitleElement = document.querySelector("[data-list-title]");
const listCountElement = document.querySelector("[data-list-count]");
const taskContainer = document.querySelector("[data-tasks]");

// const taskTemplate = document.getElementById("task-template");

const newTaskForm = document.querySelector("[data-new-task-form]");

const newTaskInput = document.querySelector("[data-new-task-input]");

const clearCompleteTasksButton = document.querySelector(
  "[data-clear-complete-tasks-button]"
);

const newListTitle = document.querySelector("[data-new-title-input]");
const newListDesc = document.querySelector("[data-new-desc-input]");
const newListDate = document.querySelector("[data-new-date-input]");

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";

let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const render = () => {
  clearElement(listsContainer);
  renderList();
  const selectedList = lists.find((list) => list.id === selectedListId);
  if (selectedListId == null) {
    listDisplayContainer.style.display = "none";
  } else {
    listDisplayContainer.style.display = "";
    listTitleElement.innerText = selectedList.topic;
    renderTaskCount(selectedList);
    clearElement(taskContainer);
    renderTasks(selectedList);
  }
};

const renderTasks = (selectedList) => {
  selectedList.tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.innerHTML = `
 <div class="task">
        <input type="checkbox" />
        <label><span class="custom-checkbox"></span></label>
      </div>
`;
    const checkbox = taskElement.querySelector("input");
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.title, task.topic, task.desc, task.date);
    taskContainer.appendChild(taskElement);
    console.log(checkbox);
  });
};

const renderTaskCount = (selectedList) => {
  const incompleteTaskCount = selectedList.tasks.filter(
    (task) => !task.complete
  ).length;
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
};

const renderList = () => {
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.topic;
    if (list.id === selectedListId) {
      listElement.classList.add("active-list");
    }
    listsContainer.appendChild(listElement);
  });
};

const saveToLocal = () => {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
};

const saveAndRender = () => {
  saveToLocal();
  render();
};

newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === "") return;
  const list = new createList(listName);
  // const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = newTaskInput.value;
  const titleName = newListTitle.value;
  const descName = newListDesc.value;
  const dateName = newListDate.value;
  if (
    taskName == null ||
    taskName === "" ||
    titleName == null ||
    titleName === "" ||
    descName == null ||
    descName === "" ||
    dateName == null ||
    dateName === ""
  )
    return;
  // const task = createTask(taskName);
  const task = new createTask(taskName, titleName, descName, dateName);
  newTaskInput.value = null;
  newListTitle.value = null;
  newListDesc.value = null;
  newListDate.value = null;
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks.push(task);
  saveAndRender();
  // console.log(task);
});

listsContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

taskContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "input") {
    const selectedList = lists.find((list) => list.id === selectedListId);
    const selectedTask = selectedList.tasks.find(
      (task) => task.id === e.target.id
    );
    selectedTask.complete = e.target.checked;
    saveToLocal();
    renderTaskCount(selectedList);
  }
});

clearCompleteTasksButton.addEventListener("click", (e) => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
  saveAndRender();
});

deleteListButton.addEventListener("click", (e) => {
  lists = lists.filter((list) => list.id != selectedListId);
  selectedListId = null;
  saveAndRender();
});

function createList(topic) {
  this.topic = topic;
  this.id = Date.now().toString();
  this.tasks = [];
}

function createTask(topic, title, desc, date) {
  this.topic = topic;
  this.title = title;
  this.desc = desc;
  this.date = date;
  this.id = Date.now().toString();
  this.complete = false;
}

export default render;
