const form = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const todoList = document.getElementById('todo-list');
const filterDate = document.getElementById('filter-date');

let todos = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = todoInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) {
    alert('Please fill in both fields.');
    return;
  }

  const todo = { task, date };
  todos.push(todo);
  renderTodos();
  form.reset();
});

filterDate.addEventListener('change', () => {
  renderTodos();
});

function renderTodos() {
  todoList.innerHTML = '';

  const filtered = filterDate.value
    ? todos.filter(todo => todo.date === filterDate.value)
    : todos;

  filtered.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${todo.task}</strong><br/>
        <small>${todo.date}</small>
      </div>
      <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
    `;
    todoList.appendChild(li);
  });
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}