import { addTask, deleteTask, updateTask, getTasks } from './storage.js';
import { displayTasks, openModal } from './ui.js';
import Task from './task.js';

// Event listener za dodavanje novih zadataka
document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = document.getElementById('task-input').value;
    const newTask = new Task(taskName, '', new Date().toLocaleDateString(), 'Low');
    addTask(newTask);
    displayTasks();
    document.getElementById('task-form').reset();
});

// Event listener za brisanje i oznacavanje zadataka kao zavrsenih i njihovu reaktivaciju
document.getElementById('task-list').addEventListener('click', (e) => {
    const taskCard = e.target.closest('.task-card');
    if (!taskCard) return;
    const taskId = taskCard.dataset.id;

    if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
        deleteTask(taskId);
        displayTasks();
    } else if (e.target.classList.contains('complete-btn') || e.target.closest('.complete-btn')) {
        let tasks = getTasks();
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                task.completed = !task.completed;
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
});

// Event listener za otvaranje modala klikom na karticu zadatka
document.getElementById('task-list').addEventListener('click', (e) =>{
    const taskCard = e.target.closest('.task-card');
    if (!taskCard) return;
    const taskId = taskCard.dataset.id;
    
    openModal(taskId);
})