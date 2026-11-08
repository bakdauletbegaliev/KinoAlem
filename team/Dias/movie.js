(() => {
window.KinoAlem = window.KinoAlem || {};

class Movie {
    constructor(card, position) {
        this.card = card;
        this.position = position;
        this.id = 'film-' + card.dataset.id;
        this.year = Number(card.dataset.year);
        this.title = card.querySelector('.card-title').textContent.trim();
        this.genre = card.querySelector('.badge').textContent.trim();
    }

    matches(query, genre) {
        const title = this.title.toLowerCase().replaceAll(' ', '');
        return title.includes(query.toLowerCase().trim().replaceAll(' ', '')) &&
            (genre === '' || this.genre === genre);
    }

    compare(other, order) {
        if (order === 'year') return other.year - this.year;
        if (order === 'title') return this.title.localeCompare(other.title);
        return this.position - other.position;
    }
}

window.KinoAlem.Movie = Movie;
})();
