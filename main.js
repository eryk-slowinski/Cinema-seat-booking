const movies = document.querySelector('#movie');
const seats = document.querySelectorAll('.row .seat');
const count = document.querySelector('#count');
const total = document.querySelector('#total');

function seatsOccupied() {
    const occupiedSeats = Math.floor(Math.random() * 26 + 5);
    for (let i = 0; i < occupiedSeats; i++) {
        const seatNumber = Math.floor(Math.random() * seats.length);
        seats[seatNumber].classList.add('occupied');
    }
}

function renderPrices() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    count.textContent = selectedSeats.length;
    total.textContent = selectedSeats.length * movies.value;
    // Saving data to localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    localStorage.setItem('selectedMovieIndex', movies.selectedIndex);
    localStorage.setItem('selectedMoviePrice', movies.value);
}

seats.forEach(seat => seat.addEventListener('click', function () {
    if (!this.classList.contains('occupied')) seat.classList.toggle('selected');
    renderPrices();
}))

seatsOccupied();
movies.addEventListener('change', renderPrices);