import { addTask, deleteTask, updateTask, getTasks } from './storage.js';
import { displayTasks, openModal } from './ui.js';
import Task from './task.js';

// Event listener za dodavanje novih zadataka
document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = document.getElementById('task-input').value;
    const newTask = new Task(taskName, '', new Date().toLocaleDateString(), 'No Priority');
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
        displayTasks();
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
    updatedTask.updatedDate = new Date().toLocaleDateString();

    updateTask(updatedTask);
    displayTasks();

    document.getElementById('edit-task-form').reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('taskModal'));
    modal.hide();
});
// Filtriranje zadataka 
const filterDropdown = document.querySelector('.dropdown-menu');

const filterTasks = (tasks, filterType) => {
    if (filterType === 'filter-completed') {
        return tasks.filter(task => task.completed);
    } else if (filterType === 'filter-pending') {
        return tasks.filter(task => !task.completed);
    } else {
        return tasks;
    }
};

filterDropdown.addEventListener('click', (e) => {
    if (e.target.classList.contains('dropdown-item')) {
        const selectedFilter = e.target.id;
        let tasks = getTasks();
        const filteredTasks = filterTasks(tasks, selectedFilter);
        displayTasks(filteredTasks);
    }
});
// Sortiranje zadataka
const sortDropdown = document.querySelector('#sortic');

sortDropdown.addEventListener('click', (e) => {
    if (e.target.classList.contains('dropdown-item')) {
        const selectedSort = e.target.id;
        let tasks = getTasks();
        const sortedTasks = sortTasks(tasks, selectedSort);
        displayTasks(sortedTasks);
    }
});
const sortTasks = (tasks, sortType) => {
    if (sortType === 'sort-newest') {
        return tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortType === 'sort-oldest') {
        return tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortType === 'sort-highest') {
        return tasks.sort((a, b) => priorityValue(b.priority) - priorityValue(a.priority));
    } else if (sortType === 'sort-lowest') {
        return tasks.sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority));
    } else {
        return tasks; // Defaultni sort
    }
};
const priorityValue = (priority) => {
    if (priority === 'High') return 3;
    if (priority === 'Medium') return 2;
    if (priority === 'Low') return 1;
    return 0; // No priority
};
