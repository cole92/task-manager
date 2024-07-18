// Funkcija za generisanje jedinstvenog ID-a
const generateUniqueId = () => {
    return '_' + Math.random().toString(36).slice(2, 11);
};

// Kreiram klasu - sablon zadatka
class Task {
    constructor(name, description, date, priority, completed = false) {
        this.id = generateUniqueId()
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.completed = completed;
    }
}

// Funckija za dodavanje zadataka u Local Storage
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
