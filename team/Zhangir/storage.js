(() => {
window.KinoAlem = window.KinoAlem || {};

const storageKey = 'kinoalem.watchlist.v1';

function validEntry(item) {
    return item && typeof item.id === 'string' && typeof item.title === 'string' &&
        ['Film', 'Series'].includes(item.type) && ['planned', 'watched'].includes(item.status) &&
        typeof item.note === 'string';
}

function readList() {
    let data;
    try {
        data = localStorage.getItem(storageKey);
    } catch (error) {
        throw new Error('Browser storage is not available. Run KinoAlem with RUN_KINOALEM.bat or Live Server.');
    }
    if (data === null) return [];
    try {
        const items = JSON.parse(data);
        return Array.isArray(items) ? items.filter(validEntry) : [];
    } catch (error) {
        return [];
    }
}

function writeList(items) {
    localStorage.setItem(storageKey, JSON.stringify(items));
}

function connectSaveButton(button, id, title, type, message) {
    function showSaved() {
        button.textContent = 'Saved ✓';
        button.disabled = true;
        button.setAttribute('aria-label', title + ' is on your watchlist');
    }

    try {
        if (readList().some(item => item.id === id)) showSaved();
    } catch (error) {
        message.textContent = error.message;
    }

    button.addEventListener('click', () => {
        try {
            const items = readList();
            if (items.some(item => item.id === id)) {
                showSaved();
                message.textContent = title + ' is already on your watchlist.';
                return;
            }
            items.push({ id, title, type, status: 'planned', note: '' });
            writeList(items);
            showSaved();
            message.textContent = title + ' added to your watchlist. Open Watchlist to see it.';
        } catch (error) {
            message.textContent = 'Cannot save this title. ' + error.message;
        }
    });
}

window.KinoAlem.storage = { storageKey, readList, writeList, connectSaveButton };
})();
