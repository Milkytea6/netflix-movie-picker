const modalButton= document.getElementById('movie-button');
const modal = document.querySelector('.ui.modal');
const genreButtons= document.querySelectorAll('.genre-container #genres')

modalButton.addEventListener('click', function(){
    modal.classList.add('active');
})

genreButtons.forEach(function(button) {
    // Add event listener for each button (e.g., click event)
    button.addEventListener('click', function() {
        // Retrieve the API value attached to the button
        const apiValue = button.getAttribute('data-result-api');
        console.log(apiValue);
        // Your code here for using the API value
        console.log('API value attached to button: ' + apiValue);
    });
});
