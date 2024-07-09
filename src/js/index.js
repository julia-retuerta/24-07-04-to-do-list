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

// Esta función recibe un array de tareas (tasksToRender) y las renderiza en el DOM. Por defecto, usa allTasks si no se pasa otro array.
const insertTasks = (tasksToRender = allTasks) => {
  const fragment = document.createDocumentFragment();

  // Código para crear y añadir tareas a fragment
  tasksToRender.forEach(task => {
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

  // Vacía el contenedor de tareas
  tasksElement.textContent = '';
  // Añade el fragmento
  tasksElement.append(fragment);
  // Actualiza el contador de tareas restantes
  countItemsLeft();
};

// Función para añadir una nueva tarea al array allTasks y llamar a insertTasks para actualizar la lista de tareas renderizadas
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

  // Llamar a saveTask para guardar y renderizar la tarea.
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

// Elimina todas las tareas completadas del array allTasks
const deleteAllCompletedTasks = () => {
  allTasks = allTasks.filter(task => !task.completed);
  insertTasks();
};

// Devuelve un array de tareas filtrado
const getFilteredTasks = filter => {
  let filteredTasks = allTasks;
  if (filter === 'active') {
    filteredTasks = allTasks.filter(task => !task.completed);
  } else if (filter === 'completed') {
    filteredTasks = allTasks.filter(task => task.completed);
  }

  return filteredTasks;
};

// Parte visual de los filtros, para manejar el evento de clic en los botones de filtro
// Verifica si el botón tiene un filtro (dataset.filter)
// Elimina la clase activa de todos los botones de filtro
// Añade la clase activa al botón clicado
// Llama a getFilteredTasks con el filtro seleccionado y actualiza la lista renderizada con las tareas filtradas.
const filterTasks = event => {
  if (!event.target.dataset.filter) return;
  allFilters.forEach(filter => filter.classList.remove('filter--active'));
  event.target.classList.add('filter--active');
  const filteredTasks = getFilteredTasks(event.target.dataset.filter);
  insertTasks(filteredTasks);
};

// Llamada inicial que renderiza todas las tareas cuando se carga la página.
insertTasks();

// Verifica que el campo de entrada no esté vacío
// Crea una nueva tarea con el valor del campo de entrada
formElement.addEventListener('submit', event => {
  event.preventDefault();
  if (!event.target.task.value) return;
  createTask(event.target.task.value);
  event.target.reset(); // para vaciar el campo del formulario cuando se envía la tarea
});

deleteCompleteElement.addEventListener('click', deleteAllCompletedTasks);

filtersElement.addEventListener('click', filterTasks);

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
