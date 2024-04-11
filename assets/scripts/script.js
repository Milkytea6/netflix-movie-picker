const searchForm = document.getElementById('search-form');
const movieButton = document.getElementById('movie-button');
const movieResults = document.getElementById('movie-results');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'db036f9a6amshfdc5efa0a9dbed8p1e4200jsn1ac6baaee515',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
};
async function getStreamingData(url) {
    try {
        console.log(url);
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        for (let i = 0; i < result.result.length; i++) {
            console.log(result.result[i]);
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            const movieTitle = document.createElement('h2');
            movieTitle.classList.add('movie-title');
            movieTitle.textContent = ('title');
            const movieDescription = document.createElement('p');
            movieDescription.classList.add('movie-description');
            movieCard.append(movieTitle, movieDescription);
            movieResults.append(movieCard);
        }
    } catch (error) {
        console.error(error);
    }



}

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const searchInput = document.getElementById('search-bar').value;

    const url = `https://streaming-availability.p.rapidapi.com/search/title?title=${searchInput}&country=us&show_type=all&output_language=en`;
    console.log(url);
    getStreamingData(url);
}
);