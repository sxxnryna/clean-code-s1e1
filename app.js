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

//Edit an existing task.

var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".edit");
  var containsClass = listItem.classList.contains("editMode");
  //If class of the parent is .editmode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("editMode");
};

//Delete task.
var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

//Mark task completed
var taskCompleted = function () {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

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
