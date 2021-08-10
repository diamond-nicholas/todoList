/* eslint-disable import/prefer-default-export */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import * as myDom from "./dom";

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
    label.append(task.title, task.desc, task.date, task.priority);
    myDom.taskContainer.appendChild(taskElement);
  });
};
export default renderTasks;
