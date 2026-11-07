(() => {
const { readList, writeList, storageKey } = window.KinoAlem.storage;
const grid = document.querySelector('#saved-titles');
const message = document.querySelector('#list-status');
const clearButton = document.querySelector('#clear-watchlist');

function updateEntry(id, form, remove) {
    try {
        const items = readList();
        const entry = items.find(item => item.id === id);
        if (!entry) {
            message.textContent = 'This title was already removed.';
        } else if (remove) {
            writeList(items.filter(item => item.id !== id));
            message.textContent = entry.title + ' removed.';
        } else {
            entry.status = form.elements.namedItem('status').value;
            entry.note = form.elements.namedItem('note').value.trim();
            writeList(items);
            message.textContent = 'Changes saved for ' + entry.title + '.';
        }
        renderList();
    } catch (error) {
        message.textContent = 'Could not save changes. ' + error.message;
    }
}

function renderList() {
    let items;
    try {
        items = readList();
    } catch (error) {
        message.textContent = error.message;
        clearButton.disabled = true;
        return;
    }

    grid.replaceChildren();
    const watched = items.filter(item => item.status === 'watched').length;
    document.querySelector('#total-count').textContent = items.length;
    document.querySelector('#planned-count').textContent = items.length - watched;
    document.querySelector('#watched-count').textContent = watched;
    document.querySelector('#empty-list').hidden = items.length !== 0;
    clearButton.disabled = items.length === 0;

    for (const entry of items) {
        const card = document.querySelector('#saved-card').content.cloneNode(true);
        card.querySelector('h2').textContent = entry.title;
        card.querySelector('.section-tag').textContent = entry.type;
        const form = card.querySelector('form');
        form.elements.namedItem('status').value = entry.status;
        form.elements.namedItem('note').value = entry.note;
        form.addEventListener('submit', event => {
            event.preventDefault();
            updateEntry(entry.id, form, false);
        });
        form.querySelector('.remove').addEventListener('click', () => updateEntry(entry.id, form, true));
        grid.append(card);
    }
}

clearButton.addEventListener('click', () => {
    if (!window.confirm('Remove every title from your watchlist?')) return;
    try {
        writeList([]);
        message.textContent = 'Watchlist cleared.';
        renderList();
    } catch (error) {
        message.textContent = 'Could not clear the watchlist. ' + error.message;
    }
});

window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) renderList();
});
renderList();
})();
