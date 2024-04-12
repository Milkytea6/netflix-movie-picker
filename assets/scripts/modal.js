const modalButton= document.getElementById('movie-button');
const modal = document.querySelector('.ui.modal');

modalButton.addEventListener('click', function(){
    modal.classList.add('active');
})