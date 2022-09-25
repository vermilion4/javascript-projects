/* LOCAL STORAGE */
// Set local storage item
// localStorage.setItem('name','john');

// Set session storage item
// sessionStorage.setItem('name','Bat');

// Remove from storage
// localStorage.removeItem('name');

//Get from storage
// const name = localStorage.getItem('name');
// console.log(name);

//clear local storage
// localStorage.clear();

document.querySelector('form').addEventListener('submit', function(e){
  
  const task = document.getElementById('task').value;

  let tasks;

  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  alert('Task saved');

  
  e.preventDefault();
})

const tasks = JSON.parse(localStorage.getItem('tasks'));

tasks.forEach(task => {
  console.log(task);
});