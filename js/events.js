import { addTask, deleteTask, updateTask, getTasks } from './storage.js';
import { displayTasks, openModal } from './ui.js';
import { filterTasks, sortTasks } from './taskUtils.js';
import Task from './task.js';

// Event listener za dodavanje novih zadataka
document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = document.getElementById('task-input').value;
    const newTask = new Task(taskName, '', new Date().toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit', year: 'numeric' }), 'No Priority');
    addTask(newTask);
    displayTasks();
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

// Event za prikupljanje i snimanje podataka iz modalnog prozora
document.getElementById('saveBtn').addEventListener('click', () => {
    const taskId = document.getElementById('edit-task-id').value;
    const taskName = document.getElementById('taskModalLabel').value;
    const taskDescription = document.getElementById('edit-task-desc').value;
    const taskPriority = document.querySelector('input[name="btnradio"]:checked').value
    console.log(taskName, taskDescription, taskPriority, taskId);

    if (taskName === '') {
        alert ('Input polje je prazno!') // Ovde bi mogli vremenom uraditi neki lep prikaz korisniku za sada je samo Alert radi funkcionalnosti!
        return;
    };

    const updatedTask = {
        id: taskId,
        name: taskName,
        description: taskDescription,
        date: new Date().toDateString(),
        priority: taskPriority,
        completed: false
    };
    
    //Dodajem nov datum izmene zadatka
    updatedTask.updatedDate = new Date().toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit', year: 'numeric' });

    updateTask(updatedTask);
    displayTasks();

    document.getElementById('edit-task-form').reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
    modal.hide();
});

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
