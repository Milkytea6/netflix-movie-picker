const modalButton = document.getElementById('movie-button');
const modal = document.querySelector('.ui.modal');
const genreButtons = document.querySelectorAll('.genre-container #genres')
const modalSubmit = document.querySelector('#modal-submit');
const overlay = document.getElementById('overlay');
const closeX = document.getElementById('close-x');



modalButton.addEventListener('click', function () {
    modal.classList.add('active');
    modal.style.display = 'block';
    overlay.style.display = 'block';
})

function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

window.onclick = function (e) {
    if (e.target == overlay) {
        closeModal();
    };
}

closeX.addEventListener('click', function () {
    closeModal();
})

let genreArray = [];

genreButtons.forEach(function (button) {
    // Add event listener for each button (e.g., click event)
    button.addEventListener('click', function () {
        // Retrieve the API value attached to the button
        const apiValue = button.getAttribute('data-result-api');
        // Your code here for using the API value
        console.log('API value attached to button: ' + apiValue);
        genreArray.push(apiValue);
    });
});

// creates active class on clicked button in the actions div
$(document).ready(function () {
    $('.type.ui.button').click(function () {
        // Remove active class from all buttons
        $('.type.ui.button').removeClass('active');

        // Add active class to the clicked button
        $(this).addClass('active');
    });
});


modalSubmit.addEventListener('click', function () {
    // Clears the  results section
    movieResults.innerHTML = "";
    const movieGenres = genreArray.join(',');
    const service = 'netflix';// Service Netflix only
    const country = 'us';//us
    const outputLang = 'en';// english
    const orderBy = 'original_title';// sort by tite
    const genreCodes = movieGenres;// genre codes
    const genreRel = 'and';// Includes all selected genres
    const modalTypeActive = document.querySelector('#modal-type .active');// Finds the active button
    const showType = modalTypeActive.getAttribute('value');// Get the value of the active button and return movie, series, or all

    const url = `https://streaming-availability.p.rapidapi.com/search/filters?services=${service}&country=${country}&output_language=${outputLang}&order_by=${orderBy}&genres=${genreCodes}&genres_relation=${genreRel}&show_type=${showType}`;

    getStreamingData(url);
});
// copied from script.js 
async function getStreamingData(url) {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        for (let i = 0; i < result.result.length; i++) {
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
            // Movie type
            const movieType = document.createElement('p');
            movieType.classList.add('movie-type');
            movieType.textContent = (`Type: ${result.result[i].type}`);
            // Movie Genres
            const movieGenre = document.createElement('p');
            movieGenre.classList.add('movie-Genre');
            movieGenre.textContent = (`Genre(s): ${result.result[i].genres.map((genre) => genre.name).join(',')}`);
            // Movie Service
            const movieService = document.createElement('p');
            movieService.classList.add('movie-service');
            const serviceArray = result.result[i].streamingInfo.us;
            // If there is streaming info, then it will itterate over the array returning each unique service that the movie is on.
            if (serviceArray) {
                let uniqueServices = [];
                for (let i = 0; i < serviceArray.length; i++) {
                    uniqueServices = uniqueServices.concat(serviceArray[i].service)
                }
                uniqueServices = uniqueServices.filter((item,
                    index) => uniqueServices.indexOf(item) === index);

                movieService.textContent = `Available on: ${uniqueServices.join(',')}`;
            }

            else if (!serviceArray) {
                movieService.textContent = ('Service is unavailable.');
            }

            // Append movie title and genre to card
            movieCard.append(movieTitle, movieType, movieGenre, movieService);
            // Append card to document
            movieResults.append(movieCard);
            // Get image API
            const movieId = result.result[i].imdbId;
            console.log(movieId);
            const urlImbd = `https://imdb146.p.rapidapi.com/v1/title/?id=${movieId}`;
            options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'db036f9a6amshfdc5efa0a9dbed8p1e4200jsn1ac6baaee515',
                    'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
                }
            };

            console.log(urlImbd);
            const response2 = await fetch(urlImbd, options);
            const result2 = await response2.json();
            console.log(result2);
            // Movie Img
            // const movieImg = document.createElement('img');
            // movieImg.classList.add('movie-img');
           const imgKey = result2.primaryImage;
                if(imgKey) {
                movieImg.src = imgKey.url;
                movieCard.append(movieImg);
        }

            // end get image api
        }
    } catch (error) {
        console.error(error);
    }



}

