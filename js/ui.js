import { getTasks } from "./storage.js";
import { formatDateForDisplay, highlightText } from "./taskUtils.js";

// Funkcija za kreiranje HTML strukture za karticu zadatka
const createTaskCard = (task) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-12 col-md-6 col-lg-4';

// Logika za odredjivanje prioriteta
    const cardDiv = document.createElement('div');
        cardDiv.className = `card task-card 
            ${task.priority === 'High' ? 'priority-high' : 
            task.priority === 'Medium' ? 'priority-medium' : 
            task.priority === 'Low' ? 'priority-low' : 
            'no-priority'} 
            ${task.completed ? 'completed' : ''}`;
        cardDiv.dataset.id = task.id;

        const inputValue = document.getElementById("search-input")?.value.toLowerCase() || '';

        // Logika za duzinu i prikaz task description i higlight na karticama
        let shortDescription = task.description.length > 20 
            ? task.description.slice(0, 20) + '...' 
            : task.description;
        const taskDescription = highlightText(shortDescription, inputValue);
    
        const dateText = task.updatedDate 
            ? `Changed on: ${formatDateForDisplay(new Date(task.updatedDate))}` 
            : `Created on: ${formatDateForDisplay(new Date(task.date))}`;      
        
        // Kreiranje htmla
        cardDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${highlightText(task.name, inputValue)}</h5>
                <p class="card-text">${taskDescription}</p>
                <p class="card-text"><small class="text-muted">${dateText}</small></p>
                <div class="btn-group">
                    <button class="checkButtons btn btn-success btn-sm complete-btn">${task.completed ? 'REACTIVATE' : '<i class="fas fa-check"></i>'}</button>
                    <button class="checkButtons btn delete-btn"><i class="fas fa-trash delete-btn"></i></button>
                </div>
            </div>
        `;
        
        colDiv.appendChild(cardDiv);
        return colDiv;
    };

// Funkcija za prikazivanje zadataka
export const displayTasks = (tasks = getTasks()) => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskCard = createTaskCard(task);
        // Dodajemo kartice na pocetak umesto na kraj liste
        if (taskList.firstChild) {
            taskList.insertBefore(taskCard, taskList.firstChild);
        } else {
            taskList.appendChild(taskCard);
        }
    });
};

// Funkcija za otvaranje modalnog prozora sa unetim imenom zadatka
export const openModalForNewTask = (taskName) => {
    document.getElementById('taskModalLabel').value = taskName;
    document.getElementById('edit-task-id').value = ''; 
    document.getElementById('edit-task-desc').value = ''; 
    document.querySelector('input[name="btnradio"][value="No Priority"]').checked = true; 

    const modal = new bootstrap.Modal(document.getElementById('taskModal'));
    modal.show();
    // Fokusiranje na input za naziv zadatka
    setTimeout(() => {
        document.getElementById('taskModalLabel').focus();
    }, 500);
};

// Funkcija za otvaranje modalnog prozora sa zadatkom
export const openModal = (taskId) => {
    const tasks = getTasks();
    const task = tasks.find(task => task.id === taskId);
    
    if (task) {
        document.getElementById('edit-task-id').value = task.id;
        document.getElementById('taskModalLabel').value = task.name;
        document.getElementById('edit-task-desc').value = task.description;

        const priority = task.priority;
        const priorityRadioButton = document.querySelector(`input[name="btnradio"][value="${priority}"]`);
        
        if (priorityRadioButton) {
            priorityRadioButton.checked = true;
        } else {
            document.querySelector('input[name="btnradio"][value="No Priority"]').checked = true;
        };

        const modal = new bootstrap.Modal(document.getElementById('taskModal'));
        modal.show();

        setTimeout(() => {
            document.getElementById('taskModalLabel').focus();
        }, 500);
    }
};
