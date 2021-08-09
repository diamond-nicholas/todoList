/* eslint-disable comma-dangle */
/* eslint-disable quotes */
// eslint-disable-next-line import/prefer-default-export
export const listDisplayContainer = document.querySelector(".data-list");
export const listTitleElement = document.querySelector("[data-list-title]");
export const newListForm = document.querySelector("[data-new-list-form]");
export const newListInput = document.querySelector("[data-new-list-input]");
export const deleteListButton = document.querySelector(
  "[data-delete-list-button]"
);
export const taskContainer = document.querySelector("[data-tasks]");
export const listCountElement = document.querySelector("[data-list-count]");

export const listsContainer = document.querySelector("[data-lists]");
export const newTaskForm = document.querySelector("[data-new-task-form]");

export const newPrioInput = document.querySelector("[data-new-priority-input]");
export const clearCompleteTasksButton = document.querySelector(
  // eslint-disable-next-line comma-dangle
  "[data-clear-complete-tasks-button]"
);

export const editTask = document.querySelector("[data-edit-task-button]");

export const newListTitle = document.querySelector("[data-new-title-input]");
export const newListDesc = document.querySelector("[data-new-desc-input]");
export const newListDate = document.querySelector("[data-new-date-input]");

export const LOCAL_STORAGE_LIST_KEY = "task.lists";
export const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId";
