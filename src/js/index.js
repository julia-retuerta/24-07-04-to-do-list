// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const allTasks = [
  {
    id: Date.now(),
    task: 'Comprar el pan',
    completed: false
  }
];

const formElement = document.getElementById('form');
const inputTextTaskElement = document.getElementById('input-text-task');
const tasksListElement = document.getElementById('tasks-list');

const insertTasks = tasks => {
  const fragment = document.createDocumentFragment();

  allTasks.forEach(task => {
    const newLi = document.createElement('li');
    newLi.textContent = task.task;

    const newCheckbox = document.createElement('input');
    newCheckbox.setAttribute('type', 'checkbox');
    newCheckbox.checked = task.completed;

    newCheckbox.addEventListener('change');

    newLi.append(newCheckbox);
    fragment.append(newLi);
  });

  tasksListElement.textContent = '';
  tasksListElement.append(fragment);
};

formElement.addEventListener('submit', addTask);

const createTask = task => {
  const taskContent = inputTextTaskElement.value;

  if (taskContent !== '') {
    const newTask = {
      id: Date.now(),
      task: taskContent,
      completed: false
    };
    allTasks.push(newTask);
    inputTextTaskElement.value = '';
  }
};

insertTasks(allTasks);
