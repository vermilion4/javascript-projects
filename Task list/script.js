//Define vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {
  //Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear all tasks
  clearBtn.addEventListener('click', clearTasks);
  //Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

//Get tasks
function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach((task) => {
    //create li element
    const li = document.createElement('li');
    li.className = 'collection-item';

    //create text node and append to child
    li.appendChild(document.createTextNode(task));

    //create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    //Add icon fontawesome
    link.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    li.appendChild(link);
    taskList.appendChild(li);
  });
}
// Add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  } else {
    //create li element
    const li = document.createElement('li');
    li.className = 'collection-item';

    //create text node and append to child
    li.appendChild(document.createTextNode(taskInput.value));

    //create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    //Add icon fontawesome
    link.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    li.appendChild(link);
    taskList.appendChild(li);
  }

  //push to local storage
  storeTaskInLocalStorage(taskInput.value);

  //Clear input
  taskInput.value = '';

  e.preventDefault();
}

//Store task
function storeTaskInLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      //remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach((task, index) => {
    if (task === taskItem.textContent) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear tasks
function clearTasks() {
  // taskList.innerHTML = '';

  //faster

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //clear tasks from local storage
  clearAllTasksFromLocalStorage();
}

//Clear all tasks from local storage
function clearAllTasksFromLocalStorage() {
  localStorage.clear();
}

//Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
