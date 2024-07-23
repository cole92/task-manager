import { getTasks } from "./storage.js";

export const displayTasks = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const tasks = getTasks();
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;
        li.innerHTML = `
            <span>${task.name}</span>
            <button class="btn btn-danger btn-sm delete-btn"><i class="fas fa-trash"></i></button>
            <button class="btn btn-success btn-sm complete-btn"><i class="fas fa-check"></i></button>
        `;
        taskList.appendChild(li);
    });
};
