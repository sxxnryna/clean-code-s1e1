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

//Mark task completed
const markTaskAsCompleted = function () {
  console.log("Marking task as completed...");
  const listItem = this.parentNode;
  completedListContainer.appendChild(listItem);
  bindTaskItemEvents(listItem, markTaskAsIncomplete);
};

//Append the task list item to the #completed-tasks
var listItem = this.parentNode;
completedTasksHolder.appendChild(listItem);
bindTaskEvents(listItem, taskIncomplete);

var taskIncomplete = function () {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var ajaxRequest = function () {
  console.log("AJAX Request");
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
