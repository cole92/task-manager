import { getTasks } from "./storage.js";

export const displayTasks = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const tasks = getTasks();
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.dataset.id = task.id;
        li.innerHTML = `
            <span>${task.name}</span>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(li);
    });
};
