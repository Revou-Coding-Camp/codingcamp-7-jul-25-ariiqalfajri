const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const filterBtn = document.getElementById('filter-btn');
const clearFilterBtn = document.getElementById('clear-filter-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');
const todoBody = document.getElementById('todo-body');

let todos = [];

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('todos');
  if (saved) {
    todos = JSON.parse(saved);
    renderTodos();
  }
});

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

addBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (!task || !task.replace(/\s/g, '') || !date) {
    alert('Please enter both task and date.');
    return;
  }

  const year = new Date(date).getFullYear();
  if (year > 9999 || year < 1000) {
    alert('Please enter a valid 4-digit year.');
    return;
  }

  todos.push({ task, date, done: false });
  saveTodos();
  
  renderTodos();
  taskInput.value = '';
  dateInput.value = '';
});

filterBtn.addEventListener('click', () => {
  const filterDate = prompt('Enter date to filter (dd-mm-yyyy):');

  const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  if (!filterDate || !dateRegex.test(filterDate)) {
    alert('Please enter a valid date in format dd-mm-yyyy');
    return;
  }

  const [dd, mm, yyyy] = filterDate.split('-');
  const formatted = `${yyyy}-${mm}-${dd}`;

  renderTodos(formatted);
  document.getElementById('filter-info').textContent = `Showing tasks for ${filterDate}`;
  document.getElementById('clear-filter-btn').style.display = 'inline-block';
});

clearFilterBtn.addEventListener('click', () => {
  renderTodos();
  document.getElementById('filter-info').textContent = '';
  document.getElementById('clear-filter-btn').style.display = 'none';
});

deleteAllBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete all tasks?')) {
    todos = [];
    saveTodos();
    renderTodos();
  }
});

function formatDate(isoDateStr) {
  const [yyyy, mm, dd] = isoDateStr.split('-');
  return `${dd}-${mm}-${yyyy}`;
}

function renderTodos(filter = '') {
  todoBody.innerHTML = '';

  const filtered = filter
    ? todos.filter(todo => todo.date === filter)
    : [...todos].sort((a, b) => new Date(a.date) - new Date(b.date));

  if (filtered.length === 0) {
    todoBody.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
    return;
  }

  filtered.forEach((todo, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${todo.task}</td>
    <td>${formatDate(todo.date)}</td>
    <td class="${todo.done ? 'status-done' : 'status-pending'}">
      ${todo.done ? '✅ Done' : '⏳ Pending'}
    </td>
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
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}
