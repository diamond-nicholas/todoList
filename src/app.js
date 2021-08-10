/* eslint-disable quotes */
/* eslint-disable curly */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable new-cap */

import renderTasks from "./todo";
import * as myDom from "./dom";
import clearElement from "./utilis";

let lists = JSON.parse(localStorage.getItem(myDom.LOCAL_STORAGE_LIST_KEY)) || [
  {
    topic: "Default",
    id: "12899",
    tasks: [],
  },
];
let selectedListId = localStorage.getItem(
  myDom.LOCAL_STORAGE_SELECTED_LIST_ID_KEY
);
const renderList = () => {
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.topic;
    if (list.id === selectedListId) {
      listElement.classList.add("active-list");
    }
    myDom.listsContainer.appendChild(listElement);
  });
};
const renderTaskCount = (selectedList) => {
  const incompleteTaskCount = selectedList.tasks.filter(
    (task) => !task.complete
  ).length;
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
  myDom.listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
};
const render = () => {
  clearElement(myDom.listsContainer);
  renderList();
  const selectedList = lists.find((list) => list.id === selectedListId);
  if (selectedListId == null) {
    myDom.listDisplayContainer.style.display = "none";
  } else {
    myDom.listDisplayContainer.style.display = "";
    myDom.listTitleElement.innerText = selectedList.topic;
    renderTaskCount(selectedList);
    clearElement(myDom.taskContainer);
    renderTasks(selectedList);
  }
};

const saveToLocal = () => {
  localStorage.setItem(myDom.LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(
    myDom.LOCAL_STORAGE_SELECTED_LIST_ID_KEY,
    selectedListId
  );
};

const saveAndRender = () => {
  saveToLocal();
  render();
};

function createList(topic) {
  this.topic = topic;
  this.id = Date.now().toString();
  this.tasks = [];
}

function createTask(title, desc, date, priority) {
  this.title = title;
  this.desc = desc;
  this.date = date;
  this.priority = priority;
  this.id = Date.now().toString();
  this.complete = false;
}

myDom.newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listName = myDom.newListInput.value;
  if (listName == null || listName === "") return;
  const list = new createList(listName);
  myDom.newListInput.value = null;
  lists.push(list);
  saveAndRender();
});

myDom.newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleName = myDom.newListTitle.value;
  const descName = myDom.newListDesc.value;
  const dateName = myDom.newListDate.value;
  const prioName =
    myDom.newPrioInput.options[myDom.newPrioInput.selectedIndex].text;
  if (
    titleName == null ||
    titleName === "" ||
    descName == null ||
    descName === "" ||
    dateName == null ||
    dateName === "" ||
    prioName == null ||
    prioName === ""
  )
    // eslint-disable-next-line nonblock-statement-body-position
    return;
  const task = new createTask(titleName, descName, dateName, prioName);
  myDom.newListTitle.value = null;
  myDom.newListDesc.value = null;
  myDom.newListDate.value = null;
  myDom.newPrioInput.options[myDom.newPrioInput.selectedIndex].value = null;
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks.push(task);
  saveAndRender();
});

myDom.listsContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

myDom.taskContainer.addEventListener("click", (e) => {
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

myDom.editTask.addEventListener("click", () => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  const editData = selectedList.tasks.filter((task) => task.complete);
  const editTitle = editData[0].title;
  const editDesc = editData[0].desc;
  const editDate = editData[0].date;
  const editPriority = editData[0].priority;
  myDom.newListTitle.value = editTitle;
  myDom.newListDesc.value = editDesc;
  myDom.newListDate.value = editDate;
  myDom.newPrioInput.options[myDom.newPrioInput.selectedIndex].text =
    editPriority;
  selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
  saveAndRender();
});

myDom.clearCompleteTasksButton.addEventListener("click", () => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);
  saveAndRender();
});

myDom.deleteListButton.addEventListener("click", () => {
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});

export default render;
