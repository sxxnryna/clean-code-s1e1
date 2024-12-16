const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementsByTagName("button")[0];
const todoListContainer = document.getElementById("incompleteTasks");
const completedListContainer = document.getElementById("completed-tasks");

//new task list item
const createTaskItem = (taskText) => {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const taskLabel = document.createElement("label");
  const editField = document.createElement("input");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const deleteImg = document.createElement("img");
  taskLabel.innerText = taskText;
  taskLabel.className = "task";
  checkBox.type = "checkbox";
  editField.type = "text";
  editField.className = "task";
  editBtn.innerText = "Edit";
  editBtn.className = "edit";
  deleteBtn.className = "delete";
  deleteImg.src = "./remove.svg";
  deleteBtn.appendChild(deleteImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(taskLabel);
  listItem.appendChild(editField);
  listItem.appendChild(editBtn);
  listItem.appendChild(deleteBtn);

  return listItem;
};

//add a new task
const addNewTask = () => {
  console.log("Adding a new task...");
  if (!newTaskInput.value) return;
  const listItem = createTaskItem(newTaskInput.value);
  todoListContainer.appendChild(listItem);
  bindTaskItemEvents(listItem, markTaskAsCompleted);
  newTaskInput.value = "";
};

//edit an existing task.
const editExistingTask = function () {
  console.log("Editing task...");
  const listItem = this.parentNode;
  const editField = listItem.querySelector("input[type=text]");
  const taskLabel = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("editMode");
  if (isEditMode) {
    taskLabel.innerText = editField.value;
    editBtn.innerText = "Edit";
  } else {
    editField.value = taskLabel.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("editMode");
};

//Delete task.
const removeTask = function () {
  console.log("Deleting task...");
  const listItem = this.parentNode;
  const parentUl = listItem.parentNode;
  parentUl.removeChild(listItem);
};

//mark task completed
const markTaskAsCompleted = function () {
  console.log("Marking task as completed...");
  const listItem = this.parentNode;
  completedListContainer.appendChild(listItem);
  bindTaskItemEvents(listItem, markTaskAsIncomplete);
};

//to mark a task as incomplete
const markTaskAsIncomplete = function () {
  console.log("Marking task as incomplete...");
  const listItem = this.parentNode;
  todoListContainer.appendChild(listItem);
  bindTaskItemEvents(listItem, markTaskAsCompleted);
};

//placeholder for AJAX request
const ajaxRequest = () => {
  console.log("AJAX request initiated");
};

//setting up event listeners
addTaskButton.onclick = addNewTask;
addTaskButton.addEventListener("click", addNewTask);
addTaskButton.addEventListener("click", ajaxRequest);

//function to bind events to task items
const bindTaskItemEvents = (taskItem, checkBoxEventHandler) => {
  console.log("Binding task item events...");
  const checkBox = taskItem.querySelector("input[type=checkbox]");
  const editBtn = taskItem.querySelector("button.edit");
  const deleteBtn = taskItem.querySelector("button.delete");
  editBtn.onclick = editExistingTask;
  deleteBtn.onclick = removeTask;
  checkBox.onchange = checkBoxEventHandler;
};
//initial binding for existing tasks
for (let i = 0; i < todoListContainer.children.length; i++) {
  bindTaskItemEvents(todoListContainer.children[i], markTaskAsCompleted);
}
for (let i = 0; i < completedListContainer.children.length; i++) {
  bindTaskItemEvents(completedListContainer.children[i], markTaskAsIncomplete);
}
