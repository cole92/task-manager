import { addTask, deleteTask, updateTask, getTasks } from './storage.js';
import { displayTasks, openModalForNewTask, openModal } from './ui.js';
import { filterTasks, sortTasks, noResultsMessage } from './taskUtils.js';
import Task from './task.js';

// Event listener za otvaranje modala
document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = document.getElementById('task-input').value;
    openModalForNewTask(taskName); // Otvara modal sa unetim imenom
    document.getElementById('task-form').reset();
});

// Event listener za brisanje i oznacavanje zadataka kao zavrsenih i njihovu reaktivaciju
document.getElementById('task-list').addEventListener('click', (e) => {
    const taskCard = e.target.closest('.task-card');
    if (!taskCard) return;
    const taskId = taskCard.dataset.id;

    // Provera koja akcija je pokrenuta
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

        // Automatsko sortiranje nakon oznacavanja zadatka kao zavrsenog
        const sortedTasks = sortTasks(tasks, 'sort-default');
        displayTasks(sortedTasks);

    } else if (taskCard && !taskCard.classList.contains('completed')) {
        // Ako je zadatak aktivan, otvori modal
        openModal(taskId);
    }
});

// Event listener za prikupljanje i snimanje podataka iz modalnog prozora
document.getElementById('saveBtn').addEventListener('click', () => {
    const taskId = document.getElementById('edit-task-id').value;
    const taskName = document.getElementById('taskModalLabel').value;
    const taskDescription = document.getElementById('edit-task-desc').value;
    const taskPriority = document.querySelector('input[name="btnradio"]:checked').value;

    if (taskName === '') {
        const toastElement = document.getElementById('emptyInputToast');
        const toast = new bootstrap.Toast(toastElement);
        toast.show();  // Prikazuje toast

        const modalElement = document.getElementById('taskModal');
        modalElement.classList.add('shake');

        // Uklanja "shake" klasu nakon zavrsetka animacije
        setTimeout(() => {
            modalElement.classList.remove('shake');
        }, 500); 
        return;
    }
    
    if (taskId) {
        // Azuriranje postojeceg zadatka
        const updatedTask = {
            id: taskId,
            name: taskName,
            description: taskDescription,
            date: new Date(),
            priority: taskPriority,
            completed: false
        };
        updatedTask.updatedDate = new Date();
        updateTask(updatedTask);
    } else {
        // Kreiranje novog zadatka
        const newTask = new Task(
            taskName,
            taskDescription,
            new Date(),
            taskPriority
        );
        addTask(newTask);
    }
    
    isDirty = false;

    displayTasks();
    document.getElementById('edit-task-form').reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
    modal.hide();
});
// Izdvojena logika za filtriranje i sortiranje
const applyFilterAndSort = (tasks, filterType, sortType) => {
    let filteredTasks = filterTasks(tasks, filterType);
    let sortedTasks = sortTasks(filteredTasks, sortType);
    return sortedTasks;
};

let currentFilter = 'filter-all';
let currentSort = 'sort-default';

// Filtriranje zadataka
const filterDropdown = document.querySelector('.dropdown-menu');
filterDropdown.addEventListener('click', (e) => {
    if (e.target.classList.contains('dropdown-item')) {
        currentFilter = e.target.id;
        let tasks = getTasks();
        let filteredAndSortedTasks = applyFilterAndSort(tasks, currentFilter, currentSort);
        displayTasks(filteredAndSortedTasks);
    }
});

// Sortiranje zadataka
const sortDropdown = document.querySelector('#sortList');
sortDropdown.addEventListener('click', (e) => {
    if (e.target.classList.contains('dropdown-item')) {
        currentSort = e.target.id;
        let tasks = getTasks();
        let filteredAndSortedTasks = applyFilterAndSort(tasks, currentFilter, currentSort);
        displayTasks(filteredAndSortedTasks);
    }
});
// Search bar
document.getElementById("search-input").addEventListener('input', (e) => {
    let inputValue = document.getElementById("search-input").value.toLowerCase();
    
    let filteredtask = filterTasks(getTasks(), currentFilter);
    let searchedTasks = filteredtask.filter(task => {
        return task.name.toLowerCase().includes(inputValue) || 
               task.description.toLowerCase().includes(inputValue);
    });
    // Provera podudaranja i prikaza poruke 
    if (searchedTasks.length === 0) {
        document.getElementById('task-list').innerHTML = '';
        noResultsMessage();
    } else {
        document.getElementById('no-results-message').innerText = '';
        displayTasks(searchedTasks);
    }
});

// Event listener za obavestenje o nesacuvanim podacima u modalu
let isDirty = false;
let allowClose = false; 

document.getElementById('edit-task-form').addEventListener('input', (e) => {
    const target = e.target;
    console.log('Detected change on:', target);
    // Provera da li se dogadjaj desio na relevantnim poljima
    if (target.matches('#edit-task-desc') ||
        target.matches('input[name="btnradio"]')) {
            
            isDirty = true;
        }
});
document.getElementById('taskModalLabel').addEventListener('input', (e) => {
    const target = e.target;
    console.log('Detected change on:', target);
        if (target.matches('#taskModalLabel')) {
            
            isDirty = true;
        }
})

// Event listener za proveru zatvaranja modala
document.getElementById('taskModal').addEventListener('hide.bs.modal', (e) => {
    if (isDirty && !allowClose) {
        e.preventDefault();  // Sprecava zatvaranje modala

        const toastElement = document.getElementById('unsavedChangesToast');
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        const modalElement = document.getElementById('taskModal');
        modalElement.classList.add('shake');

        // Uklanja "shake" klasu nakon zavrsetka animacije
        setTimeout(() => {
            modalElement.classList.remove('shake');
        }, 500);

        allowClose = true;  // Omogucava zatvaranje modala na sledeci pokusaj
    } else {
        isDirty = false;
        allowClose = false;
    }
});