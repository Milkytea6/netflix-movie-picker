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

function handleClick(event) {
    // Toggle the "selected" class on the clicked button
    event.target.classList.toggle('basic');
    // Change color for all selected buttons
    var selectedButtons = document.querySelectorAll('.ui inverted teal basic button #genres');
    selectedButtons.forEach(function(button) {
      button.style.backgroundColor = 'rgb(0, 94, 94)'; // Change to another color (e.g., blue)
    });
};
  // Add click event listener to each button
  genreButtons.forEach(function(button) {
    button.addEventListener('click', handleClick);
});

closeX.addEventListener('click', function () {
    closeModal();
})

let genreArray = [];

genreButtons.forEach(function (button) {
    // Add event listener for each button
    button.addEventListener('click', function () {
        // Retrieve the API value attached to the button
        const apiValue = button.getAttribute('data-result-api');
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


