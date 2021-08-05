/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utilis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilis */ \"./src/utilis.js\");\n// import listsContainer from \"./utilis\";\n\n\n\nconst listDisplayContainer = document.querySelector(\n  \"[data-list-display-container]\"\n);\nconst listTitleElement = document.querySelector(\"[data-list-title]\");\nconst newListForm = document.querySelector(\"[data-new-list-form]\");\nconst newListInput = document.querySelector(\"[data-new-list-input]\");\nconst deleteListButton = document.querySelector(\"[data-delete-list-button]\");\n\nconst listCountElement = document.querySelector(\"[data-list-count]\");\nconst taskContainer = document.querySelector(\"[data-tasks]\");\nconst listsContainer = document.querySelector(\"[data-lists]\");\nconst newTaskForm = document.querySelector(\"[data-new-task-form]\");\n\nconst newPrioInput = document.querySelector(\"[data-new-priority-input]\");\nconst clearCompleteTasksButton = document.querySelector(\n  \"[data-clear-complete-tasks-button]\"\n);\n\nconst newListTitle = document.querySelector(\"[data-new-title-input]\");\nconst newListDesc = document.querySelector(\"[data-new-desc-input]\");\nconst newListDate = document.querySelector(\"[data-new-date-input]\");\n\nconst LOCAL_STORAGE_LIST_KEY = \"task.lists\";\nconst LOCAL_STORAGE_SELECTED_LIST_ID_KEY = \"task.selectedListId\";\n\nlet lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];\nlet selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);\n\nconst render = () => {\n  (0,_utilis__WEBPACK_IMPORTED_MODULE_0__.default)(listsContainer);\n  renderList();\n  const selectedList = lists.find((list) => list.id === selectedListId);\n  if (selectedListId == null) {\n    listDisplayContainer.style.display = \"none\";\n  } else {\n    listDisplayContainer.style.display = \"\";\n    listTitleElement.innerText = selectedList.topic;\n    renderTaskCount(selectedList);\n    (0,_utilis__WEBPACK_IMPORTED_MODULE_0__.default)(taskContainer);\n    renderTasks(selectedList);\n  }\n};\n\nconst renderTasks = (selectedList) => {\n  selectedList.tasks.forEach((task) => {\n    const taskElement = document.createElement(\"div\");\n    taskElement.innerHTML = `\n <div class=\"task\">\n        <input type=\"checkbox\" />\n        <label><span class=\"custom-checkbox\"></span></label>\n      </div>\n`;\n    const checkbox = taskElement.querySelector(\"input\");\n    checkbox.id = task.id;\n    checkbox.checked = task.complete;\n    const label = taskElement.querySelector(\"label\");\n    label.htmlFor = task.id;\n    label.append(task.title, task.desc, task.date, task.priority);\n    taskContainer.appendChild(taskElement);\n  });\n};\n\nconst renderTaskCount = (selectedList) => {\n  const incompleteTaskCount = selectedList.tasks.filter(\n    (task) => !task.complete\n  ).length;\n  const taskString = incompleteTaskCount === 1 ? \"task\" : \"tasks\";\n  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;\n};\n\nconst renderList = () => {\n  lists.forEach((list) => {\n    const listElement = document.createElement(\"li\");\n    listElement.dataset.listId = list.id;\n    listElement.classList.add(\"list-name\");\n    listElement.innerText = list.topic;\n    if (list.id === selectedListId) {\n      listElement.classList.add(\"active-list\");\n    }\n    listsContainer.appendChild(listElement);\n  });\n};\n\nconst saveToLocal = () => {\n  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));\n  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);\n};\n\nnewListForm.addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n  const listName = newListInput.value;\n  if (listName == null || listName === \"\") return;\n  const list = new createList(listName);\n  newListInput.value = null;\n  lists.push(list);\n  (0,_utilis__WEBPACK_IMPORTED_MODULE_0__.default)();\n});\n\nnewTaskForm.addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n  const titleName = newListTitle.value;\n  const descName = newListDesc.value;\n  const dateName = newListDate.value;\n  const prioName = newPrioInput.options[newPrioInput.selectedIndex].text;\n  if (\n    titleName == null ||\n    titleName === \"\" ||\n    descName == null ||\n    descName === \"\" ||\n    dateName == null ||\n    dateName === \"\" ||\n    prioName == null ||\n    prioName === \"\"\n  )\n    return;\n  const task = new createTask(titleName, descName, dateName, prioName);\n  newListTitle.value = null;\n  newListDesc.value = null;\n  newListDate.value = null;\n  newPrioInput.options[newPrioInput.selectedIndex].value = null;\n  const selectedList = lists.find((list) => list.id === selectedListId);\n  selectedList.tasks.push(task);\n  (0,_utilis__WEBPACK_IMPORTED_MODULE_0__.default)();\n});\n\nlistsContainer.addEventListener(\"click\", (e) => {\n  if (e.target.tagName.toLowerCase() === \"li\") {\n    selectedListId = e.target.dataset.listId;\n    (0,_utilis__WEBPACK_IMPORTED_MODULE_0__.default)();\n  }\n});\n\ntaskContainer.addEventListener(\"click\", (e) => {\n  if (e.target.tagName.toLowerCase() === \"input\") {\n    const selectedList = lists.find((list) => list.id === selectedListId);\n    const selectedTask = selectedList.tasks.find(\n      (task) => task.id === e.target.id\n    );\n    selectedTask.complete = e.target.checked;\n    saveToLocal();\n    renderTaskCount(selectedList);\n  }\n});\n\nclearCompleteTasksButton.addEventListener(\"click\", (e) => {\n  const selectedList = lists.find((list) => list.id === selectedListId);\n  selectedList.tasks = selectedList.tasks.filter((task) => !task.complete);\n  (0,_utilis__WEBPACK_IMPORTED_MODULE_0__.default)();\n});\n\ndeleteListButton.addEventListener(\"click\", (e) => {\n  lists = lists.filter((list) => list.id != selectedListId);\n  selectedListId = null;\n  (0,_utilis__WEBPACK_IMPORTED_MODULE_0__.default)();\n});\n\nfunction createList(topic) {\n  this.topic = topic;\n  this.id = Date.now().toString();\n  this.tasks = [];\n}\n\nfunction createTask(title, desc, date, priority) {\n  this.title = title;\n  this.desc = desc;\n  this.date = date;\n  this.priority = priority;\n  this.id = Date.now().toString();\n  this.complete = false;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ render, saveToLocal });\n\n\n//# sourceURL=webpack://todolist/./src/app.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/app.js\");\n\n\n(0,_app__WEBPACK_IMPORTED_MODULE_0__.default)();\n\n\n//# sourceURL=webpack://todolist/./src/index.js?");

/***/ }),

/***/ "./src/utilis.js":
/*!***********************!*\
  !*** ./src/utilis.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/app.js\");\n\n\n\n\n\n// const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = \"task.selectedListId\";\n// let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);\nconst clearElement = (element) => {\n  while (element.firstChild) {\n    element.removeChild(element.firstChild);\n  }\n};\n\nconst saveAndRender = () => {\n  (0,_app__WEBPACK_IMPORTED_MODULE_0__.default)();\n  render();\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ saveAndRender, clearElement });\n\n\n//# sourceURL=webpack://todolist/./src/utilis.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;