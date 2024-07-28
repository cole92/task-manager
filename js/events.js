import { addTask, deleteTask, updateTask, getTasks } from './storage.js';
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
// Listener za delete-btn
document.getElementById('task-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
        const taskId = e.target.closest('.task-card').dataset.id;
        deleteTask(taskId);
        displayTasks();
    }
});
// Listener za complete-btn
document.getElementById('task-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('complete-btn') || e.target.closest('.complete-btn')) {
        const taskId = e.target.closest('.task-card').dataset.id;
        let tasks = getTasks();
        tasks = tasks.map(task => {
            if (taskId === taskId) {
                task.completed = !task.completed;
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks()
    }
})
