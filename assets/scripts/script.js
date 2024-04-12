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
            // Movie card div
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            // Movie Img
            const movieImg = document.createElement('img');
            movieImg.classList.add('movie-img');
            // movieImg.src = 'url of img';
            // Movie Title
            const movieTitle = document.createElement('h2');
            movieTitle.classList.add('movie-title');
            movieTitle.textContent = (`${result.result[i].title}`);
            // Movie Genres
            const movieGenre = document.createElement('p');
            movieGenre.classList.add('movie-Genre');
            movieGenre.textContent = (`${result.result[i].genres.map((genre) => genre.name).join(',')}`);
            // Movie Service
            const movieService = document.createElement('p');
            movieService.classList.add('movie-service');
            const serviceArray = result.result[i].streamingInfo.us
            // If there is streaming info, then it will itterate over the array returning each unique service that the movie is on.
            if (serviceArray) {
                let uniqueServices = [];
                for (let i = 0; i < serviceArray.length; i++) {
                    uniqueServices = uniqueServices.concat(serviceArray[i].service)
                }
                uniqueServices = uniqueServices.filter((item,
                    index) => uniqueServices.indexOf(item) === index);

                movieService.textContent = uniqueServices.join(',');
            }

            else if (!serviceArray) {
                movieService.textContent = ('Service is unavailable.');
            }

            // Append movie title and genre to card
            movieCard.append(movieTitle, movieGenre, movieService);
            // Append card to document
            movieResults.append(movieCard);
        }
    } catch (error) {
        console.error(error);
    }



}

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Clears the  results section
    movieResults.innerHTML = "";

    const searchInput = document.getElementById('search-bar').value;

    const url = `https://streaming-availability.p.rapidapi.com/search/title?title=${searchInput}&country=us&show_type=all&output_language=en`;
    console.log(url);
    getStreamingData(url);
}
);