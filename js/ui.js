import { getTasks } from "./storage.js";

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
        
    // Logika za duzinu i prikaz task description na karticama
    const taskDescription = task.description === ''
        ? '...'
        : task.description.length > 25
        ? task.description.slice(0, 25) + '...'
        : task.description;

    // Logika izmedju created i updated task
    const dateText = task.updatedDate 
        ? `Changed on: ${task.updatedDate}` 
        : `Created on: ${task.date}`;        

    // Kreiranje HTML-a za karticu
    cardDiv.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${task.name}</h5>
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
export const displayTasks = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const tasks = getTasks();
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

// Funkcija za otvaranje modalnog prozora 
export const openModal = (taskId) => {
    const tasks = getTasks();
    const task = tasks.find(task => task.id === taskId);
    
    if (task) {
        
        document.getElementById('edit-task-id').value = task.id;
        document.getElementById('taskModalLabel').value = task.name;
        document.getElementById('edit-task-desc').value = task.description;

    // No priority po defaultu
    document.getElementById('btnradio1').checked = true;

    // Prikazivanje modala
    const modal = new bootstrap.Modal(document.getElementById('taskModal'));
    modal.show();

    // Cekamo da se modal ucita i fokusiramo na input polje ( da korisnik zna da moze menjati naslov :) )
    setTimeout(() => {
        document.getElementById('taskModalLabel').focus();
    }, 500);
    }
};