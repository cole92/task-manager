import { getTasks } from "./storage.js";

export const displayTasks = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const tasks = getTasks();
    tasks.forEach(task => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-12 col-md-6 col-lg-4';

        const cardDiv = document.createElement('div');
        cardDiv.className = `card task-card ${task.priority === 'High' ? 'priority-high' : task.priority === 'Medium' ? 'priority-medium' : 'priority-low'} ${task.completed ? 'completed' : ''}`;
        cardDiv.dataset.id = task.id;
        cardDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${task.name}</h5>
                <p class="card-text">${task.description.slice(0, 30)}...</p>
                <p class="card-text"><small class="text-muted">Created on: ${task.date}</small></p>
                <div class="btn-group">
                    <button class="checkButtons btn btn-success btn-sm complete-btn">${task.completed ? 'REACTIVATE' : '<i class="fas fa-check"></i>'}</button>
                    <button class="checkButtons btn delete-btn"><i class="fas fa-trash delete-btn"></i></button>
                </div>
            </div>
        `;
        
        colDiv.appendChild(cardDiv);
        // Dodajemo kartice na pocetak umesto na kraj liste
        if (taskList.firstChild) {
            taskList.insertBefore(colDiv, taskList.firstChild);
        } else {
            taskList.appendChild(colDiv);
        }
    });
};
