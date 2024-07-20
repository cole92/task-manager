import { addTask, deleteTask, updateTask } from './storage.js';
import { displayTasks } from './ui.js';
import Task from './task.js';

document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = document.getElementById('task-input').value;
    const newTask = new Task(taskName, '', new Date().toLocaleDateString(), 'Low');
    addTask(newTask);
    displayTasks();
    document.getElementById('task-form').reset();
});

document.getElementById('task-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const taskId = e.target.parentElement.dataset.id;
        deleteTask(taskId);
        displayTasks();
    }
});
