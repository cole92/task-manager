// Funkcija za generisanje jedinstvenog ID-a
const generateUniqueId = () => {
    return '_' + Math.random().toString(36).slice(2, 11);
};

// Kreiram klasu - sablon zadatka

class Task {
    constructor(name, description, date, priority, completed = false) {
        this.id = generateUniqueId();
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.completed = completed;
    }
}

export default Task;
