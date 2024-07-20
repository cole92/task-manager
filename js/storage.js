import Task from './task.js';  // Neophodno samo ako koristim klasu Task unutar ovog fajla

// Funkcija za dodavanje zadataka u Local Storage
export const addTask = (task) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Funkcija za uzimanje zadataka iz Local Storage
export const getTasks = () => {
    return JSON.parse(localStorage.getItem('tasks')) || [];
};

// Funkcija za azuriranje zadatka u Local storage
export const updateTask = (updatedTask) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Funkcija za brisanje zadataka iz Local Storage
export const deleteTask = (taskId) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
