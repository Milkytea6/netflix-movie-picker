const searchForm = document.getElementById('search-form');
const movieResults = document.getElementById('movie-results');
let options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '5ecfdebb7amsh0b7e70f9b85d7cbp1f36b1jsnb18ccc4bac95',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
};
async function getStreamingData(url) {
    try {
        console.log(url);
        console.log(options);
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        for (let i = 0; i < 10; i++) {
            console.log(result.result[i]);
            // Movie card div
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            // movie img div
            const movieImgDiv = document.createElement('div');
            movieImgDiv.classList.add('movie-img-div');
            // movie text div
            const movieTextDiv = document.createElement('div');
            movieTextDiv.classList.add('movie-text-div');
            // Movie Img
            const movieImg = document.createElement('img');
            movieImg.classList.add('movie-img');

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
                let uniqueLinks = [];
                const servicesAndLinks = {};
            
                for (let i = 0; i < serviceArray.length; i++) {
                    uniqueServices = uniqueServices.concat(serviceArray[i].service);
                    uniqueLinks = uniqueLinks.concat(serviceArray[i].link);
                }
            
                uniqueServices.forEach((service, index) => {
                    servicesAndLinks[service] = uniqueLinks[index];
                });
        


                const serviceDiv = document.createElement('div');
                serviceDiv.classList.add('service-div');
            
                for (const service in servicesAndLinks) {
            
                    const serviceIcon = document.createElement('img');
                    serviceIcon.classList.add('service-icon');
                    serviceIcon.src = `./assets/images/${service}-img.svg`; // Set the icon source
            
                    const serviceLink = document.createElement('a');
                    serviceLink.classList.add('service-link');
                    serviceLink.href = servicesAndLinks[service]; // Set the link href
            
                    serviceLink.append(serviceIcon);
                    serviceDiv.append(serviceLink);
            
                    movieCard.append(serviceDiv); // Append the service div to the movie card
                }
            }


            else if (!serviceArray) {
                movieService.textContent = ('Service is unavailable.');
            }


            // Append movie title and genre to card
            movieTextDiv.append(movieTitle, movieType, movieGenre);
            // append div to movie card
            movieCard.append(movieTextDiv)
            // Append card to document
            movieResults.append(movieCard);


            // Get image API
            const movieId = result.result[i].imdbId;
            console.log(movieId);
            const urlImbd = `https://imdb146.p.rapidapi.com/v1/title/?id=${movieId}`;
            const options2 = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '5ecfdebb7amsh0b7e70f9b85d7cbp1f36b1jsnb18ccc4bac95',
                    'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
                }
            };

            console.log(urlImbd);
            const response2 = await fetch(urlImbd, options2);
            const result2 = await response2.json();
            console.log(result2);
            // Movie Img
            // const movieImg = document.createElement('img');
            // movieImg.classList.add('movie-img');
            const imgKey = result2.primaryImage;
            if (imgKey) {
                movieImg.src = imgKey.url;

                movieImgDiv.append(movieImg);
                movieCard.append(movieImgDiv);
            }

            // end get image api
        }
    } catch (error) {
        console.error(error);
    }


}


// Event Listener for the url links to the service icons
const serviceLinks = document.querySelectorAll('.service-link');

serviceLinks.forEach(function(button) {
    button.addEventListener('click', handleUrl);

    function handleUrl(event){
        event.preventDefault();
        window.location.href = event.target.href;
    }

    
});
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    // Clears the  results section
    movieResults.innerHTML = "";
    var pop= document.querySelector('.rotate');
    pop.style.display='none'
    const searchInput = document.getElementById('search-bar').value;

    const url = `https://streaming-availability.p.rapidapi.com/search/title?title=${searchInput}&country=us&show_type=all&output_language=en`;
    console.log(url);
    getStreamingData(url);
}
);


const modalEl = document.querySelector('main div');

modalEl.addEventListener('submit', function (event) {
    event.preventDefault();

    const service = 'netflix';// Service Netflix only
    const country = 'us';//us
    const outputLang = 'en';// english
    const orderBy = 'original_title';// sort by tite
    const genreCodes = '10749,35';// genre codes
    const genreRel = 'and';// Includes all selected genres
    const showType = `movie`;// Results are series or movie

    const url = `https://streaming-availability.p.rapidapi.com/search/filters?services=${service}&country=${country}&output_language=${outputLang}&order_by=${orderBy}&genres=${genreCodes}&genres_relation=${genreRel}&show_type=${showType}`;
    var pop= document.querySelector('.rotate');
    pop.style.display='none'
    console.log(url);
    getStreamingData(url);

})
function saveSearch(){
    var searchInput= document.getElementById('search-bar').value.trim();
    var searches= JSON.parse(localStorage.getItem('recentSearches')) || [];
    var content= {title: searchInput};
    searches.push(content);
    let maxSearches= 10;
    if (searches.length > maxSearches){
        searches.shift();
    };
    localStorage.setItem('recentSearches', JSON.stringify(searches));
    
    $('.ui.search')
    .search({
      source: searches
    })
  ;
};

document.getElementById('search-bar').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      saveSearch();
    }
  });
