(() => {
window.KinoAlem = window.KinoAlem || {};

async function searchSeries(title) {
    const url = 'https://api.tvmaze.com/search/shows?q=' + encodeURIComponent(title);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
            if (response.status === 429) throw new Error('Too many searches. Try again in a minute.');
            throw new Error('TVmaze is temporarily unavailable. Please try again.');
        }
        const rows = await response.json();
        if (!Array.isArray(rows)) throw new Error('Unexpected response from TVmaze.');
        return rows.map(row => row.show).filter(show =>
            show && Number.isInteger(show.id) && typeof show.name === 'string'
        );
    } finally {
        clearTimeout(timeout);
    }
}

window.KinoAlem.searchSeries = searchSeries;
})();
