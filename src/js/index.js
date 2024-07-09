// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

import iconCross from '../assets/images/icon-cross.svg';
import iconMoon from '../assets/images/icon-moon.svg';
import iconSun from '../assets/images/icon-sun.svg';

const formElement = document.getElementById('form');
const tasksElement = document.getElementById('tasks');
const itemsLeftElement = document.getElementById('items-left');
const deleteCompleteElement = document.getElementById('delete-completed');
const filtersElement = document.getElementById('filters');
const allFilters = document.querySelectorAll('.filter');

let allTasks = [
  {
    id: Date.now(),
    task: 'Comprar el pan',
    completed: false
  }
];

const countItemsLeft = () => {
  if (allTasks.length === 0) {
    itemsLeftElement.textContent = 'No tasks';
    return;
  }

  const itemsLeft = allTasks.filter(task => !task.completed).length;
  if (itemsLeft === 0) {
    itemsLeftElement.textContent = 'All tasks completed';
  } else {
    itemsLeftElement.textContent = `${itemsLeft} items left`;
  }
};

const insertTasks = () => {
  const fragment = document.createDocumentFragment();

  allTasks.forEach(task => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('task-container');

    const newCheck = document.createElement('input');
    newCheck.setAttribute('type', 'checkbox');
    newCheck.classList.add('task-check');
    newCheck.checked = task.completed;
    newCheck.id = task.id;

    const newText = document.createElement('label');
    newText.classList.add('task-text');
    newText.textContent = task.task;
    newText.htmlFor = task.id;

    const newTaskDelete = document.createElement('img');
    newTaskDelete.classList.add('task-delete');
    newTaskDelete.src = iconCross;

    newTaskDelete.addEventListener('click', () => deleteTask(task.id));
    newCheck.addEventListener('change', () => completeTask(task.id));

    newDiv.append(newCheck, newText, newTaskDelete);

    fragment.append(newDiv);
  });

  tasksElement.textContent = '';
  tasksElement.append(fragment);
  countItemsLeft();
};

const saveTask = task => {
  allTasks.push(task);
  insertTasks();
};

const createTask = task => {
  const newTask = {
    id: Date.now(),
    task: task,
    completed: false
  };

  saveTask(newTask);
};

const deleteTask = id => {
  allTasks = allTasks.filter(task => task.id !== id);
  insertTasks();
};

const completeTask = id => {
  allTasks = allTasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });

  insertTasks();
};

const deleteAllCompletedTasks = () => {
  allTasks = allTasks.filter(task => !task.completed);
  insertTasks();
};

const useFilters = () => {
  insertTasks();
};

filtersElement.addEventListener('click');

insertTasks();

formElement.addEventListener('submit', event => {
  event.preventDefault();
  if (!event.target.task.value) return;
  createTask(event.target.task.value);
  event.target.reset(); // para vaciar el campo del formulario cuando se envía la tarea
});

deleteCompleteElement.addEventListener('click', deleteAllCompletedTasks);

/////////////////////////

// const insertTasks = tasks => {
//   const fragment = document.createDocumentFragment();

//   allTasks.forEach(task => {
//     const newLi = document.createElement('li');
//     newLi.textContent = task.task;

//     const newCheckbox = document.createElement('input');
//     newCheckbox.setAttribute('type', 'checkbox');
//     newCheckbox.checked = task.completed;

//     newCheckbox.addEventListener('change');

//     const newImg = document.createElement('img');
//     newImg.src = newLi.append(newCheckbox);
//     fragment.append(newLi);
//   });

//   tasksListElement.textContent = '';
//   tasksListElement.append(fragment);
// };

// formElement.addEventListener('submit', insertTasks);

// const createTask = task => {
//   const taskContent = inputTextTaskElement.value;

//   if (taskContent !== '') {
//     const newTask = {
//       id: Date.now(),
//       task: taskContent,
//       completed: false
//     };
//     allTasks.push(newTask);
//     inputTextTaskElement.value = '';
//   }
// };

// insertTasks(allTasks);
