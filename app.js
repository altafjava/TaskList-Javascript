const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const addBtn = document.querySelector('.btn');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

loadAllEventListener();
function loadAllEventListener() {
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', removeAllTask);
  filter.addEventListener('keyup', filterTasks);
}
function getTasks() {
  let tasks = localStorage.getItem('tasks');
  tasks = localStorage.getItem('tasks') == null ? [] : JSON.parse(tasks);
  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.append(li);
  });
}
function addTask(e) {
  e.preventDefault();
  if (taskInput.value === '') {
    alert('Please enter something');
  } else {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.append(li);
    storeTasksInLocalStorage(taskInput.value);
    taskInput.value = '';
  }
}
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      let tasks = localStorage.getItem('tasks');
      tasks = JSON.parse(tasks);
      tasks.forEach(function (task, index) {
        if (task === e.target.parentElement.parentElement.textContent) {
          tasks.splice(index, 1);
        }
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      e.target.parentElement.parentElement.remove();
    }
  }
}

function removeAllTask() {
  // 1st Way
  // taskList.innerHTML = '';
  // 2nd way and this is faster than 1st one
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}
function filterTasks(e) {
  document.querySelectorAll('.collection-item').forEach(function (item) {
    if (item.textContent.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
function storeTasksInLocalStorage(task) {
  let tasks = localStorage.getItem('tasks');
  tasks = localStorage.getItem('tasks') == null ? [] : JSON.parse(tasks);
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
