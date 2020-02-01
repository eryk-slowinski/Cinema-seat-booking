const movies = document.querySelector('#movie');
const seats = document.querySelectorAll('.row .seat');
const count = document.querySelector('#count');
const total = document.querySelector('#total');

function seatsOccupied() {
    populateUI();
    const occupiedSeats = Math.floor(Math.random() * 26 + 5);
    for (let i = 0; i < occupiedSeats; i++) {
        const seatNumber = Math.floor(Math.random() * seats.length);
        if (!seats[seatNumber].classList.contains('selected')) seats[seatNumber].classList.add('occupied');
    }
}

function renderPrices() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    count.textContent = selectedSeats.length;
    total.textContent = selectedSeats.length * movies.value;
    saveToLocal(seatsIndex);
}

seats.forEach(seat => seat.addEventListener('click', function () {
    if (!this.classList.contains('occupied')) seat.classList.toggle('selected');
    renderPrices();
}))

function saveToLocal(seatsIndex) {
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    localStorage.setItem('selectedMovieIndex', movies.selectedIndex);
    localStorage.setItem('selectedMoviePrice', movies.value);
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
    selectedSeats.forEach(seatNumber => seats[seatNumber].classList.add('selected'));
    movies.selectedIndex = selectedMovieIndex;
    count.textContent = selectedSeats.length;
    total.textContent = selectedMoviePrice * selectedSeats.length;
}

seatsOccupied();
movies.addEventListener('change', renderPrices);