const modalButton = document.getElementById('movie-button');
const modal = document.querySelector('.ui.modal');
const genreButtons = document.querySelectorAll('.genre-buttons')
const showTypeButtons = document.querySelectorAll('.show-type-buttons')
const modalSubmit = document.querySelector('#modal-submit');
const overlay = document.getElementById('overlay');
const closeX = document.getElementById('close-x');

async function getStreamingDataByGenre(url) {
  try {
      console.log(url);
      console.log(options);
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      for (let i = 0; i < 12; i++) {
          console.log(result.shows[i]);
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
          movieTitle.textContent = (`${result.shows[i].title}`);
          // Movie type
          const movieType = document.createElement('p');
          movieType.classList.add('movie-type');
          movieType.textContent = (`Type: ${result.shows[i].showType}`);
          // Movie Genres
          const movieGenre = document.createElement('p');
          movieGenre.classList.add('movie-Genre');
          movieGenre.textContent = (`Genre(s): ${result.shows[i].genres.map((genre) => genre.name).join(',')}`);
          // Get image API
          const movieId = result.shows[i].imdbId;
          console.log(movieId);
          const urlImbd = `https://imdb146.p.rapidapi.com/v1/title/?id=${movieId}`;
          const options2 = {
              method: 'GET',
              headers: {
                  'X-RapidAPI-Key': 'db036f9a6amshfdc5efa0a9dbed8p1e4200jsn1ac6baaee515',
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
          // Movie Service
          const movieService = document.createElement('p');
          movieService.classList.add('movie-service');
          const serviceArray = result.shows[i].streamingOptions.us;
          console.log(serviceArray);
          // If there is streaming info, then it will itterate over the array returning each unique service that the movie is on.
          if (serviceArray) {
              let uniqueServices = [];
              let uniqueLinks = [];
              const servicesAndLinks = {};
              console.log(servicesAndLinks);
          
              for (let i = 0; i < serviceArray.length; i++) {
                  uniqueServices = uniqueServices.concat(serviceArray[i].service.id);
                  uniqueLinks = uniqueLinks.concat(serviceArray[i].link);
              }
          
              uniqueServices.forEach((service, index) => {
                  servicesAndLinks[service] = uniqueLinks[index];
              });
      


              const serviceDiv = document.createElement('div');
              serviceDiv.classList.add('service-div');
          
              for (const service in servicesAndLinks) {
                  console.log(service);
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


          
      }
  } catch (error) {
      console.error(error);
  }


}

modalButton.addEventListener('click', function () {
    modal.classList.add('active');
    modal.style.display = 'block';
    overlay.style.display = 'block';
})

function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    const pop= document.querySelector('.rotate');
    pop.style.display='none';
}

window.onclick = function (e) {
    if (e.target == overlay) {
        closeModal();
    };
}
// Handle click to toggle basic class for all buttons
function handleClick(event) {
  // Toggle the "selected" class on the clicked button
  event.target.classList.toggle('basic');
  // Change color for all selected buttons
  // const selectedButtons = document.querySelectorAll('.genre-buttons .show-type-buttons');
  // console.log('handleClick', selectedButtons);
  
};
  // Add click event listener to each button
  genreButtons.forEach(function(button) {
    button.addEventListener('click', handleClick);
});
  // Add click event listener to each button
  showTypeButtons.forEach(function(button) {
    button.addEventListener('click', handleClick);
});

closeX.addEventListener('click', function () {
    closeModal();
  })
  // Variable for genre array
  let genreArray = [];
  
  genreButtons.forEach(function (button) {
    // Add event listener for each button
    button.addEventListener('click', function () {
      // Retrieve the API value attached to the button
      const value = button.getAttribute('value');
      console.log('Value attached to button: ' + value);
      genreArray.push(value);
      console.log(genreArray);
      return genreArray;
    });
  });
  // Variable for show type
  let showType = '';
  
  showTypeButtons.forEach(function (button) {
    // Add event listener for each button
    button.addEventListener('click', function () {
      // Retrieve the API value attached to the button
      const value = button.getAttribute('value');
      console.log('Value attached to button: ' + value);
      if(!value) {
        return
      }
      showType = `&show_type=${value}`
      console.log(showType);
    });
  });


  modalSubmit.addEventListener('click', function () {
      console.log('modalSubmit');
      closeModal();
      // Clears the  results section
      movieResults.innerHTML = "";
      const movieGenres = genreArray.join('%2C');
      console.log(movieGenres);
      const service = 'netflix';// Service Netflix only
      const country = 'us';//us
      const outputLang = 'en';// english
      const orderBy = 'original_title';// sort by tite
      const genreCodes = movieGenres;// genre codes
      const genreRel = 'and';// Includes all selected genres
  
      const url = `https://streaming-availability.p.rapidapi.com/shows/search/filters?country=${country}&series_granularity=show&genres=${genreCodes}&order_direction=desc&order_by=rating&genres_relation=${genreRel}&output_language=en${showType}`;
  
      getStreamingDataByGenre(url);
  });

// creates active class on clicked button in the actions div
// $(document).ready(function () {
//     $('.type.ui.button').click(function () {
//         // Remove active class from all buttons
//         $('.type.ui.button').removeClass('active');

//         // Add active class to the clicked button
//         $(this).addClass('active');
//     });
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const buttons = document.querySelectorAll('.genre-buttons .show-type-buttons');
  
//     buttons.forEach(button => {
//       button.addEventListener('click', () => {
//         // Remove 'active' class from all buttons
//         buttons.forEach(btn => btn.classList.remove('active'));
  
//         // Add 'active' class to the clicked button
//         button.classList.add('active');
//       });
//     });
//   });
  


// copied from script.js 


