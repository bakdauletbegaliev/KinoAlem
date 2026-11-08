# KinoAlem — Web Technologies Final Project

**Group SE-2526**
**Members:** Dias Sabit, Bakdaulet Begaliev, Zhangir Kairov

KinoAlem is a multi-page website about Kazakh films. Visitors can explore featured films, read movie details, filter and sort the catalog, search TV series with a public API, and keep a personal watchlist. The final project keeps the original pages and extends the Endterm JavaScript and jQuery functionality.

- Repository: https://github.com/bakdauletbegaliev/KinoAlem
- GitHub Pages address: https://bakdauletbegaliev.github.io/KinoAlem/
- **Important:** the URL above will show this updated version only after the team copies this folder into the repository and publishes it. This ZIP is not automatically deployed.

## How to run

### Windows (recommended)

1. Extract the ZIP completely.
2. Open the `KinoAlem` folder.
3. Double-click **`RUN_KINOALEM.bat`**. The site opens in your browser automatically.
4. Keep the console window running while using KinoAlem. Close it or press Ctrl+C when finished.

Python must be installed. If Python is not installed, open this folder in VS Code and right-click `index.html` -> **Open with Live Server** instead. Do not open the HTML from inside the ZIP.

You can also use a terminal in this folder:

```powershell
py run_site.py
```

**Why a local server?** When HTML files are opened by double-clicking them (`file:///`), some browsers treat storage differently for each page. This can make a saved title disappear on the Watchlist page. A local server gives all pages one stable origin, so `localStorage` works consistently. The JavaScript is also loaded as classic scripts instead of module imports to avoid the previous blocked-module issue.

Bootstrap and jQuery are included in `vendor/`; there is no npm installation. API search requires an internet connection to TVmaze. The Contact form checks fields but does not send real email.

### Test the search for Sherlock

Open **Discover** -> type `Sherlock` -> click **Search series** -> click **Save to watchlist** on a result -> open **Watchlist** from the navigation bar. A successful search requires TVmaze to be reachable over the internet. If unavailable, the page displays a clear error.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Home, genre buttons, featured movie, trailer modal |
| `about.html` | Project introduction |
| `movies.html` | Film catalog, search, genre filter, sorting, quick previews and save buttons |
| `movie-details.html` | NinetyOne movie details and tabs |
| `movie-details-shal.html` | Shal movie details and tabs |
| `movie-details-zamanback.html` | Zamanback movie details and tabs |
| `discover.html` | TVmaze API search and dynamic results |
| `watchlist.html` | Saved movies and series, editable status/notes, statistics and removal |
| `contact.html` | Contact form with custom JavaScript validation |

## Endterm requirements preserved

- **HTML, CSS and Bootstrap:** responsive multi-page layout, working links, mobile navigation, movie details and tabs.
- **Arrays and loops:** `movies` in `catalog.js`, arrays of TVmaze results and stored watchlist entries; `for...of`, `forEach`, `filter`, `map`, `some`, `find`, `sort`.
- **Functions:** `renderCatalog`, `getError`, `validateField`, `showCard`, `renderList`, `updateEntry` and others use parameters and return values where useful.
- **DOM:** cards are created from HTML templates (`discover.js` and `watchlist.js`), text and attributes are changed, cards can be added/removed, film cards are reordered.
- **Events:** `click`, `input`, `change`, `submit`, `reset` and `storage` events. Form submission uses `preventDefault()`.
- **Five useful interactions:** catalog search, genre filtering, sorting, quick previews, watchlist, film information tabs and contact validation.
- **Form validation:** `contact.js` validates the name (minimum two characters), email address, and message (minimum ten characters). Each field has its own inline error. Invalid forms are blocked. Valid inputs display a clear local success message.
- **jQuery:** `catalog.js` uses ID selectors (`$('#movie-query')`), class/descendant selectors (`$('.movie-grid .movie-card')`), `.closest()` and `.find()` traversal, `input`, `change` and `click` handlers, and useful `.fadeIn()`, `.fadeOut()`, `.slideToggle()`, `.slideDown()` and `.slideUp()` effects.

## Final project: five main advanced features

