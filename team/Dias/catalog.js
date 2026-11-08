(() => {
const Movie = window.KinoAlem.Movie;
const connectSaveButton = window.KinoAlem.storage.connectSaveButton;
const grid = document.querySelector('.movie-grid');
const cards = $('.movie-grid .movie-card');
const movies = Array.from(cards, (card, index) => new Movie(card, index));

function renderCatalog() {
    const query = $('#movie-query').val();
    const genre = $('#movie-genre').val();
    const order = $('#movie-sort').val();
    const sorted = [...movies].sort((a, b) => a.compare(b, order));
    let count = 0;

    for (const movie of sorted) {
        movie.card.hidden = !movie.matches(query, genre);
        if (!movie.card.hidden) count++;
        grid.append(movie.card);
    }

    $('#catalog-status').text(count + ' of ' + movies.length + ' films');
    if (count === 0) {
        $('#no-matches').stop(true, true).fadeIn(180);
    } else {
        $('#no-matches').stop(true, true).fadeOut(180);
    }
    $('#quick-view').hide();
}

for (const movie of movies) {
    movie.card.querySelector('.badge').after(' · ' + movie.year);
    connectSaveButton(movie.card.querySelector('.save'), movie.id, movie.title, 'Film', document.querySelector('#save-status'));
}

$('#catalog-controls').on('input change', renderCatalog);
$('#catalog-controls').on('submit', event => event.preventDefault());
$('#catalog-controls').on('reset', () => setTimeout(renderCatalog, 0));

$('#filter-help-button').on('click', function () {
    const isOpen = $(this).attr('aria-expanded') === 'true';
    $('#filter-help').stop(true, true).slideToggle(180);
    $(this).attr('aria-expanded', String(!isOpen));
});

$('.movie-grid').on('click', '.quick-info', function () {
    const card = $(this).closest('.movie-card');
    $('#quick-title').text(card.find('.card-title').text());
    $('#quick-description').text(card.find('.card-text').text());
    $('#quick-view').stop(true, true).slideDown(180);
});

$('#close-quick-view').on('click', () => {
    $('#quick-view').stop(true, true).slideUp(180);
});

renderCatalog();
})();
