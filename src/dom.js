const getList = document.querySelector(".task-list");

const data = () => {
  const newData = document.createElement("li");
  newData.textContent = "this is new";
  getList.appendChild(newData);
  console.log(newData);
};

export default data;
