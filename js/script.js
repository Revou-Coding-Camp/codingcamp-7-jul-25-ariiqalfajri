const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const filterBtn = document.getElementById('filter-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');
const todoBody = document.getElementById('todo-body');

let todos = [];

addBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (!task || !date) {
    alert('Please enter both task and date.');
    return;
  }

  todos.push({ task, date, done: false });
  renderTodos();
  taskInput.value = '';
  dateInput.value = '';
});

filterBtn.addEventListener('click', () => {
  const filterDate = prompt('Enter date to filter (YYYY-MM-DD):');
  if (filterDate) {
    renderTodos(filterDate);
  }
});

deleteAllBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete all tasks?')) {
    todos = [];
    renderTodos();
  }
});

function renderTodos(filter = '') {
  todoBody.innerHTML = '';

  const filtered = filter
    ? todos.filter(todo => todo.date === filter)
    : todos;

  if (filtered.length === 0) {
    todoBody.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
    return;
  }

  filtered.forEach((todo, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.done ? '✅ Done' : '⏳ Pending'}</td>
      <td>
        <button onclick="toggleStatus(${index})">Toggle</button>
        <button onclick="deleteTodo(${index})">Delete</button>
      </td>
    `;
    todoBody.appendChild(row);
  });
}

function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}