| Feature | Requirement | Files | How to demonstrate |
| --- | --- | --- | --- |
| 1. TVmaze API integration | Mandatory API | `team/Bakdaulet/api.js`, `discover.js` | Search for Sherlock, then try a random title and test Offline mode |
| 2. Movie class and objects | Mandatory OOP | `team/Dias/movie.js`, `catalog.js` | Show `constructor`, `matches()` and `compare()`, then sort/filter the objects |
| 3. Persistent watchlist | Mandatory localStorage | `team/Zhangir/storage.js` | Save a film, refresh Watchlist, and see it again |
| 4. Complete CRUD | Additional approved feature | `team/Zhangir/watchlist.js` | Create, read, update status/note, remove a title or clear all |
| 5. Advanced search/filter/sort | Additional approved feature | `team/Dias/catalog.js` | Combine name and genre; sort A–Z/year; reset |

**Extra feature:** A watchlist statistics panel displays total, planned and watched counts. Contact also demonstrates custom form validation. These support the experience but are not needed to reach the five required feature categories.

### API information

TVmaze public endpoint: `GET https://api.tvmaze.com/search/shows?q=Sherlock`
Documentation: https://www.tvmaze.com/api
Attribution: https://www.tvmaze.com/ (CC BY-SA 4.0: https://creativecommons.org/licenses/by-sa/4.0/)

The project uses `fetch`, `async/await`, `response.ok` and `response.json()` with regular script tags for compatibility. A loading message appears while searching; results are made with `template.content.cloneNode(true)` and `textContent`. Empty searches, zero results, request errors, rate limits and timeouts are handled. No API key is required.

### LocalStorage information

Key: `kinoalem.watchlist.v1`. Each saved entry contains an `id`, `title`, `type`, `status` and `note`. The data is stored as JSON, recovered when the page reloads, and checked before use. Invalid JSON is treated as an empty list. Duplicate IDs cannot be added. Each entry can be updated or deleted; the Clear all button requires confirmation. Data is private to the current browser and website origin.

## Team responsibilities

| Member | Main ownership | Key files |
| --- | --- | --- |
| Dias Sabit | Movies catalog, OOP, jQuery filters, previews and animations | `team/Dias/movie.js`, `catalog.js` |
| Bakdaulet Begaliev | API search, dynamic series results, Contact validation | `team/Bakdaulet/api.js`, `discover.js`, `contact.js` |
| Zhangir Kairov | Storage, watchlist, CRUD and statistics | `team/Zhangir/storage.js`, `watchlist.js` |

Every member must be able to explain the **entire website**, not only their own files. Individual defence guides are in each `team/<name>/DEFENSE.md`.

## Testing before submission

1. **All pages:** Click Home, About, Movies, Discover, Watchlist, Contact, and the three film Details links. Check the mobile navigation and the detail-page tabs.
2. **Movies:** Search `Shal`, choose `Drama`, then choose `Sci-Fi` to display no matches. Reset and sort by year. Open and close Quick preview and the filter-help panel.
3. **jQuery:** Explain the `.movie-grid .movie-card` selector, `.closest()` and `.find()`, the two animation families, and the `input`, `change` and `click` events.
4. **Contact:** Submit empty fields, then an invalid email, a one-character name and a short message. Check that each error appears under its field. Correct them and submit to see success.
5. **Watchlist:** Save a film twice (only one copy should appear). Change its status and note, refresh, delete it, then add another and try Clear all.
6. **API:** Search `Sherlock`; search a nonsense string; turn the Network tab Offline in DevTools and search again; turn it Online and retry.
7. **Console:** Check for errors during normal use, including on a narrow phone-sized window.

See `TEST_CHECKLIST.md` for manual end-to-end checks. Mock API tests do not replace testing TVmaze over a real internet connection.

## Publish the final version

The repository owner should copy **the contents inside this `KinoAlem` folder** to the root of the existing repository. Keep the existing `.git` directory; do not create a new unrelated repository.

```powershell
git status
git add .
git commit -m "Complete final project requirements and testing"
git push origin main
```

In GitHub → Settings → Pages, deploy from `main` and `/ (root)` (or the repository's actual configured branch). After the new version is live, check Discover, Watchlist, form validation, all links and console errors. The team must carry out this publishing step; it is not included in the ZIP.

## Continuation and submission history

The provided source package described commit `185c801` as an earlier HTML/Bootstrap baseline. **That is not proof that it was the exact Endterm submission.** The teacher requests five substantial features added *after* Endterm. Compare this final folder with the actual submitted Endterm commit or ZIP and clearly identify the five genuinely new features. Do not claim a feature was added after Endterm if it already existed there. Preserve the previous project, topic and group in the same repository.

See `CRITERIA_CHECKLIST.md` for a compact mapping of each requirement to its implementation.
