(() => {
const searchSeries = window.KinoAlem.searchSeries;
const connectSaveButton = window.KinoAlem.storage.connectSaveButton;
const form = document.querySelector('#series-search');
const input = document.querySelector('#series-title');
const message = document.querySelector('#series-status');
const results = document.querySelector('#series-results');
const submit = form.querySelector('button');

function showCard(show) {
    const card = document.querySelector('#series-card').content.cloneNode(true);
    card.querySelector('h2').textContent = show.name;
    const year = show.premiered ? show.premiered.slice(0, 4) : 'Year unknown';
    const rating = show.rating && show.rating.average != null ? show.rating.average : 'Unrated';
    card.querySelector('.metadata').textContent = year + ' · ' + (show.language || 'Language unknown') + ' · ' + rating;
    card.querySelector('.genres').textContent = Array.isArray(show.genres) && show.genres.length ? show.genres.join(' / ') : 'Genre not listed';
    card.querySelector('.source-link').href = 'https://www.tvmaze.com/shows/' + show.id;
    connectSaveButton(card.querySelector('button'), 'tv-' + show.id, show.name, 'Series', message);
    results.append(card);
}

form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submit.disabled) return;
    const title = input.value.trim();
    results.replaceChildren();
    if (!title) {
        message.textContent = 'Enter a series title first.';
        input.focus();
        return;
    }

    submit.disabled = true;
    results.setAttribute('aria-busy', 'true');
    message.textContent = 'Searching TVmaze for “' + title + '”…';
    try {
        const shows = await searchSeries(title);
        for (const show of shows) showCard(show);
        message.textContent = shows.length ? shows.length + ' results for “' + title + '”.' :
            'No series found. Try another title.';
    } catch (error) {
        results.replaceChildren();
        if (error.name === 'AbortError') message.textContent = 'Search timed out. Please try again.';
        else if (error instanceof TypeError) message.textContent = 'Internet connection failed. Please check your connection and try again.';
        else message.textContent = error.message;
    } finally {
        submit.disabled = false;
        results.setAttribute('aria-busy', 'false');
    }
});
})();
