// Funkcija za filtriranje zadataka
export const filterTasks = (tasks, filterType) => {
    if (filterType === 'filter-completed') {
        return tasks.filter(task => task.completed);
    } else if (filterType === 'filter-pending') {
        return tasks.filter(task => !task.completed);
    } else {
        return tasks;
    }
};

// Funckija za sortiranje zadataka
export const sortTasks = (tasks, sortType) => {
    // Delimo zadatke na zavrsene i ne zavrsene
    const completedTasks = tasks.filter(task => task.completed);
    const activeTasks = tasks.filter(task => !task.completed);

    // Sortiramo samo nezavrsene zadatke
    let sortedActiveTasks;

    if (sortType === 'sort-default') {
        sortedActiveTasks = activeTasks;
    } else if (sortType === 'sort-newest') {
        sortedActiveTasks = activeTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortType === 'sort-oldest') {
        sortedActiveTasks = activeTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortType === 'sort-highest') {
        sortedActiveTasks = activeTasks.sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority));
    } else if (sortType === 'sort-lowest') {
        sortedActiveTasks = activeTasks.sort((a, b) => priorityValue(b.priority) - priorityValue(a.priority));
    } else {
        sortedActiveTasks = activeTasks; // Defaultni sort
    }

    // Spajam sortirane aktivne zadatke sa zavrsenim zadacima na kraju
    return [...completedTasks, ...sortedActiveTasks];
};

// Pomocna funkcija za prioritet
const priorityValue = (priority) => {
    if (priority === 'High') return 3;
    if (priority === 'Medium') return 2;
    if (priority === 'Low') return 1;
    return 0; // No priority
};

// Funkcija za formatiranje datuma
export const formatDateForDisplay = (date) => {
    return date.toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

//Funckija za prikazivanje poruke korisniku
export const noResultsMessage = () => {
    document.getElementById('no-results-message').innerText = 'Nema zadataka koji odgovaraju pretrazi.'
};