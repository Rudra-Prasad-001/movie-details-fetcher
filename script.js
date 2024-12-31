
// const movieTitle = document.querySelector('.movie-title');

//Made using fetch()  and omdb api


const submit = document.querySelector('.submit');

submit.addEventListener('click', getMovieDetails);

function getMovieDetails() {
    const movieTitle = String(document.querySelector('.movie-title').value).trim();
    const dialog = document.querySelector('.dialog');
    const loading = document.querySelector('.loading');
    const showDetails = document.querySelector('.show-details');
    const showTitle = document.querySelector('.show-title');
    const showCrew = document.querySelector('.show-crew');
    const showPlot = document.querySelector('.show-plot');
    const showRating = document.querySelector('.show-imdb-rating');

    if (movieTitle === '') {
        dialog.innerHTML = `Please enter a valid movie name!`;
        showDetails.classList.add('hidden'); // Hide details if input is invalid
        loading.classList.add('hidden'); // Hide loading spinner
        return;
    }

    const movieName = movieTitle.replaceAll(' ', '+');
    const url = `https://www.omdbapi.com/?t=${movieName}&apikey=fc5e9a81`; // my API key

    // Show loading spinner
    loading.classList.remove('hidden');
    dialog.innerHTML = ''; // Clear any previous error messages
    showDetails.classList.add('hidden'); // Hide details while fetching data

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            loading.classList.add('hidden'); // Hide loading spinner once data is fetched
            if (data.Response === 'False') {
                throw new Error(data.Error);
            }

            showDetails.classList.remove('hidden'); // Show details if valid movie found
            showTitle.textContent = `Title: ${data.Title}`;
            showCrew.textContent = `Writers: ${data.Writer} | Actors: ${data.Actors}`;
            showPlot.textContent = data.Plot;
            showRating.textContent = `IMDb Rating: ${data.imdbRating}`;
        })
        .catch((err) => {
            loading.classList.add('hidden'); // Hide loading spinner in case of error
            dialog.innerHTML = `Oops! Something went wrong. ${err.message}`;
            showDetails.classList.add('hidden'); // Hide details if there's an error
        });
}
